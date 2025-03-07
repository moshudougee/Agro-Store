import express from "express";
import { deleteOrder, getAllOrders, getMyOrders, getOrderById, placeOrder, updateOrder } from "../controllers/orderController";
import { authenticate, authenticateAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, placeOrder);
router.get("/getAllOrders", authenticate, authenticateAdmin, getAllOrders);
router.get("/getOrder/:orderId", authenticate, getOrderById);
router.get("/getMyOrders", authenticate, getMyOrders);
router.put("/updateOrder/:orderId", authenticate, updateOrder);
router.delete("/deleteOrder/:orderId", authenticate, authenticateAdmin, deleteOrder);

export default router;
