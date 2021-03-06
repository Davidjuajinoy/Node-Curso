const { Router } = require("express");
/* PACK MIDDLEWARE VALIDATOR  */
const { check } = require("express-validator");

const {
  validationFields,
  validJWT,
  validAdminRole,
  hasRole,
} = require("../middlewares");
/* DB VALIDATORS */
const { roleIsValid, emailExist, idExist } = require("../helpers/dbvalidators");
const {
  usersDelete,
  usersGet,
  usersPatch,
  usersPut,
  usersPost,
} = require("../controllers/users");
const { User } = require("../models");

const router = Router();

router.get("/", usersGet);
/* add middleware  */
router.post(
  "/",
  [
    // es un middlewarcheck(nombre del campo en el body de la peticion)
    check("name", "Name is required").not().isEmpty(),
    check("password", "The password must be at least 5 chars long").isLength({
      min: 6,
    }),
    // check("role", "The role is invalid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("email", "The Email is invalid").isEmail(),
    check("email").custom(emailExist),
    //? Es lo mismo que abajo check("role").custom((role)=> roleIsValid(role)),
    check("role").custom(roleIsValid),
    // se encarga de mostrar cualquier error de arriba
    validationFields,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    // el id es el parametro :id no el campo
    check("id", "Id mongo is invalid").isMongoId(),
    check("id").custom((id)=> idExist(id,User)),
    check("role").custom(roleIsValid),
    validationFields,
  ],
  usersPut
);
router.delete(
  "/:id",
  [
    validJWT,
    // validAdminRole,
    hasRole("ADMIN_ROLE"),
    check("id", "Id mongo is invalid").isMongoId(),
    check("id").custom((id)=> idExist(id,User)),
    validationFields,
  ],
  usersDelete
);
router.patch("/", usersPatch);

module.exports = router;
