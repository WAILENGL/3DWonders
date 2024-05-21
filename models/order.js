const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderLineSchema = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    orderQty: { type: Number, required: true, default: 1, Min: 1 },
  },
  { toJSON: { virtuals: true } },
);

orderLineSchema.virtual("extPrice").get(function () {
  return this.orderQty * this.product_id.price;
});

const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    paidStatus: { type: Boolean, required: true, default: false },
    orderStatus: { type: String, required: true, default: "Not Paid" },
    orderLine: [orderLineSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

orderSchema.virtual("orderTotal").get(function () {
  return this.orderLine.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual("totalQty").get(function () {
  return this.orderLine.reduce((total, item) => total + item.orderQty, 0);
});

// orderSchema.virtual('orderId').get(function () {
//   return this.id.slice(-6).toUpperCase();
// });

orderSchema.methods.populateProducts = function () {
  return this.populate({
    path: "orderLine.product_id",
    select: "name price", // you can specify the fields you want to include in the returned documents
  });
};

module.exports = {
  Order: mongoose.model("Order", orderSchema),
};
