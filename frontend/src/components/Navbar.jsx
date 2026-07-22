import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../assets/Shopnest-logo.png';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

    const {user, logout} = useContext(AuthContext);
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log("cartItems: ", cartItems.length);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

return (
    <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">
            <img src={logo} alt="Shopnest-logo" className="navbar-logo" />
            Shopnest
            </Link> 
        </div>

        <ul className="navbar-links">
            <li>
                <Link to="/shop">Shop</Link>
            </li>
            <li>
                <Link to="/cart">Cart ({cartItems.length})</Link>
            </li>
            {user ? (
                <>
                    <li>
                        <Link to="/profile">{user.name}</Link>
                    </li>
                    {user.role === 'admin' && (
                        <li>
                            <Link to="/admin">Admin</Link>
                        </li>
                    )}
                    <li>
                        <button onClick={handleLogout} className='btn-logout'>Logout</button>
                    </li>
                </>
            ): (
                <li><Link to="/login">Login</Link></li>
            )}
        </ul>
    </nav>
)};

export default Navbar;