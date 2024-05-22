const Data = require("../../models/product");

const index = async (req, res) => {
  try {
    const products = await Data.Product.find({});
    res.status(201).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const productDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Data.Product.findById(productId);
    console.log("this");
    // .populate('product');  need to use at orderline
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

const createProduct = async (req, res) => {
  const { title, description, price, picture } = req.body;
  console.log(title, description, price, picture);
  // console.log("body",body)
  try {
    const product = await Data.Product.create({
      title,
      description,
      price,
      picture,
    });
    // console.log("product:",product)
    res.status(201).json(product);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  console.log("deleteProduct????", productId);
  try {
    await Data.Product.findOneAndDelete({ _id: productId });
    res
      .status(201)
      .json({ message: `Product ID ${productId} Deleted Successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = {
  index,
  productDetails,
  createProduct,
  deleteProduct,
};
