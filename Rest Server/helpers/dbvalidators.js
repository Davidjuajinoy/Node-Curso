const { User, Role, Category, Product } = require("../models");

const roleIsValid = async (role = "") => {
  const roleExist = await Role.findOne({ role: role });
  if (!roleExist) {
    throw new Error("The role is Invalid");
  }
};

const emailExist = async (email = "") => {
  const emailRegistered = await User.findOne({ email });
  if (emailRegistered) {
    throw new Error("The email is registered");
  }
};

const idExist = async (id = "", model = User) => {
  const idRegistered = await model.findById(id);
  if (!idRegistered) {
    throw new Error(`The id does not exist ${id}`);
  }
};
const categoryExist = async (name = "") => {
  const category = await Category.findOne({ name: name.toUpperCase() });
  if (category) {
    throw new Error(`The category ${category.name} already exists`);
  }
};

const productExist = async (name = "") => {
  const product = await Product.findOne({ name: name.toUpperCase() });
  if (product) {
    throw new Error(`The product ${product.name} already exists`);
  }
};

module.exports = {
  categoryExist,
  emailExist,
  idExist,
  productExist,
  roleIsValid,
};
