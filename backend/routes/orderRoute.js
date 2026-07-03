const express = require("express");

const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");
const {createOrder, getOrders,getAllOrders} = require("../controller/orderController");

const router = express.Router();

router.route("/").post(createOrder).get(protect, admin, getOrders);

router.route("/myOrders").get(protect, getAllOrders);