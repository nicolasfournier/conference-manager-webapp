import React from 'react';
import './NavigationBar.css';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Brand = () => {
  return (
    <div className="brand">
      <h1>ConfMan</h1>
    </div>
  );
}

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
      <nav className="navigationbar">
        <div className="navigationbar-left">
        </div>
        <div className="navigationbar-center">
          <ul className="navigation-links">
            <li><a href="/overview">Overview</a></li>
            <li><a href="/programme">Programme</a></li>
            <li><a href="/venue">Venue/Travel</a></li>
            <li><a href="/actions">Actions</a>
            <ul>
            <li>Login</li>
            <li>Conference Registration</li>
            <li>Submit / Manage my Submissions</li>
            </ul>
            </li>
            <li><a href="/language"><FaRegUserCircle /></a></li>
          </ul>
        </div>
        <div className="navigationbar-right">
        </div>
      </nav>
  );
};

export default NavigationBar;
