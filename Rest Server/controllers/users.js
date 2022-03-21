const usersGet = (req, res) => {
  /* Query params */
  const query = req.query;
  /* 
    REQUEST = http://localhost:8085/api/users?q=hola&d=david
    RESPONSE = {
        "msg": "method get usersController",
        "david": {
            "q": "hola",
            "d": "david" 
        }
    }
    si se quiere asignar por default algun valor se puede usar la desestructuracion.
    const {q,d = "sergio"} = req.query;
    */
  res.json({
    msg: "method get usersController",
    query,
  });
};
const usersPost = (req, res) => {
  const { nombre, apellido } = req.body;
  res.status(201).json({
    msg: "method post",
    nombre,
    apellido,
  });
};

const usersPut = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: "method put",
    id,
  });
};
const usersDelete = (req, res) => {
  res.json({
    msg: "method delete",
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
