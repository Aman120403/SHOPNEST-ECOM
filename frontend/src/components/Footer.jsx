import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
        padding: '40px 20px', 
        marginTop: 'auto'
        }}> 
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            }}>
            <div>
                <h3 style={{color: '#f97316', marginBottom: '10px' }}>Shopnest</h3>
                <p style={{color: '#1a1a1a', fontSize: '0.9rem' }}>Premium E-Commerce Platform.</p>

            </div>

            <div style={{ display: 'flex', gap: '20px'}}>
                <Link to="/about" style={{ color: '#1a1a1a', fontSize: '0.9rem' }}>About Us</Link>
                <Link to="/return" style={{ color: '#1a1a1a', fontSize: '0.9rem' }}>Return Policy</Link>
                <Link to="/disclaimer" style={{ color: '#1a1a1a', fontSize: '0.9rem' }}>Disclaimer</Link>
            </div>
            <div style={{ color: '#1a1a1a', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} Shopnest. All rights reserved.
            </div>
        </div>
    </footer>
  );
};

export default Footer;