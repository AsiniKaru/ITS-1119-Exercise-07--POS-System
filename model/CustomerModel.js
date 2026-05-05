import { CustomerDB } from "../db/database.js";


// ================ Save Customer ===================
export function saveCustomer(tempSaveList) {
  console.log("Saving.......");

    if (CustomerDB.find(c => c.id === tempSaveList.id)) {
        return false;
    }
    CustomerDB.push({
        id: tempSaveList.id,
        name: tempSaveList.name,
        address: tempSaveList.address,
        salary: tempSaveList.salary,
      
    });
    return true;
}


// ================ Update Customer ===================
export function updateCustomer(index,id , name,address,salary){
    console.log("Updating.......");
    
    if (CustomerDB.find(c => c.id === !id)) {
        return false;
    } else{
        CustomerDB[index].name = name;
        CustomerDB[index].address = address;
        CustomerDB[index].salary = salary; 
        
        return true;

    }
   
}


// ================ Delete Customer ===================
export function deleteCustomer(index){
     CustomerDB.splice(index, 1);
     return true;

}


