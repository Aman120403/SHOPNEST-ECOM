const Order =  require('../model/Order');

const sendEmail = require('../utils/sendEmail');


//Create new Order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        
        if(!items || items.length === 0 || !totalAmount || !address || !paymentId){
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        //console.log("User ID:", req.user._id);
        
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
        });

        const savedOrder = await order.save();
        await sendEmail(req.user.email, 'Order Created', `Your order has been created successfully. Order ID: ${savedOrder._id}`);
        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId', 'name price');
        res.status(200).json({ message: 'Orders retrieved successfully', orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'id name');
        res.status(200).json({ message: 'Orders retrieved successfully', orders });
    }   catch (error) {         
        res.status(400).json({ message: error.message });
    }   

};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if(order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }   
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {  createOrder, getOrders, myOrders, updateOrderStatus};