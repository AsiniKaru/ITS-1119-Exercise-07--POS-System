import { OrderDB } from "../db/database.js";
import { OrderDetailDB } from "../db/database.js";

// ================ Save Order ===================
export function saveOrder(newOrder) {
  console.log("Saving.......");

    if (OrderDB.find(c => c.orderId=== newOrder.id)) {
        return false;
    }

    OrderDB.push({
        orderId: newOrder.id,      // Use : instead of =
        date: newOrder.date,        // Use : instead of =
        custId: newOrder.customerId, // Match the property name passed from Controller
        total: newOrder.total,
        discount: newOrder.discount,
        orderDetails: newOrder.cart // Clone the cart array
    });
    return true;
}

