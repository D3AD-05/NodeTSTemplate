import { Router } from "express";
import { userController } from "./user.controller";
const router = Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .delete(userController.deleteUser);

router.route("/:id").put(userController.updateUser);

export default router;
