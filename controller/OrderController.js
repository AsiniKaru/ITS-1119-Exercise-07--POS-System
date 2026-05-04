import { CustomerDB , ItemDB , OrderDB  } from "../db/database.js";
import { Order } from "../dto/order.js";
import { OrderDetails } from "../dto/OrderDetails.js";


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
    let cmb = document.getElementById("orderCustomer");
    cmb.innerHTML = '<option value="">Select Customer</option>';
    cmb.innerHTML += `<option value="WALK-IN">Walk-in Customer</option>`;
    CustomerDB.forEach(c => cmb.innerHTML += `<option value="${c.id}">${c.id} - ${c.name}</option>`);
}



  <div class="mb-3">
    <label class="small text-muted">Customer</label>
    <select class="form-select" id="cmbCustomer">
      <option value="">Select Customer</option>
    </select>
  </div>







// const OrderController = (() => {

//   /* ── DOM  */
//   const field = id => document.getElementById(id);

//   /* ── Cart table  */

//   function renderCart() {
//     const cart  = OrderModel.getCart();
//     const tbody = field('order-tbody');
//     if (!cart.length) {
//       tbody.innerHTML = '<tr class="empty-row"><td colspan="5">No items added</td></tr>';
//       return;
//     }
//     tbody.innerHTML = cart.map(l => `
//       <tr>
//         <td>${l.code}</td>
//         <td>${l.name}</td>
//         <td>Rs.${l.price.toFixed(2)}</td>
//         <td>${l.qty}</td>
//         <td>Rs.${l.lineTotal.toFixed(2)}</td>
//       </tr>`).join('');
//   }

//   /* ── Summary update */

//   function updateSummary() {
//     const disc     = parseFloat(field('ord-discount').value || 0);
//     const cash     = parseFloat(field('ord-cash').value     || 0);
//     const { total, subtotal, balance } = OrderModel.calcSummary(disc, cash);
//     field('ord-total').value    = total.toFixed(2)    + '/-';
//     field('ord-subtotal').value = subtotal.toFixed(2) + '/-';
//     field('ord-balance').value  = balance.toFixed(2)  + '/-';
//   }

//   /* ── Customer auto-fill  */

//   function onCustomerIdInput() {
//     const custId = field('ord-cust-id').value.trim();
//     const cust   = CustomerModel.findById(custId);
//     if (cust) {
//       field('ord-cust').value    = cust.name;
//       field('ord-name').value    = cust.name;
//       field('ord-salary').value  = 'Rs.' + parseFloat(cust.salary || 0).toFixed(2);
//       field('ord-address').value = cust.address;
//     } else {
//       ['ord-cust', 'ord-name', 'ord-salary', 'ord-address'].forEach(id => field(id).value = '');
//     }
//   }

//   /* ── Item auto-fill (by code)  */

//   function onItemCodeInput() {
//     const code = field('ord-item-code').value.trim();
//     const item = ItemModel.findByCode(code);
//     if (item) _fillItemFields(item);
//   }

//   /** Auto-fill by name (partial match) */
//   function onItemNameInput() {
//     const namePart = field('ord-item').value.trim();
//     const item     = ItemModel.findByName(namePart);
//     if (item) _fillItemFields(item);
//   }

//   function _fillItemFields(item) {
//     field('ord-item').value          = item.name;
//     field('ord-item-code').value     = item.code;
//     field('ord-item-name').value     = item.name;
//     field('ord-item-price').value    = item.price.toFixed(2);
//     field('ord-item-qtyh').value     = item.qty;
//   }

//   /* ── Add item to the cart  */

//   function addItem() {
//     const code = field('ord-item-code').value.trim();
//     const qty  = parseInt(field('ord-order-qty').value || 0);

//     const result = OrderModel.addToCart(code, qty);
//     showToast(result.ok ? ` ${result.message}` : ` ${result.message}`, result.ok ? 'success' : 'error');

//     if (result.ok) {
//       renderCart();
//       updateSummary();
//       // Clear item input fields
//       ['ord-item','ord-item-code','ord-item-name','ord-item-price','ord-item-qtyh','ord-order-qty']
//         .forEach(id => field(id).value = '');
//     }
//   }

//   /* ── Complete purchase ────────────────────────────────────── */

//   function completePurchase() {
//     const custId   = field('ord-cust-id').value.trim();
//     const date     = field('ord-date').value;
//     const disc     = parseFloat(field('ord-discount').value || 0);
//     const cash     = parseFloat(field('ord-cash').value     || 0);

//     const result = OrderModel.placeOrder(custId, date, disc, cash);
//     showToast(result.ok ? ` ${result.message}` : ` ${result.message}`, result.ok ? 'success' : 'error');

//     if (result.ok) {
//       renderCart();
//       updateStats();
//       resetOrderForm();

//       ItemController.init();
//     }
//   }

//   /* ── Reset order form  */

//   function resetOrderForm() {
//     [
//       'ord-cust','ord-cust-id','ord-name','ord-salary','ord-address',
//       'ord-total','ord-subtotal','ord-cash','ord-discount','ord-balance',
//       'ord-item','ord-item-code','ord-item-name','ord-item-price','ord-item-qtyh','ord-order-qty'
//     ].forEach(id => field(id).value = '');

//     field('ord-id').value   = OrderModel.nextOrderId();
//     field('ord-date').value = new Date().toISOString().split('T')[0];
//   }


//   function init() {
//     field('ord-id').value   = OrderModel.nextOrderId();
//     field('ord-date').value = new Date().toISOString().split('T')[0];

//     field('ord-cust-id').addEventListener('input',   onCustomerIdInput);
//     field('ord-item-code').addEventListener('input',  onItemCodeInput);
//     field('ord-item').addEventListener('input',       onItemNameInput);
//     field('ord-cash').addEventListener('input',       updateSummary);
//     field('ord-discount').addEventListener('input',   updateSummary);

//     renderCart();
//   }

//   return { init, addItem, completePurchase, updateSummary };
// })();