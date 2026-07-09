import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (    
        <div>
            <h1>Welcome to Shopnest</h1>
            <p>Your one-stop shop for all your needs!</p>
            <Link to="/shop">Start Shopping</Link>
        </div>
    );
};

export default Home;