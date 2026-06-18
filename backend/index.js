const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req,res) =>{
    res.send("Shopnest backend is running");
});

app.listen(PORT, () =>{
    console.log(`Server is running on PORT: ${PORT}`);
});