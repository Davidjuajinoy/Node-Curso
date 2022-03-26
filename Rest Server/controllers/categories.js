const bcrypt = require("bcrypt");
const { response } = require("express");

const { Category } = require("../models");

const categoryGet = async (req, res) => {
  const { limit = "5", since = 0 } = req.query;
  const queryMongo = { state: true };
  /*  */
  const [countCategory, category] = await Promise.all([
    Category.countDocuments(queryMongo),
    Category.find(queryMongo)
      .skip(Number(since))
      .limit(Number(limit))
      .populate("user", "name"),
  ]);
  res.json({
    countCategory,
    category: category,
  });
};

const categoryGetById = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  if (!category.state) {
    return res.json({
      msg: `category ${id} id not exist : Status false`,
    });
  }
  res.json({
    category,
  });
};

const categoryPost = async (req, res) => {
  const name = req.body.name.toUpperCase();

  //   // Verificar si ya existe la categoria
  //   const category = await Category.findOne({ name });
  //   if (category) {
  //     return res.status(400).json({
  //       msg: `The category ${category.name} already exist`,
  //     });
  //   }

  //   generar data a guardar
  /* El usuario se guarda correctamente porque en el modelo esta la relacion de categoria con el usuario q la creo */
  const data = {
    name,
    user: req.user._id,
  };

  const categoryNew = new Category(data);
  await categoryNew.save();
  res.status(201).json({
    categoryNew,
  });
};

const categoryPut = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = req.user;

  const category = await Category.findByIdAndUpdate(id, {
    name: name.toUpperCase(),
    user: user._id,
  }, {new: true});
  res.json({
    msg: `category update ${id}`,
    category,
  });
};
const categoryDelete = async (req, res) => {
  const { id } = req.params;

  // eliminar el objeto completo
  // const user = await User.findByIdAndDelete(id);
  // desactivar usuario
  const category = await Category.findByIdAndUpdate(id, { state: false },{new:true});

  const userAuthentication = req.user;
  res.json({
    category,
    userAuthentication,
  });
};

module.exports = {
  categoryGet,
  categoryPost,
  categoryPut,
  categoryGetById,
  categoryDelete,
};
