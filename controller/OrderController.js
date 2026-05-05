import { CustomerDB , ItemDB , OrderDB  } from "../db/database.js";
import { Item } from "../dto/Item.js";
import { Order } from "../dto/order.js";
import { OrderDetails } from "../dto/OrderDetails.js";
import { saveOrder } from "../model/OrderModel.js";
import { updateDashboardCounts } from "./DashboardController.js";

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
      console.log('addEventListener...');

    generateOrderID();
    loadCustomerDropdown();
    loadItemDropdown();
    loadOrders();
});

document.addEventListener("customerUpdated", loadCustomerDropdown);
document.addEventListener("itemUpdated", loadItemDropdown);


// ============== Generate Order ID =================
function generateOrderID() {
  console.log("OrderDM");
    if (OrderDB.length === 0) {
        document.getElementById("orderId").value = "ORD-001";
    } else {
        let lastId = OrderDB[OrderDB.length - 1].orderId;
        let number = parseInt(lastId.split("-")[1]) + 1;
        document.getElementById("orderId").value = "ORD-" + number.toString().padStart(3, '0');
    }
}

// ================= Load Customers ==================
function loadCustomerDropdown() {
    let cmb = document.getElementById("cmbCustomer"); 
    if (!cmb) {
        console.error("Dropdown element 'cmbCustomer' not found!");
        return;
    }

    cmb.innerHTML = '<option value="" selected disabled>Select Customer</option>';
    
    CustomerDB.forEach(c => {
        let option = document.createElement("option");
        option.value = c.id;
        option.textContent = `${c.id} - ${c.name}`;
        cmb.appendChild(option);
    });
}


// =============== Fill Customer Details Cols ============
document.getElementById("cmbCustomer").addEventListener("change", (e) => {
        const selectedId = e.target.value;
        const customer = CustomerDB.find(c => c.id === selectedId);
        
        if (customer) {
            document.getElementById("orderSalary").value = customer.salary;
            document.getElementById("orderAddress").value = customer.address;
        }
    });

 
    // ================= Load Items ==================
function loadItemDropdown() {
    let cmb = document.getElementById("cmbItem"); 
    
    if (!cmb) {
        console.error("Dropdown element 'cmbItem' not found!");
        return;
    }

    cmb.innerHTML = '<option value="" selected disabled>Select Item</option>';
    
    ItemDB.forEach(c => {
        let option = document.createElement("option");
        option.value = c.code;
        option.textContent = `${c.code} - ${c.name}`;
        cmb.appendChild(option);
    });
}


// =============== Fill Item Details Cols ============
document.getElementById("cmbItem").addEventListener("change", (e) => {
        const selectedId = e.target.value;
        const item = ItemDB.find(c => c.code === selectedId);
        
        if (item) {
            document.getElementById("orderUnitPrice").value = item.price;
            document.getElementById("orderQty").value = item.qty;
        }
    });

// ================= Add Item =======================
document.getElementById("addItemBtn").addEventListener("click", () => {
    let orderId = document.getElementById("orderId").value;
    let itemCode = document.getElementById("cmbItem").value;
    let orderQty = parseInt(document.getElementById("orderQtyInput").value); // Match your HTML ID
    
    let item = ItemDB.find(i => i.code === itemCode);

    if (!item || isNaN(orderQty) || orderQty <= 0) { 
        showToast('Please select a valid item and quantity!', 'error'); 
        return; 
    }
    if (orderQty > item.qty ) { 
        showToast('Not enough stock available!', 'error'); 
        return; 
    }

    let cartItem = cart.find(c => c.itemId === itemCode);
    
    if (cartItem) {
        if ((cartItem.qty + orderQty )> item.qty){
            showToast('Not enough stock available!', 'error'); 
            return; 
        }
        cartItem.qty += orderQty;
        cartItem.price = cartItem.qty * cartItem.unitPrice; // Use property names from DTO
    } else {

        cart.push(new OrderDetails(
            orderId, 
            item.code, 
            item.name, 
            item.price, 
            orderQty, 
            item.price * orderQty
        ));
    }

    updateOrderDetailsTable();
    calculateTotals();

});



// ========== Update the order Details Table =============

