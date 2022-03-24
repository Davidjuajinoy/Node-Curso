const User = require("../models/user");

const validAdminRole = async (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "token undefined :se quiere validar el role sin validar el token",
    });
  }
  const { role, name } = req.user;

  if (role != "ADMIN_ROLE") {
    return res.status(500).json({
      msg: `${name} Role invalid  :role !=ADMIN_ROLE`,
    });
  }
  next();
};

const hasRole = (...rols) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "token undefined :se quiere validar el role sin validar el token",
      });
    }


    if (!rols.includes(req.user.role)) {
      return res.status(401).json({
        msg: `Role invalid  ${req.user.role} != ${rols}`,
      });
    }

    next();
  };
};

module.exports = {
  validAdminRole,
  hasRole,
};
