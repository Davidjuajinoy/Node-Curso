const { Router } = require("express");
/* PACK MIDDLEWARE VALIDATOR  */
const { check } = require("express-validator");
// Errors Validators
const { validationFields } = require("../middlewares/validations");
/* DB VALIDATORS */
const { roleIsValid, emailExist, idExist } = require("../helpers/dbvalidators");
const { login, googleSignIn } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),

    validationFields,
  ],
  login
);


router.post(
  "/google",
  [
    check("id_token", "The token is required").not().isEmpty(),
    validationFields,
  ],
  googleSignIn
);

module.exports = router;
