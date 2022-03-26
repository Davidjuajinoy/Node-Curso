const { Router } = require("express");
const { check } = require("express-validator");
const { Product, Category } = require("../models");
const { validAdminRole } = require("../middlewares");
const {
  productGet,
  productPost,
  productGetById,
  productPut,
  productDelete,
} = require("../controllers/products");
const { idExist, productExist } = require("../helpers/dbvalidators");
const { validJWT, validationFields } = require("../middlewares");

const router = Router();

router.get("/", productGet);

router.get(
  "/:id",
  [
    check("id", "Id mongo is invalid").isMongoId(),
    check("id").custom((id) => idExist(id, Product)),
    validationFields,
  ],
  productGetById
);

router.post(
  "/",
  [
    validJWT,
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(productExist),
    check("description", "description is required").not().isEmpty().isString(),
    check("category", "Id mongo is invalid").isMongoId(),
    check("category").custom((id) => idExist(id, Category)),
    validationFields,
  ],
  productPost
);

router.put(
  "/:id",
  [
    validJWT,
    check("id", "Id mongo is invalid").isMongoId(),
    check("id").custom((id) => idExist(id, Product)),
    validationFields,
  ],
  productPut
);

router.delete(
  "/:id",
  [
    validJWT,
    check("id", "Id mongo is invalid").isMongoId(),
    check("id").custom((id) => idExist(id, Product)),
    validAdminRole,
    validationFields,
  ],
  productDelete
);

module.exports = router;
