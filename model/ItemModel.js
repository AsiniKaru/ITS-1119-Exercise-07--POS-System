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




// const ItemModel = (() => {
//   let _items = [];

//   function seed() {
//     _items = [
//       new ItemDTO('IT001', 'Fresh Milk 1L',  200.00, 100),
//       new ItemDTO('IT002', 'Bread Loaf',      150.00,  50),
//       new ItemDTO('IT003', 'Eggs (12 pack)',  350.00,  80),
//     ];
//   }

//   function getAll() { return [..._items]; }

//   function findByCode(code) {
//     return _items.find(i => i.code === code) || null;
//   }

//   function findByName(namePart) {
//     const q = namePart.toLowerCase();
//     return _items.find(i => i.name.toLowerCase().includes(q)) || null;
//   }

//   function search(query) {
//     const q = query.toLowerCase();
//     return _items.filter(i =>
//       i.code.toLowerCase().includes(q) ||
//       i.name.toLowerCase().includes(q)
//     );
//   }

//   /**
//    * @returns {{ ok: boolean, message: string }}
//    */
//   function add(dto) {
//     if (!dto.code || !dto.name) return { ok: false, message: 'Code and Name are required.' };
//     if (_items.find(i => i.code === dto.code)) return { ok: false, message: 'Item code already exists.' };
//     _items.push(new ItemDTO(dto.code, dto.name, dto.price, dto.qty));
//     return { ok: true, message: 'Item saved.' };
//   }

//   /**
//    * @returns {{ ok: boolean, message: string }}
//    */
//   function update(dto) {
//     const idx = _items.findIndex(i => i.code === dto.code);
//     if (idx === -1) return { ok: false, message: 'Item not found.' };
//     _items[idx] = new ItemDTO(dto.code, dto.name, dto.price, dto.qty);
//     return { ok: true, message: 'Item updated.' };
//   }

//   /**
//    * @returns {{ ok: boolean, message: string }}
//    */
//   function remove(code) {
//     const idx = _items.findIndex(i => i.code === code);
//     if (idx === -1) return { ok: false, message: 'Item not found.' };
//     _items.splice(idx, 1);
//     return { ok: true, message: 'Item deleted.' };
//   }

//   /**
//    * @returns {{ ok: boolean, message: string }}
//    */
//   function deductStock(code, qty) {
//     const item = findByCode(code);
//     if (!item) return { ok: false, message: 'Item not found.' };
//     if (item.qty < qty) return { ok: false, message: 'Insufficient stock.' };
//     item.qty -= qty;
//     return { ok: true, message: 'Stock updated.' };
//   }

//   function count() { return _items.length; }

//   return { seed, getAll, findByCode, findByName, search, add, update, remove, deductStock, count };
// })();