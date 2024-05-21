const Data = require("../../models/order");
const { User } = require("../../models/user");
const { getUser } = require("../../config/checkToken");

const updateOrderStatus = async (req, res) => {
  console.log(req.body.orderStatus);
  try {
    await Data.Order.updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          orderStatus: req.body.orderStatus,
        },
      },
    );

    res.status(201).json();
    // .json({ message: "Order created successfully", testing123 });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrder = async (req, res) => {
  // console.log("here", req.body);
  // console.log("qty", req.body.orderQty);
  // console.log(req.params.orderId)
  try {
    await Data.Order.updateOne(
      {
        "orderLine.product_id": req.body.product_id,
        _id: req.params.orderId,
      },
      {
        $set: {
          "orderLine.$.orderQty": req.body.orderQty,
        },
      },
    );

    const testing456 = await Data.Order.findOne({
      "orderLine.product_id": req.body.product_id,
      "Order._id": req.params.orderId,
    }).populate({
      path: "orderLine.product_id",
      model: "Product",
    });
    console.log("testing456", testing456);
    return res.status(201).json(testing456);
    // .json({ message: "Order created successfully", testing123 });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createOrderLine = async (req, res) => {
  const { orderId } = req.params;
  const body = req.body;
  const Order = await Data.Order.findById(orderId);
  Order.orderLine.push(body);
  Order.save();
  const newData = await Data.Order.findById({ _id: orderId }).populate({
    path: "orderLine.product_id",
    model: "Product",
  });
  res.status(201).json(newData);
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    await Data.Order.updateOne(
      {
        "orderLine.product_id": orderId,
      },
      {
        $pull: {
          orderLine: { product_id: orderId },
        },
      },
    );
    res
      .status(201)
      .json({ message: `Product ID ${orderId} Deleted Successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

const getOrder = async (req, res) => {
  const products = await Data.Order.find({})
    .populate({
      path: "orderLine.product_id",
      model: "Product",
    })
    .populate("user_id");
  console.log("products", products);
  res.status(201).json(products);
};

const getUserOrders = async (req, res) => {
  const user = getUser(req, res);
  const userId = user._id;
  console.log("this", userId);
  try {
    const User = await Data.Order.findOne({
      user_id: userId,
      paidStatus: false,
    }).populate({
      path: "orderLine.product_id",
      model: "Product",
    });

    if (User === null) {
      const newOrder = await Data.Order.create({});
      newOrder.user_id = userId;
      newOrder.save();
      console.log("here?", newOrder);
      res.status(201).json([newOrder]);
    } else {
      res.status(201).json(User);
    }
  } catch (error) {
    console.log("here is the err", error);
    res.status(401).json({ error });
  }
};

//get user id and details
const getUserByOrderId = async (req, res) => {
  const { orderId } = req.params;
  console.log("testhere");
  try {
    const order = await Data.Order.findById(orderId).populate("user_id");
    if (!order) {
      console.log(`Order not found for orderId: ${orderId}`);
      return res.status(404).json({ message: "Order not found" });
    }
    console.log(`Order found: ${order}`);
    res.status(200).json(order.user_id);
  } catch (error) {
    console.error(`Error fetching user by order ID: ${error}`);
    res.status(500).json({ message: "Error fetching user by order ID" });
  }
};
//updates the order and user data when place order button is pushed
const updateOrderPaid = async (req, res) => {
  const { orderId } = req.params;
  const usersss = getUser(req, res);
  const userId = usersss._id;

  const updatedData = { paidStatus: true, orderStatus: "Paid", ...req.body };

  try {
    const updatedOrder = await Data.Order.findByIdAndUpdate(
      orderId,
      updatedData,
      { new: true },
    );
    if (!updatedOrder) {
      return res.status(500).json({ message: "Error updating order" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { orders: orderId } },
      { new: true },
    );
    console.log("results,", user);
    if (!user) {
      return res.status(500).json({ message: "Error updating user" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order" });
  }
};

const validateUserOrder = async (req, res, next) => {
  try {
    const user = getUser(req, res);
    const { orderId } = req.params;
    console.log("225", user);
    const userId = user._id;

    await Data.Order.findOne({
      user_id: userId,
      _id: orderId,
    });

    next();
  } catch (error) {
    console.log("Unauthorized order", error);
    res.status(401).json({ error });
  }
};

module.exports = {
  updateOrder,
  createOrderLine,
  deleteOrder,
  getOrder,
  getUserOrders,
  getUserByOrderId,
  updateOrderPaid,
  updateOrderStatus,
  validateUserOrder,
};
