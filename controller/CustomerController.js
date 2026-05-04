import { Customer } from "../dto/Customer.js";
import { CustomerDB } from "../db/database.js";
import { saveCustomer ,updateCustomer , deleteCustomer} from "../model/CustomerModel.js";
import { updateDashboardCounts } from "./DashboardController.js";

// Toast notification 
window.showToast = function(message, type = 'success') {
    const toast = document.getElementById("toast");
    
    toast.textContent = message;
    
    toast.classList.add('show', type);

    setTimeout(() => {
        toast.classList.remove('show', type);
    }, 3000);
};

document.addEventListener("DOMContentLoaded", () => {
      console.log('addEventListener...');

    generateCustomerID();
    loadCustomers();
});


// ============ Generate a New Customer ID ============
function generateCustomerID() {

  console.log('Genrate ID....');
    if (CustomerDB.length === 0) {
        document.getElementById("cusId").value = "CUS-001";
    } else {
        let lastId = CustomerDB[CustomerDB.length - 1].id;
        console.log(lastId);
        let number = parseInt(lastId.substring(4)) + 1;
          console.log(number);
        document.getElementById("cusId").value = "CUS-" + number.toString().padStart(3, '0');
    }
}


// ============ Load the Customer table  ============
function loadCustomers(data = CustomerDB) {
    console.log('loadCustomers....');

    let tbody = document.getElementById("cusTBody");
    tbody.innerHTML = "";
    data.forEach(c => {
        let tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.innerHTML = `<td class="fw-bold">${c.id}</td><td>${c.name}</td><td>${c.address}</td><td>${c.salary}</td>`;
        tr.addEventListener("click", () => selectCustomer(c.id));
        tbody.appendChild(tr);
    });
}

// ============ Select a data from the table =========
function selectCustomer(id) {
      console.log('selectCustomer ....');

    let customer = CustomerDB.find(c => c.id === id);
    if (customer) {
        document.getElementById("cusId").value = customer.id;
        document.getElementById("cusName").value = customer.name;
        document.getElementById("cusAddress").value = customer.address;
        document.getElementById("cusSalary").value = customer.salary; 
    }
}


// ================== Clear the Form =================
function clearForm() {
      console.log(' clearForm....');

    document.getElementById("cusName").value = "";
    document.getElementById("cusAddress").value = "";
    document.getElementById("cusSalary").value = "";
    generateCustomerID();
}
document.getElementById("clearCusForm").addEventListener("click", clearForm);


// Regex for inputs
const nameRegex = /^[A-Za-z ]{3,50}$/;
const addressRegex = /^[A-Za-z0-9 ,.-]{5,100}$/;
const salaryRegex = /^\d+(\.\d{2})?$/;


// ================ Save Customer ====================
document.getElementById("saveCustomer").addEventListener("click", () => {
    let id = document.getElementById("cusId").value.trim();
    let name = document.getElementById("cusName").value.trim();
    let address = document.getElementById("cusAddress").value.trim();
    let salary = document.getElementById("cusSalary").value.trim(); 

    if (!id || !name || !address || !salary) { 
        // Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'All fields are required!' }); 
        showToast('All fields are required!', 'error'); 
        return; 
    }
    
    // Regex Validations
    if (!nameRegex.test(name)) {showToast('Invalid Name! Please use only letters and spaces (3-50 chars).', 'error'); return; }
    if (!addressRegex.test(address)) {showToast('Invalid Address! Must be between 5 and 100 characters.', 'error'); return; }
    if (!salaryRegex.test(salary)) {showToast('Invalid Salary!', 'error');return; }

    if (CustomerDB.find(c => c.id === id)) { 
        showToast('Customer ID already exists! Use Update.', 'error');return; 
        return; 
    }

    let tempSaveList = new Customer(id, name, address, salary);


     if (saveCustomer(tempSaveList)) {
        showToast('Customer Saved Successfully!', 'success'); 
        loadCustomers(); 
        updateDashboardCounts();
        clearForm();
    } else {
        showToast('Something Went Wrong!', 'error'); 
    }

});

// ================ Update Customer ====================
document.getElementById("updateCustomer").addEventListener("click", () => {
    let id = document.getElementById("cusId").value.trim();
    let name = document.getElementById("cusName").value.trim();
    let address = document.getElementById("cusAddress").value.trim();
    let salary = document.getElementById("cusSalary").value.trim(); 
    
    let index = CustomerDB.findIndex(c => c.id === id);
    if (index === -1) { 
        showToast('Customer not found!', 'error'); 
      return; 
    }

    // Regex Validations
    if (!nameRegex.test(name)) {showToast('Invalid Name! Please use only letters and spaces (3-50 chars).', 'error'); return; }
    if (!addressRegex.test(address)) {showToast('Invalid Address! Must be between 5 and 100 characters.', 'error'); return; }
    if (!salaryRegex.test(salary)) {showToast('Invalid Salary!', 'error');return; }

    
     if (updateCustomer(index,id , name,address, salary)) {
        showToast('Customer Saved Successfully!', 'success'); 
        loadCustomers(); 
        updateDashboardCounts();
        clearForm();
    } else {
        showToast('Something Went Wrong!', 'error'); 
    }

    
});

// ================ Delete Customer ====================
document.getElementById("deleteCustomer").addEventListener("click", () => {
    let id = document.getElementById("cusId").value.trim();
    let index = CustomerDB.findIndex(c => c.id === id);
    
    if (index === -1) {
        showToast('Please select a customer to delete!', 'error'); 
        return;
    }
        console.log("Delete");


    if (!confirm('Are you sure want to Delete the Customer Record?')) return;

    if (deleteCustomer(index)) {
        console.log("Delete");
        showToast('Customer Delete Successfully!', 'success'); 
        loadCustomers(); 
        updateDashboardCounts();
        clearForm();
    } else {
        showToast('Something Went Wrong!', 'error'); 
    }

});


// ================ Search Customer ====================
document.getElementById("filterCustomers").addEventListener("click", () => {
    let query = document.getElementById("cusSearch").value.toLowerCase();
    let filtered = CustomerDB.filter(c => c.id.toLowerCase().includes(query) || c.name.toLowerCase().includes(query));
    loadCustomers(filtered);
});


// ================ Reset Customer ====================
document.getElementById("resetFilters").addEventListener("click", () => {
  document.getElementById("cusSearch").value = "";  
  loadCustomers();
});

