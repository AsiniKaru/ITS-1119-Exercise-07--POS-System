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
























// // import { CustomerDB } from "../db/database.js";
// import { Customer } from "../db/database.js";

// const CustomerModel = (() => {

//     let _customers = [];

//   function seed() {
//     _customers = [
//       new CustomerDTO('C001', 'Asini', 'Galle',  100000),
//       new CustomerDTO('C002', 'Lasandi',     'Ahangama',  420000),
//     ];
//   }

//   function getAll() {
//     return [..._customers];
//   }

//   function findById(id) {
//     return _customers.find(c => c.id === id) || null;
//   }

//   function search(query) {
//     const q = query.toLowerCase();
//     return _customers.filter(c =>
//       c.id.toLowerCase().includes(q) ||
//       c.name.toLowerCase().includes(q) ||
//       c.address.toLowerCase().includes(q)
//     );
//   }

//   /**
//    * @returns {{ ok: boolean, message: string }}
//    */
//   function add(dto) {
//     if (!dto.id || !dto.name) return { ok: false, message: 'ID and Name are required.' };
//     if (_customers.find(c => c.id === dto.id)) return { ok: false, message: 'Customer ID already exists.' };
//     _customers.push(new CustomerDTO(dto.id, dto.name, dto.address, dto.salary));
//     return { ok: true, message: 'Customer saved.' };
//   }

//   /**
//    * @returns {{ ok: boolean, message: string }}
//    */
//   function update(dto) {
//     const idx = _customers.findIndex(c => c.id === dto.id);
//     if (idx === -1) return { ok: false, message: 'Customer not found.' };
//     _customers[idx] = new CustomerDTO(dto.id, dto.name, dto.address, dto.salary);
//     return { ok: true, message: 'Customer updated.' };
//   }

//   /**
//    * @returns {{ ok: boolean, message: string }}
//    */
//   function remove(id) {
//     const idx = _customers.findIndex(c => c.id === id);
//     if (idx === -1) return { ok: false, message: 'Customer not found.' };
//     _customers.splice(idx, 1);
//     return { ok: true, message: 'Customer deleted.' };
//   }

//   function count() { return _customers.length; }



//   return { seed, getAll, findById, search, add, update, remove, count  , saveCustomer , updateCustomer , deleteCustomer};



// })();