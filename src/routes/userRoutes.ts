import express from "express";

import userController from "./../controllers/userControllers";
import {
  signup,
  login,
  protect,
  getMe,
} from "./../controllers/authControllers";

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/profile/me").get(protect, getMe);

router.route("/editUser/main/:userId").post(userController.editUserMain);

export default router;
