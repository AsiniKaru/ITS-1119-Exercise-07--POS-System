
import { Item } from "../dto/Item.js";
import { ItemDB } from "../db/database.js";
import { saveItem , updateItem , deleteItem } from "../model/ItemModel.js";
import { updateDashboardCounts } from "./DashboardController.js";

// //Toast notification 
// window.showToast = function(message, type = 'success') {
//     const toast = document.getElementById("toast");
    
//     toast.textContent = message;
    
//     toast.classList.add('show', type);

//     setTimeout(() => {
//         toast.classList.remove('show', type);
//     }, 3000);
// };

document.addEventListener("DOMContentLoaded", () => {
      console.log('addEventListener...');

    generateItemID();
    loadItems();
});


// ============ Generate a New Item ID ============
function generateItemID() {

  console.log('Genarate Item ID....');
    if (ItemDB.length === 0) {
        document.getElementById("itemCode").value = "ITM-001";
    } else {
        let lastId = ItemDB[ItemDB.length - 1].code;
        console.log(lastId);
        let number = parseInt(lastId.substring(4)) + 1;
          console.log(number);
        document.getElementById("itemCode").value = "ITM-" + number.toString().padStart(3, '0');
    }
}


// ============ Load the Item table  ============
function loadItems(data = ItemDB) {
    console.log('loadItems....');

    let tbody = document.getElementById("itemTBody");
    tbody.innerHTML = "";
    data.forEach(c => {
        let tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.innerHTML = `<td class="fw-bold">${c.code}</td><td>${c.name}</td><td>${c.price}</td><td>${c.qty}</td>`;
        tr.addEventListener("click", () => selectItem(c.code));
        tbody.appendChild(tr);
    });
}

// ============ Select a data from the table =========
function selectItem(code) {
      console.log('selectItem ....');

    let item = ItemDB.find(c => c.code === code);
    if (item) {
        document.getElementById("itemCode").value = item.code;
        document.getElementById("itemName").value = item.name;
        document.getElementById("itemPrice").value = item.price;
        document.getElementById("itemQty").value = item.qty; 
    }
}


// ================== Clear the Form =================
function clearForm() {
      console.log(' clearForm....');

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemQty").value = "";
    generateItemID();
}
document.getElementById("clearItemForm").addEventListener("click", clearForm);


// Regex for Item 
const itemNameRegex = /^[A-Za-z0-9 ]{3,50}$/;
const priceRegex = /^\d+(\.\d{1,2})?$/;
const qtyRegex = /^\d+$/;


// ================ Save Item ====================
document.getElementById("saveItem").addEventListener("click", () => {
    let code = document.getElementById("itemCode").value.trim();
    let name = document.getElementById("itemName").value.trim();
    let price = document.getElementById("itemPrice").value.trim();
    let qty = document.getElementById("itemQty").value.trim(); 

    if (!code || !name || !price || !qty) { 

        // Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'All fields are required!' }); 
        showToast('All fields are required!', 'error'); 
        return; 

    }
    
    // Regex Validations

    if (!itemNameRegex.test(name)) {showToast('Invalid Item Name!', 'error'); return; }
    if (!priceRegex.test(price)) {showToast('Invalid price!', 'error'); return; }
    if (!qtyRegex.test(qty)) {showToast('Invalid Item Quantity!', 'error');return; }

    if (ItemDB.find(c => c.code === code)) { 

        showToast('Item code already exists! Use Update.', 'error');return; 
        return; 
    }

    let tempSaveList = new Item(code, name, parseFloat(price), parseInt(qty));


     if (saveItem(tempSaveList)) {
        showToast('Item Saved Successfully!', 'success'); 
        loadItems(); 
        updateDashboardCounts();
        clearForm();
    } else {
        showToast('Something Went Wrong!', 'error'); 
    }

    
});

// ================ Update Item ====================
document.getElementById("updateItem").addEventListener("click", () => {
    let code = document.getElementById("itemCode").value.trim();
    let name = document.getElementById("itemName").value.trim();
    let price = document.getElementById("itemPrice").value.trim();
    let qty = document.getElementById("itemQty").value.trim(); 
    
    let index = ItemDB.findIndex(c => c.code === code);
    if (index === -1) { 
        showToast('Item not found!', 'error'); 
      return; 
    }

    // Regex Validations
    if (!itemNameRegex.test(name)) {showToast('Invalid Item Name!', 'error'); return; }
    if (!priceRegex.test(price)) {showToast('Invalid price!', 'error'); return; }
    if (!qtyRegex.test(qty)) {showToast('Invalid Item Quantity!', 'error');return; }

    
     if (updateItem(index,code , name,price, qty)) {
        showToast('Item Updated Successfully!', 'success'); 
        loadItems(); 
        updateDashboardCounts();
        clearForm();
    } else {
        showToast('Something Went Wrong!', 'error'); 
    }

    
});

// ================ Delete Item ====================
document.getElementById("deleteItem").addEventListener("click", () => {
    let code = document.getElementById("itemCode").value.trim();
    let index = ItemDB.findIndex(c => c.code === code);
    
    if (index === -1) {
        showToast('Please select a Item to delete!', 'error'); 
        return;
    }
        console.log("Delete");


    if (!confirm('Are you sure want to Delete Item Record?')) return;

    if (deleteItem(index)) {
        console.log("Delete");
        showToast('Item Delete Successfully!', 'success'); 
        loadItems(); 
        updateDashboardCounts();
        clearForm();
    } else {
        showToast('Something Went Wrong!', 'error'); 
    }

});


// ================ Search Item ====================
document.getElementById("filterItems").addEventListener("click", () => {
    let query = document.getElementById("itemSearch").value.toLowerCase();
    let filtered = ItemDB.filter(c => c.code.toLowerCase().includes(query) || c.name.toLowerCase().includes(query));
    loadItems(filtered);
});


// ================ Reset Items ====================
document.getElementById("resetItems").addEventListener("click", () => {
  document.getElementById("itemSearch").value = "";  
  loadItems();
    
});

