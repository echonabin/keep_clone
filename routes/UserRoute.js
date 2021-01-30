const router = require("express").Router();
const UserControllers = require("../controllers/UserControllers");
const auth = require("../middleware/auth");
const {
  validateUser,
  loginValidation,
} = require("../middleware/validators/user-validator");

router.post("/", validateUser, UserControllers.post_user);
// @route /api/user/login
// type ==> Post
router.post("/login", loginValidation, UserControllers.login_user);
// @route /api/user/get
// type get
// desc: gets the user profile if logged in
router.get("/", auth, UserControllers.get_user);
module.exports = router;
