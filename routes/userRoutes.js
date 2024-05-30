const express = require("express");

const userController = require("./../controllers/userControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  // .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/profile/me").get(authController.protect, authController.getMe);

router.route("/editUser/main/:userId").post(userController.editUserMain);

module.exports = router;
