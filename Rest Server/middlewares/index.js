// Errors Validators
const validations = require("../middlewares/validations");
const jwt = require("../middlewares/jwt");
const role = require("../middlewares/role");

module.exports = {
  ...validations,
  ...jwt,
  ...role,
};