function updateOrderDetailsTable() {
    let tbody = document.getElementById("orderTBody");
    tbody.innerHTML = "";

    cart.forEach((c, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${c.itemId}</td>
            <td>${c.itemName}</td>
            <td>${c.unitPrice.toFixed(2)}</td>
            <td>${c.qty}</td>
            <td>${c.price.toFixed(2)}</td>
            <td>
                <button class="btn removeBtn" id="btnRemove-${index}">❌</button>
            </td>`;
            
        tbody.appendChild(tr);

        document.getElementById(`btnRemove-${index}`).addEventListener("click", () => {
            cart.splice(index, 1); 
            updateOrderDetailsTable(); 
            calculateTotals();
             
            
        });
    });
}

// =========== Calculate the Total ====================
function calculateTotals() {
    let total = cart.reduce((sum, item) => sum + item.price, 0); 
    
    let discount = parseFloat(document.getElementById("orderDiscount").value) || 0;
    
    let subTotal = total - (total * (discount / 100));

    document.getElementById("orderTotal").value = total.toFixed(2);
    document.getElementById("orderSubTotal").value = subTotal.toFixed(2);

    let cash = parseFloat(document.getElementById("orderCash").value) || 0;
    
    if (cash > 0) {
        document.getElementById("orderBalance").value = (cash - subTotal).toFixed(2);
    } else {
        document.getElementById("orderBalance").value = "0.00";
    }
}

document.getElementById("orderCash").addEventListener("input", calculateTotals);
document.getElementById("orderDiscount").addEventListener("input", calculateTotals);


// ================= Purchase ==========================
document.getElementById("purchaseBtn").addEventListener("click", () => {
    let customerId = document.getElementById("cmbCustomer").value;

    let subTotalField = document.getElementById("orderSubTotal");
    let subTotal = parseFloat(subTotalField.value) || 0;

    let cash = parseFloat(document.getElementById("orderCash").value) || 0;
    let discount =parseFloat(document.getElementById("orderDiscount").value) || 0;


    if (cart.length === 0) { 
        showToast('Your cart is empty!', 'error'); 
        return; 
    }
    if (!customerId) { 
        showToast('Please select a customer!' , 'error'); 
        return;
    }
    if (cash < subTotal) { 
        console.log(cash +""+subTotal);
        showToast( 'Insufficient Cash provided!' , 'error'); 
        return; 
    }


    let newOrder = {
        id: document.getElementById("orderId").value,
        date: document.getElementById("orderDate").value,
        customerId: customerId,
        total: subTotal,
        discount: discount,
        cart: [...cart] // Pass the current cart
    };

    
     if (saveOrder(newOrder)) {
            showToast( 'Order processed successfully.' , 'success');
            reduceStock(); 
            updateDashboardCounts();
            resetOrderForm();
            
    } else {
            showToast('Something Went Wrong!', 'error'); 
    }
});


//============== Reduce stock =============================
function reduceStock() {
    cart.forEach(cartItem => {
        let item = ItemDB.find(i => i.code === cartItem.itemId); // Use itemId from OrderDetails DTO
        if (item) {
            item.qty -= cartItem.qty;
        }
    });
}
// ============== Reset Form ================================
function resetOrderForm(){
    cart.length = 0; // Empty the array properly
    updateOrderDetailsTable(); // Use the function name you defined earlier
    calculateTotals();
    
    document.getElementById("orderCash").value = "";
    document.getElementById("orderBalance").value = "";
    document.getElementById("orderQty").value = "";
    document.getElementById("cmbCustomer").value = "";
    document.getElementById("cmbItem").value = "";
    document.getElementById("orderAddress").value = "";
    document.getElementById("orderSalary").value = "";
    document.getElementById("orderAddress").value = "";
    document.getElementById("orderUnitPrice").value = "";
    document.getElementById("orderQty").value = "";
    document.getElementById("orderQtyInput").value = "";

    generateOrderID();
    document.dispatchEvent(new Event('itemUpdated')); // Triggers live quantity updates
    loadOrders();
}

// ========= update Order History Table ==========

function loadOrders(data = OrderDB) {
    let tbody = document.getElementById("orderHistoryTBody");
    if (!tbody) return; 
    tbody.innerHTML = ""; 
    
    // Use 'data' instead of 'OrderDB'
    data.forEach(o => {
        let totalItems = o.orderDetails.reduce((sum, item) => sum + item.qty, 0);
        
        let customer = CustomerDB.find(c => c.id === o.custId);
        let custDisplay = customer ? `${customer.name} (${o.custId})` : o.custId;

        tbody.innerHTML += `
            <tr>
                <td class="fw-bold">${o.orderId}</td>
                <td>${custDisplay}</td>
                <td>${o.date}</td>
                <td>${totalItems}</td>
                <td>LKR ${o.total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-dark btn-sm px-3 rounded-pill" 
                            onclick="openOrderDetails('${o.orderId}')">View
                    </button>
                </td>
            </tr>
        `;
    });
}



// ================ Search Customer ====================
document.getElementById("btnFilterOrders").addEventListener("click", () => {
    let query = document.getElementById("orderSearch").value.toLowerCase();
    
    // Filter the OrderDB
    let filtered = OrderDB.filter(o => 
        o.orderId.toLowerCase().includes(query) || 
        o.custId.toLowerCase().includes(query)
    );
    
    // Pass the filtered list to the loader
    loadOrders(filtered);
});


// ==================== reset Order Table==============
document.getElementById("btnResetOrderSearch").addEventListener("click", () => {
  document.getElementById("orderSearch").value = "";  
  loadOrders();
});
