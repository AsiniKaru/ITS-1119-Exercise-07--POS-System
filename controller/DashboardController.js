import { CustomerDB, ItemDB, OrderDB } from "../db/database.js";


export function updateDashboardCounts() {
    console.log("Updating Dashboard..."); // For debugging
    
    // Customer Card
    $('#totalCmCount').text(CustomerDB.length);

    // Item Card
    $('#totalItemsCount').text(ItemDB.length);

    // Total Revenue Card
    let totalRevenue = 0;
    OrderDB.forEach(order => {
        totalRevenue += order.total;
    });
    $('#totalOrdersCount').text(`Rs. ${totalRevenue.toLocaleString('en-US', {minimumFractionDigits: 2})}`);
}

// Expose it to the global window object so LoginController can see it
window.updateDashboardCount = updateDashboardCounts;

