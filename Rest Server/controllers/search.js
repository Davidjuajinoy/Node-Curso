const { Category, Product, Role, User } = require("../models");
const { ObjectId } = require("mongoose").Types;
const collectionsAllow = ["users", "categories", "products", "roles"];

const searchUsers = async (search = "", res) => {
  // verificar si envia una id
  const mongoId = ObjectId.isValid(search);
  if (mongoId) {
    const user = await User.findById(search);
    return res.json({
      results: user ? [user] : [],
    });
  }

  //   por palabra
  const regex = new RegExp(search, "i"); //para q no sea tan estricta
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  res.json({
    results: users ? [users] : [],
  });
};
const searchCategories = async (search = "", res) => {
  // verificar si envia una id
  const mongoId = ObjectId.isValid(search);
  if (mongoId) {
    const category = await Category.findById(search).populate("user", "name");
    return res.json({
      results: category ? [category] : [],
    });
  }

  //   por palabra
  const regex = new RegExp(search, "i"); //para q no sea tan estricta
  const categories = await Category.find({ name: regex, state: true }).populate(
    "user",
    "name"
  );
  res.json({
    results: categories ? [categories] : [],
  });
};

const searchProducts = async (search = "", res) => {
  // verificar si envia una id
  const mongoId = ObjectId.isValid(search);
  if (mongoId) {
    const product = await Product.findById(search).populate("category", "name");

    if (!product) {
      const productCategoryId = await Product.find({
        category: ObjectId(search),
      }).populate("category", "name");
      return res.json({
        results: productCategoryId ? [productCategoryId] : [],
      });
    }
    return res.json({
      results: product ? [product] : [],
    });
  }

  //   por palabra
  const regex = new RegExp(search, "i"); //para q no sea tan estricta
  const products = await Product.find({ name: regex, state: true }).populate(
    "category",
    "name"
  );
  res.json({
    results: products ? [products] : [],
  });
};

const search = (req, res) => {
  const { collection, search } = req.params;

  if (!collectionsAllow.includes(collection)) {
    return res.status(400).json({
      msg: `The ${collection} Collection Does not Exist, [${collectionsAllow}]`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(search, res);
      break;
    case "categories":
      searchCategories(search, res);
      break;
    case "products":
      searchProducts(search, res);
      break;

    default:
      res.status(500).json({
        msg: "Route under construction",
      });
      break;
  }
};

module.exports = {
  search,
};
