export class Order {
    constructor(orderId, date, custId ,total ,discount,orderDetails) {
        this.orderId = orderId;
        this.date    = date;
        this.custId  = custId;
        this.total   = total;
        this.discount = discount;
        this.orderDetails = orderDetails;

    }
}

