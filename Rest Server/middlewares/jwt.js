const { response } = require("express");
const { request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "access denied :no hay token",
    });
  }

  try {
    //   Verificar token
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    // se puede mandar un dato en el request y estara disponible para los demas middlewares o para el controlador req.uid = uid;

    // send user authentication
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: "token invalid  :user  = not exist | null",
      });
    }

    // verificar si esta activo o no
    if (!user.state) {
      return res.status(401).json({
        msg: "token invalid  :user.state = false",
      });
    }

    // enviar usuario a la peticion (req)
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Error",
    });
  }
};

module.exports = {
  validJWT,
};
