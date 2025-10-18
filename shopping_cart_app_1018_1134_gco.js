// 代码生成时间: 2025-10-18 11:34:58
// shopping_cart_app.js

/**
 * Shopping Cart Application using JavaScript and THREEJS framework.
 * This application simulates a simple shopping cart functionality.
 *
 * @author Your Name
 * @version 1.0
 * @since 2023-04
 */

class ShoppingCart {
  /**
   * Constructor for ShoppingCart class.
   * Initializes the cart with an empty list of items.
   */
  constructor() {
    this.items = [];
  }

  /**
   * Adds an item to the shopping cart.
   *
   * @param {Object} item - The item to be added to the cart.
   * @param {String} item.name - The name of the item.
   * @param {Number} item.price - The price of the item.
   * @param {Number} item.quantity - The quantity of the item.
   */
  addItem(item) {
    if (!item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
      throw new Error('Invalid item format. Item must have name, price, and quantity.');
    }

    // Check if the item already exists in the cart
    const existingItemIndex = this.items.findIndex((cartItem) => cartItem.name === item.name);
    if (existingItemIndex !== -1) {
      // If it exists, increment the quantity
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      // If it doesn't exist, add the item to the cart
      this.items.push(item);
    }
  }

  /**
   * Removes an item from the shopping cart by name.
   *
   * @param {String} itemName - The name of the item to be removed.
   */
  removeItem(itemName) {
    this.items = this.items.filter((item) => item.name !== itemName);
  }

  /**
   * Calculates the total price of all items in the cart.
   *
   * @returns {Number} The total price of the items in the cart.
   */
  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  /**
   * Clears the shopping cart.
   */
  clearCart() {
    this.items = [];
  }

  /**
   * Displays the current state of the shopping cart.
   *
   * @returns {String} A string representation of the cart's contents.
   */
  displayCart() {
    return this.items.map((item) => `${item.name}: ${item.quantity} x $${item.price}`).join('
');
  }
}

// Example usage:

try {
  const cart = new ShoppingCart();
  cart.addItem({ name: 'Apple', price: 0.99, quantity: 2 });
  cart.addItem({ name: 'Banana', price: 0.59, quantity: 5 });
  console.log(cart.displayCart());
  console.log(`Total: $${cart.calculateTotal()}`);
  cart.removeItem('Banana');
  console.log(cart.displayCart());
  console.log(`Total after removal: $${cart.calculateTotal()}`);
} catch (error) {
  console.error(error.message);
}
