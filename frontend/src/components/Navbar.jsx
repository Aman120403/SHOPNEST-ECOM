import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../assets/Shopnest-logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-brand">
             <Link to="/">
             <img src={logo} alt="Shopnest-logo" className="navbar-logo" />
             Shopnest
             </Link> 

             <ul className="navbar-links">
                <li>
                    <Link to="/shop">Shop</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                {/* <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li> */}
             </ul>
        </div>
        </nav>
  )};

  export default Navbar;