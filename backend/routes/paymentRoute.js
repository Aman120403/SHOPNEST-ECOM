const express = require("express");

const {protect} = require("../middleware/authMiddleware");
const {admin} = require("../middleware/adminMiddleware");
const { createdOrder,verifyPayment } = require("../controller/paymentController");

const router = express.Router();

router.post("/order", createdOrder);
router.post("/verify", verifyPayment);

module.exports = router;