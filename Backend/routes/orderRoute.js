import express from "express";
import Order from "../models/Orders.js";
import authUser from "../middleware/authUser.js"; 

const router = express.Router();

router.post("/place-order", authUser, async (req, res) => {
  try {
    const userId = req.user.id; 

    const { cart, address, totalBill, tax, finalAmount } = req.body;

    if (!cart || !address || !totalBill || !tax || !finalAmount) {
      return res.status(400).json({ message: "Incomplete order details" });
    }

    const newOrder = new Order({
      user: userId,
      cart,
      address,
      totalBill,
      tax,
      finalAmount,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: "Server error placing order" });
  }
});


router.get("/user/:id", authUser, async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await Order.find({ user: userId });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/my-orders", authUser, async (req, res) => {
  try {
    const userId = req.user.id; 

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




  

export default router;
