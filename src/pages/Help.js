// src/pages/Help.js
import React from 'react';
import './Help.css';

function Help() {
  return (
    <div className="help-container">
      <h2>Help & Support</h2>
      <p>Here you can find answers to frequently asked questions or contact us for further assistance.</p>
      <h3>Frequently Asked Questions:</h3>
      <ul>
        <li><strong>How do I place an order?</strong> You can place an order by adding items to your cart and proceeding to checkout.</li>
        <li><strong>Can I return a product?</strong> Yes, returns are accepted within 30 days of purchase.</li>
        <li><strong>What payment methods are accepted?</strong> We accept credit cards, debit cards, and various online payment methods.</li>
      </ul>
      <h3>Contact Us:</h3>
      <p>Email: support@flipcart.com</p>
      <p>Phone: +1 234 567 890</p>
    </div>
  );
}

export default Help;
