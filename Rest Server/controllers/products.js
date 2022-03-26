const { response } = require("express");

const { Product } = require("../models");

const productGet = async (req, res) => {
  const { limit = "5", since = 0 } = req.query;
  const queryMongo = { state: true };
  /*  */
  const [countProduct, product] = await Promise.all([
    Product.countDocuments(queryMongo),
    Product.find(queryMongo)
      .skip(Number(since))
      .limit(Number(limit))
      .populate("user", "name")
      .populate("category", "name"),
  ]);
  res.json({
    countProduct,
    product,
  });
};

const productGetById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  if (!product.state) {
    return res.json({
      msg: `Product ${id} id not exist : Status false`,
    });
  }
  res.json({
    product,
  });
};

const productPost = async (req, res) => {
  const name = req.body.name.toUpperCase();

  const { state, user, name: na, ...product } = req.body;

  const data = {
    name,
    ...product,
    user: req.user._id,
  };

  const ProductNew = new Product(data);
  await ProductNew.save();
  res.status(201).json({
    ProductNew,
  });
};

const productPut = async (req, res) => {
  const { id } = req.params;
  const { user, state, ...data } = req.body;

  data.user = req.user._id;

  if (data.name) {
    data.name = data.name.toUpperCase();
    const nameExist = await Product.findOne({ name: data.name });
    if (nameExist._id != id) {
      return res.json({
        msg: `The product ${data.name} already exists`,
      });
    }
  }

  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  res.json({
    msg: `Product update ${id}`,
    product,
  });
};

const productDelete = async (req, res) => {
  const { id } = req.params;

  // eliminar el objeto completo
  // const user = await User.findByIdAndDelete(id);
  // desactivar usuario
  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  const userAuthentication = req.user;
  res.json({
    product,
    userAuthentication,
  });
};

module.exports = {
  productGet,
  productPost,
  productPut,
  productGetById,
  productDelete,
};
