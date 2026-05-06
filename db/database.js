import { Customer } from "../dto/Customer.js";
import { Item } from "../dto/Item.js";
import { Order } from "../dto/order.js";
import { OrderDetails } from "../dto/OrderDetails.js";


export let CustomerDB = [
    new Customer("CUS-001", "Asini Karunanayaka", "Galle", 500000.00),
    new Customer("CUS-002", "Senali Karunanayaka", "Colombo", 400000.00),
    new Customer("CUS-003", "Venuri De Silva", "Malabe", 550000.00),
    new Customer("CUS-004", "Tharuka Liyanage", "Moratuwa",350000.00),
    new Customer("CUS-005", "Rithika Liyanage", "Colombo", 380000.00)
  ];

export let ItemDB = [
  new Item("ITM-001", "Fresh Milk 1L", 450.00, 100),
  new Item("ITM-002", "Bread Loaf", 150.00,  50),
  new Item("ITM-003", "Eggs (12 pack)", 350.00,  80),
  new Item("ITM-004", "Coca Cola 1L", 450.00 , 200),
  new Item("ITM-005", "Yougert 250g", 300.00 , 50)
];


// export let OrderDB = [
//   new Order("ORD-001","2026-05-01","CUS-001", 1500.00,10,[{orderId:"ORD-001", itemId: "ITM-001", qty: 2 }]),
//   new Order("ORD-002","2026-05-02","CUS-002", 2200.00,20,[{orderId:"ORD-002", itemId: "ITM-004", qty: 2 }]),
//   new Order("ORD-003","2026-05-03","CUS-003", 7800.00, 5,[{orderId:"ORD-003", itemId: "ITM-002", qty: 1 }]),
//   new Order("ORD-004", "2026-05-04","CUS-004",1500.00, 0,[{orderId:"ORD-004", itemId: "ITM-004", qty: 2 }, {orderId:"ORD-004", itemId: "ITM-002", qty: 1 }]),
//   new Order("ORD-005", "2026-05-05","CUS-005",6400.00, 3,[{orderId:"ORD-005", itemId: "ITM-005", qty: 1 }, {orderId:"ORD-005", itemId: "ITM-001", qty: 2 }]),
// ];

export let OrderDB = [
  new Order("ORD-001", "2026-05-01", "CUS-001", 1500.00, 10, [
    new OrderDetails("ORD-001", "ITM-001", "Fresh Milk 1L", 450.00, 2, 900.00),
    new OrderDetails("ORD-001", "ITM-002", "Bread Loaf", 150.00, 4, 600.00)
  ]),
  new Order("ORD-002", "2026-05-02", "CUS-002", 1600.00, 20, [
    new OrderDetails("ORD-002", "ITM-004", "Coca Cola 1L", 450.00, 2, 900.00),
    new OrderDetails("ORD-002", "ITM-003", "Eggs (12 pack)", 350.00, 2, 700.00)
  ]),
  new Order("ORD-003", "2026-05-03", "CUS-003", 1500.00, 5, [
    new OrderDetails("ORD-003", "ITM-002", "Bread Loaf", 150.00, 1, 150.00)
  ]),
  new Order("ORD-004", "2026-05-04", "CUS-004", 1050.00, 0, [
    new OrderDetails("ORD-004", "ITM-004", "Coca Cola 1L", 450.00, 2, 900.00),
    new OrderDetails("ORD-004", "ITM-002", "Bread Loaf", 150.00, 1, 150.00)
  ]),
  new Order("ORD-005", "2026-05-05", "CUS-005", 1200.00, 3, [
    new OrderDetails("ORD-005", "ITM-005", "Yougert 250g", 300.00, 1, 300.00),
    new OrderDetails("ORD-005", "ITM-001", "Fresh Milk 1L", 450.00, 2, 900.00)
  ]),
  new Order("ORD-006", "2026-05-05", "CUS-004", 700.00, 0, [
    new OrderDetails("ORD-006", "ITM-003", "Eggs (12 pack)", 350.00, 2, 700.00)
  ]),
];

export let OrderDetailDB = [
  new OrderDetails("ORD-001","ITM-001", 2 ),
  new OrderDetails("ORD-002","ITM-004", 2 ),
  new OrderDetails("ORD-003","ITM-002", 1 ),
  new OrderDetails("ORD-004","ITM-004", 2 ),
  new OrderDetails("ORD-004","ITM-002", 1 ),
  new OrderDetails("ORD-005","ITM-005", 1 ),
  new OrderDetails("ORD-005","ITM-001", 2 )
];


