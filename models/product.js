const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    picture: { type: String },
    // views: { type: Number, default: 0 },
    // reviewsCount: { type: Number, default: 0 },
    // averageRating: { type: Number, default: 0 },
    // ranking: { type: Number, default: 6 },
  },
  {
    timestamps: true,
  },
);

module.exports = {
  Product: mongoose.model("Product", productSchema),
};
