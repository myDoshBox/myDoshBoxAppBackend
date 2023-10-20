import { Router } from "express";
import * as usersController from "../controllers/userControllers.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";

const router = Router();

router.use(verifyJWT);

// router.route("/").get(controller.getAllUsers)
// router.route("/:user_id").get(controller.getUser);
// router.route("updateuser").put(controller.updateUser);
// router.route("deleteuser").delete(controller.deleteUser);

router.route("/").get(usersController.getAllUsers);

// router
// 	.route("/:user_id")
// 	.get(usersController.getUser)
// 	.patch(usersController.updateUser)
// 	.delete(usersController.deleteUser);

router
  .route("/user")
  .get(usersController.getUser)
  .put(usersController.updateUser);

router
  .route("/deluser")
  .get(usersController.getUser)
  .delete(usersController.updateUser);

// check this out later
// router
//   .route("/user")
//   .get(usersController.getUser)
//   .put(usersController.getUser)
//   .delete(usersController.updateUser);

export default router;
