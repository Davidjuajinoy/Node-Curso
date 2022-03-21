const { Router } = require("express");

const {
  usersDelete,
  usersGet,
  usersPatch,
  usersPut,
  usersPost,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet );
router.post("/", usersPost );
router.put("/:id", usersPut );
router.delete("/", usersDelete );
router.patch("/", usersPatch );


module.exports = router;
