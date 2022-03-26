const { Router } = require("express");
const { check } = require("express-validator");
const { Category } = require("../models");
const { validAdminRole } = require("../middlewares");
const {
  categoryGet,
  categoryPost,
  categoryGetById,
  categoryPut,
  categoryDelete,
} = require("../controllers/categories");
const { categoryExist, idExist } = require("../helpers/dbvalidators");
const { validJWT, validationFields } = require("../middlewares");

const router = Router();

router.get("/", categoryGet);

router.get(
  "/:id",
  [
    check("id", "Id mongo is invalid").isMongoId(),
    check("id").custom((id) => idExist(id, Category)),
    validationFields,
  ],
  categoryGetById
);

router.post(
  "/",
  [
    validJWT,
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(categoryExist),
    validationFields,
  ],
  categoryPost
);

router.put(
  "/:id",
  [
    validJWT,
    check("id", "Id mongo is invalid").isMongoId(),
    check("id").custom((id) => idExist(id, Category)),
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(categoryExist),
    validationFields,
  ],
  categoryPut
);

router.delete(
  "/:id",
  [
    validJWT,
    check("id", "Id mongo is invalid").isMongoId(),
    check("id").custom((id) => idExist(id, Category)),
    validAdminRole,
    validationFields,
  ],
  categoryDelete
);

module.exports = router;
