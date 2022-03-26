const bcrypt = require("bcrypt");

const { User } = require("../models");

// const usersGet = (req, res) => {
//   /* Query params */
//   const query = req.query;
//   /*
//     REQUEST = http://localhost:8085/api/users?q=hola&d=david
//     RESPONSE = {
//         "msg": "method get usersController",
//         "david": {
//             "q": "hola",
//             "d": "david"
//         }
//     }
//     si se quiere asignar por default algun valor se puede usar la desestructuracion.
//     const {q,d = "sergio"} = req.query;
//     */
//   res.json({
//     msg: "method get usersController",
//     query,
//   });
// };
const usersGet = async (req, res) => {
  const { limit = "5", since = 0 } = req.query;
  // Verificar que el estado este en true
  const queryMongo = { state: true };

  // Coleccion de promesa  --> Promise.all()
  /*
   *Ejecuta ambas promesas de manera simultanea y si una da error , no funcionara la otra , ahorra tiempo de la request*/
  // const countUsers = await User.find(queryMongo)
  //   .skip(Number(desde))
  //   .limit(Number(limit));
  // const users = await User.countDocuments(queryMongo);

  const [countUsers, users] = await Promise.all([
    User.countDocuments(queryMongo),
    User.find(queryMongo).skip(Number(since)).limit(Number(limit)),
  ]);
  res.json({
    countUsers,
    users,
  });
};
const usersPost = async (req, res) => {
  const { name, password, email, role } = req.body;
  // Requerir modelo de mongoose
  const user = new User({ name, password, role, email });
  // Verificar si existe correo

  // Encryptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  // Guardar registro
  await user.save();
  res.status(201).json({
    user,
  });
};

const usersPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, ...user } = req.body;

  // Validar contraseña DB
  if (password) {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
  }

  const userModel = await User.findByIdAndUpdate(id, user);

  res.json({
    msg: `User update ${id}`,
    userModel,
  });
};
const usersDelete = async (req, res) => {
  const { id } = req.params;

  // eliminar el objeto completo
  // const user = await User.findByIdAndDelete(id);
  // desactivar usuario
  const user = await User.findByIdAndUpdate(id, { state: false });

  const userAuthentication = req.user;
  res.json({
    user,
    userAuthentication,
  });
};
const usersPatch = (req, res) => {
  res.json({
    msg: "method Patch",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
