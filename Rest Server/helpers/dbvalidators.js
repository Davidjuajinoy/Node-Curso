const Role = require("../models/role");
const User = require("../models/user");

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
const idExist = async (id = "") => {
  const idRegistered = await User.findById(id);
  if (!idRegistered) {
    throw new Error(`The id does not exist ${id}`);
  }
};

module.exports = {
  roleIsValid,
  emailExist,
  idExist,
};
