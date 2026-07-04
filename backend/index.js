const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoute');
dotenv.config();
const paymentRoutes = require('./routes/paymentRoute');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.get("/", (req,res) =>{
    res.send("Shopnest backend is running");
});
connectDB();
app.listen(PORT, () =>{
    console.log(`Server is running on PORT: ${PORT}`);
});



