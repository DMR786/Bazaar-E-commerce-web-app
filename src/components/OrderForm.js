import React, { useState } from 'react';
import './OrderForm.css'; // Import CSS for styling
import googlePay from '/Users/dmr/Documents/GitHub/bazaar/src/images/paytm.png';
import paytm from '/Users/dmr/Documents/GitHub/bazaar/src/images/gpay.jpeg';
import phonePe from '/Users/dmr/Documents/GitHub/bazaar/src/images/phonepay.png';

function OrderForm() {
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
    bankName: '',
    accountNumber: '',
    cardHolderName: '',
    creditCardNumber: '',
    cvv: '',
    expiryDate: '',
  });

  const [showBankNameField, setShowBankNameField] = useState(false);
  const [showAccountNumberField, setShowAccountNumberField] = useState(false);
  const [showCardFields, setShowCardFields] = useState(false);
  const [showQR, setShowQR] = useState(false); // For Online UPI
  const [showCODMessage, setShowCODMessage] = useState(false); // For COD message visibility

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Format Credit Card Number with spaces after every 4 digits
    if (name === 'creditCardNumber') {
      let formattedValue = value.replace(/\s+/g, '').replace(/[^0-9]/g, ''); // Remove any non-numeric characters and spaces
      if (formattedValue.length > 0) {
        formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || formattedValue; // Add space every 4 digits
      }

      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        [name]: formattedValue,
      }));
    } else {
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }

    // Show/hide dynamic fields based on payment method
    if (name === 'paymentMethod') {
      if (value === 'online-banking') {
        setShowBankNameField(true);
        setShowCardFields(false);
        setShowQR(false);
        setShowCODMessage(false);
      } else if (value === 'credit-card') {
        setShowCardFields(true);
        setShowBankNameField(false);
        setShowQR(false);
        setShowCODMessage(false);
      } else if (value === 'upi') {
        setShowQR(true);
        setShowBankNameField(false);
        setShowCardFields(false);
        setShowCODMessage(false);
      } else if (value === 'cod') {
        setShowBankNameField(false);
        setShowAccountNumberField(false);
        setShowCardFields(false);
        setShowQR(false);
        setShowCODMessage(true); // Show COD message
      } else {
        setShowBankNameField(false);
        setShowAccountNumberField(false);
        setShowCardFields(false);
        setShowQR(false);
        setShowCODMessage(false);
      }
    }

    // Show/hide account number field based on bank name input
    if (name === 'bankName') {
      if (value.trim() !== '') {
        setShowAccountNumberField(true);
      } else {
        setShowAccountNumberField(false);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Order Details:', orderDetails);
    // Further processing for order submission
  };

  return (
    <div className="order-form-container">
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        {/* Basic Details */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={orderDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={orderDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Shipping Address:</label>
          <textarea
            name="address"
            value={orderDetails.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Payment Method Selection */}
        <div className="form-group">
          <label>Mode of Payment:</label>
          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={orderDetails.paymentMethod === 'credit-card'}
                onChange={handleInputChange}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="online-banking"
                checked={orderDetails.paymentMethod === 'online-banking'}
                onChange={handleInputChange}
              />
              Net Banking
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={orderDetails.paymentMethod === 'upi'}
                onChange={handleInputChange}
              />
              Online UPI
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={orderDetails.paymentMethod === 'cod'}
                onChange={handleInputChange}
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        {/* Conditionally Rendered Fields for Net Banking */}
        {showBankNameField && (
          <div className="form-group">
            <label>Bank Name:</label>
            <input
              type="text"
              name="bankName"
              value={orderDetails.bankName}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {showAccountNumberField && (
          <div className="form-group">
            <label>Account Number:</label>
            <input
              type="text"
              name="accountNumber"
              value={orderDetails.accountNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {/* Conditionally Rendered Fields for Credit Card */}
        {showCardFields && (
          <>
            <div className="form-group">
              <label>Card Holder Name:</label>
              <input
                type="text"
                name="cardHolderName"
                value={orderDetails.cardHolderName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Credit Card Number:</label>
              <input
                type="text"
                name="creditCardNumber"
                maxLength="19" // Adjust max length to account for spaces
                value={orderDetails.creditCardNumber}
                onChange={handleInputChange}
                required
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="form-group">
              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                maxLength="3"
                value={orderDetails.cvv}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Expiry Date:</label>
              <input
                type="month"
                name="expiryDate"
                value={orderDetails.expiryDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}

        {/* Conditionally Rendered QR and UPI options */}
        {showQR && (
          <div className="form-group">
            <label>Pay using:</label>
            <div className="payment-options">
              <img src={googlePay} alt="Google Pay" />
              <label>GPay</label>
              <img src={paytm} alt="Paytm" />
              <label>Paytm</label>
              <img src={phonePe} alt="PhonePe" />
              <label>PhonePe</label>
            </div>
          </div>
        )}

        {/* Conditionally Rendered Message for COD */}
        {showCODMessage && (
          <div className="form-group cod-message">
            <p>Cash on Delivery selected. You will pay when the item is delivered.</p>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit Order</button>
      </form>
    </div>
  );
}

export default OrderForm;
