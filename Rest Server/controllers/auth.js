const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJwt");

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    // validar si existe el correo
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        msg: "email or password incorrect : email-incorrect",
      });
    }
    //  validar estado activo
    if (!user.state) {
      return res.status(400).json({
        msg: "email or password incorrect :status-false",
      });
    }
    // validar password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "email or password incorrect :password-false",
      });
    }

    // generar JWT
    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Contact with us",
    });
  }
};

module.exports = {
  login,
};
