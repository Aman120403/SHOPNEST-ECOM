const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./model/userModel');
const Product = require('./model/Product');

const seedData = async () => {
  try {
    console.log('Starting seed process...');
    console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'NOT SET');
    
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB successfully');

    console.log('Clearing existing data...');
    const deletedUsers = await User.deleteMany({});
    const deletedProducts = await Product.deleteMany({});
    console.log(`Deleted ${deletedUsers.deletedCount} users and ${deletedProducts.deletedCount} products`);

    const hashedPassword = await bcrypt.hash('123456', 10);
    const adminPassword = await bcrypt.hash('admin123', 10);

    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        isVerified: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'user',
        isVerified: true,
      },
      {
        name: 'Admin User',
        email: 'admin@shopnest.com',
        password: adminPassword,
        role: 'admin',
        isVerified: true,
      },
    ];

    const products = [
      {
        name: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones with 30-hour battery life.',
        price: 1499,
        category: 'Electronics',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        numReviews: 12,
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking and Bluetooth calling.',
        price: 2499,
        category: 'Wearables',
        stock: 10,
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
        rating: 4.2,
        numReviews: 8,
      },
      {
        name: 'Laptop Backpack',
        description: 'Durable backpack with padded laptop sleeve and multiple compartments.',
        price: 899,
        category: 'Accessories',
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        rating: 4.0,
        numReviews: 6,
      },
    ];

    console.log('Inserting users...');
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users inserted`);

    console.log('Inserting products...');
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products inserted`);

    console.log('✓ Seed data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seed failed:', error);
    process.exit(1);
  }
};

seedData();
