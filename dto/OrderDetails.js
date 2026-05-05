export class OrderDetails {
    constructor(orderId,itemId,itemName , unitPrice, qty , price) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.itemName = itemName;
        this.unitPrice = unitPrice;
        this.qty = qty;
        this.price = price;
    }
}
