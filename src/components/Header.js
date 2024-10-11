// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '/Users/dmr/Documents/GitHub/bazaar/src/images/logo.png';
function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><img src={logo} alt="Bazaar" /></Link>
        {/* <Link to="/"><h1>BAZAAR</h1></Link> */}
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
      </div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>
            <button onClick={toggleDropdown} className="dropdown-btn">
              Categories
            </button>
            {isDropdownOpen && (
              <ul className="dropdown">
                <li><Link to="/products/clothing">Clothing</Link></li>
                <li><Link to="/products/electronics">Electronics</Link></li>
                <li><Link to="/products/shoes">Shoes</Link></li>
                <li><Link to="/products/watches">Watches</Link></li>
                <li><Link to="/products/kids-babies">Kids & Babies</Link></li>
                <li><Link to="/products/health-beauty">Health & Beauty</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/cart">Shopping Cart</Link></li>
          <li><Link to="/order">Place Order</Link></li> {/* Added link to Order Form */}
          <li><Link to="/help">Help</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
