// src/pages/Cart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Cart.css';
import OrderForm from '/Users/dmr/Documents/GitHub/bazaar/src/components/OrderForm.js';

function Cart() {
  const navigate = useNavigate(); // Initialize navigate
  const [cartItems, setCartItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState('');

  const addItem = () => {
    // Validate inputs
    if (itemName.trim() === '' || itemPrice === '' || isNaN(itemPrice) || itemQuantity <= 0) {
      alert('Please provide valid item details.'); // Simple alert for invalid input
      return;
    }

    const newItem = {
      id: new Date().getTime(), // Unique ID using timestamp
      name: itemName,
      quantity: parseInt(itemQuantity),
      price: parseFloat(itemPrice),
    };

    setCartItems([...cartItems, newItem]);

    // Clear input fields
    setItemName('');
    setItemQuantity(1);
    setItemPrice('');
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeItem(id);
    } else {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === id
          ? { ...cartItem, quantity: parseInt(quantity) } // Ensure quantity is an integer
          : cartItem
      ));
    }
  };

  const updatePrice = (id, price) => {
    if (!isNaN(price)) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === id
          ? { ...cartItem, price: parseFloat(price) } // Ensure price is a float
          : cartItem
      ));
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/order'); // Adjust this path based on your routing setup
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
        </>
      ) : null}
      <h3>{cartItems.length === 0 ? "Add an Item" : "Add More Items"}</h3>
      <div className="add-item-container">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="item-input"
        />
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
          className="item-input"
        />
        <input
          type="text"
          placeholder="Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className="item-input"
        />
        <button className="add-button" onClick={addItem}>
          {cartItems.length === 0 ? "Add Item" : "Add More"}
        </button>
      </div>
      {cartItems.length > 0 && (
        <ul className="cart-items">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="item-quantity"
                />
                <input
                  type="text"
                  value={item.price}
                  min="0"
                  onChange={(e) => updatePrice(item.id, e.target.value)}
                  className="item-price"
                />
                <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total Amount: ${getTotalAmount()}</h3>
          <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
