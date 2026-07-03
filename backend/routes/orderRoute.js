const express = require("express");

const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");
const {createOrder, getOrders, myOrders, updateOrderStatus} = require("../controller/orderController");

const router = express.Router();
// console.log({
//     protect,
//     admin,
//     createOrder,
//     getOrders,
//     myOrders,
//     updateOrderStatus
// });

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);

router.route("/myOrders").get(protect, myOrders );

router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;