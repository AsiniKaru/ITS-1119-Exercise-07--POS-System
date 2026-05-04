export class Item {
    constructor(code, name, price , qty) {
        this.code  = code;
        this.name  = name;
        this.price = parseFloat(price) 
        this.qty   = parseInt(qty)   

    }
}

