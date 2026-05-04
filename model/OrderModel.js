

const OrderModel = (() => {
  let _orders  = [];       // Completed orders (OrderDTO[])
  let _cart    = [];       // Active order line items
  let _counter = 1;        // Auto-increment for order IDs


  function getCart() { return [..._cart]; }

  /**
   * @returns {{ ok: boolean, message: string }}
   */
  function addToCart(itemCode, orderQty) {
    const item = ItemModel.findByCode(itemCode);
    if (!item) return { ok: false, message: 'Item not found.' };
    if (orderQty <= 0) return { ok: false, message: 'Quantity must be greater than 0.' };

    const existing = _cart.find(l => l.code === itemCode);
    const totalQty = (existing ? existing.qty : 0) + orderQty;
    if (totalQty > item.qty) return { ok: false, message: 'Insufficient stock.' };

    if (existing) {
      existing.qty      = totalQty;
      existing.lineTotal = existing.price * existing.qty;
    } else {
      _cart.push({
        code:      item.code,
        name:      item.name,
        price:     item.price,
        qty:       orderQty,
        lineTotal: item.price * orderQty,
      });
    }
    return { ok: true, message: 'Item added to cart.' };
  }

  function clearCart() { _cart = []; }

  /* ── Order totals */

  function calcTotal() {
    return _cart.reduce((sum, l) => sum + l.lineTotal, 0);
  }

  /**
   * @param {number} discountPct  - Percentage 0–100
   * @param {number} cash         - Cash tendered
   * @returns {{ total, subtotal, balance }}
   */
  function calcSummary(discountPct = 0, cash = 0) {
    const total    = calcTotal();
    const subtotal = total - (total * discountPct / 100);
    const balance  = cash - subtotal;
    return { total, subtotal, balance };
  }

  /* ── Completing an order  */

  /**
   * @returns {{ ok: boolean, message: string, orderId?: string }}
   */
  function placeOrder(custId, date, discountPct, cash) {
    if (!_cart.length)  return { ok: false, message: 'Cart is empty.' };
    if (!custId)        return { ok: false, message: 'Please select a customer.' };

    const { subtotal, balance } = calcSummary(discountPct, cash);
    if (cash < subtotal) return { ok: false, message: 'Insufficient cash.' };

    // Deduct stock
    for (const line of _cart) {
      const result = ItemModel.deductStock(line.code, line.qty);
      if (!result.ok) return { ok: false, message: result.message };
    }

    const orderId = 'ORD' + String(_counter).padStart(3, '0');
    _orders.push(new OrderDTO(orderId, date, custId, [..._cart], subtotal));
    _counter++;
    clearCart();
    return { ok: true, message: 'Purchase complete!', orderId };
  }

  /* ── Accessors  */

  /** Generate the NEXT order ID  */
  function nextOrderId() {
    return 'ORD' + String(_counter).padStart(3, '0');
  }

  /** Total completed orders */
  function count() { return _orders.length; }

  return { getCart, addToCart, clearCart, calcTotal, calcSummary, placeOrder, nextOrderId, count };
})();