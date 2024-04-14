import { Router } from "express";
/** IMPORT: MIDDLEWARE */
import {
  verifyToken,
  authorizedPermissions,
} from "../middleware/authMiddleware.js";
/** IMPORT: CONTROLLER */
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";

const router = Router();

router.get("/", verifyToken, authorizedPermissions("admin"), getAllUsers);
router.get("/showMe", verifyToken, showCurrentUser);
router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", verifyToken, updateUserPassword);
router.get("/:id", verifyToken, getSingleUser);

export default router;
