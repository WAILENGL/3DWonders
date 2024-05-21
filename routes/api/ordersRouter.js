const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/api/orderController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post(
  "/update/:orderId/",
  [orderController.validateUserOrder],
  orderController.updateOrder,
);
router.post(
  "/create/:orderId/",
  [orderController.validateUserOrder],
  orderController.createOrderLine,
);
router.delete("/update/:orderId/", orderController.deleteOrder);

router.get("/order", orderController.getOrder); //orders
router.post("/order/updateStatus", orderController.updateOrderStatus); //
router.get("/getUserOrders/", [ensureLoggedIn], orderController.getUserOrders);

// router.get("/:userId/orders", orderController.getUserOrdersById);

router.get("/order/:orderId", orderController.getOrder);
// router.get("/getuseOrder/:userId", orderController.getUserOrders);

router.get(
  "/checkout/:orderId",
  [orderController.validateUserOrder],
  orderController.getUserByOrderId,
);
router.patch(
  "/:orderId/paid",
  [ensureLoggedIn],
  orderController.updateOrderPaid,
);

module.exports = router;
