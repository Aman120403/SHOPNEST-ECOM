const express = require("express");

const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");
const { creatdOrder,verifyPayment } = require("../controller/paymentController");

const router = express.Router();

router.post("/order", createOrder);
router.post("/verify", verifyPayment);

module.exports = router;