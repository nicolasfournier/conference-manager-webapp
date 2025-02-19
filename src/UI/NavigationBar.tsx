import React from 'react';
import './NavigationBar.css';

const Brand = () => {
  return (
    <div className="brand">
      <h1>ConfMan</h1>
    </div>
  );
}

const NavigationBar = () => {
  return (
    <nav className="navigationbar">
      <div className="navigationbar-left">
        <a href="/" className="logo">
          ShopNow
        </a>
      </div>
      <div className="navigationbar-center">
        <ul className="navigation-links">
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div className="navigationbar-right">
        <a href="/cart" className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">0</span>
        </a>
        <a href="/account" className="user-icon">
          <i className="fas fa-user"></i>
        </a>
      </div>
    </nav>
  );
};

export default NavigationBar;
