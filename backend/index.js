const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/auth", authRoutes);
app.get("/", (req,res) =>{
    res.send("Shopnest backend is running");
});
connectDB();
app.listen(PORT, () =>{
    console.log(`Server is running on PORT: ${PORT}`);
});



