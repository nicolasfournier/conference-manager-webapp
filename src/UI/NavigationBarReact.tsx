import React, { useState } from "react";
//import "./NavigationBarReact.css";
import { Link, NavLink } from "react-router-dom";
export const NavigationBarReact = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div>
            <Link to="/" className="title">
                Website
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/overview">Overview</NavLink>
                </li>
                <li>
                    <NavLink to="/programme">Programme</NavLink>
                </li>
                <li>
                    <NavLink to="/venue">Venue / Travel</NavLink>
                </li>
            </ul>
        </div>
    );
};

/*
      <Link to="/" className="title">
        Website
      </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/overview">Overview</NavLink>
        </li>
        <li>
          <NavLink to="/programme">Programme</NavLink>
        </li>
        <li>
          <NavLink to="/venue">Venue / Travel</NavLink>
        </li>
      </ul>
*/