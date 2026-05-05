import { ItemDB } from "../db/database.js";



// ================ Save Item ===================
export function saveItem(tempSaveList) {
  console.log("Saving.......");

    if (ItemDB.find(c => c.code === tempSaveList.code)) {
        return false;
    }
    ItemDB.push({
        code: tempSaveList.code,
        name: tempSaveList.name,
        price: tempSaveList.price,
        qty: tempSaveList.qty,
      
    });
    return true;
}

// ================ Update Item ===================
export function updateItem(index,code , name,price,qty){
    console.log("Updating.......");
    
    if (ItemDB.find(c => c.code === !code)) {
        return false;
    } else{
        ItemDB[index].name = name;
        ItemDB[index].price = price;
        ItemDB[index].qty = qty; 
        
        return true;

    }
   
}


// ================ Delete Customer ===================
export function deleteItem(index){
     ItemDB.splice(index, 1);
     return true;

}

