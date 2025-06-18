import { Router } from "express";
import { userController } from "./user.controller";
const router = Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
