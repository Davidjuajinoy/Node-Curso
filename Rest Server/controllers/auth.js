const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateJWT } = require("../helpers/generateJwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res, next) => {
  // necesario npm install google-auth-library --save
  const { id_token } = req.body;

  try {
    const { email, img, name } = await googleVerify(id_token);

    // verificar si existe
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ":P",
        img,
        google: true,
      };
      user = new User(data);
      await user.save();
    }

    // Si el usuario en DB esta inactivo
    if (!user.state) {
      return res.status(401).json({
        msg: "Contact with us , -user.state :false",
      });
    }

    // generar JWT
    const token = await generateJWT(user.id);

    res.json({
      msg: "google signIn",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      msg: "google token invalid",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
