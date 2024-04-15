import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {
  authorizedPermissions,
  verifyToken,
} from "../middleware/authMiddleware.js";

const router = Router();

const middlewares = [verifyToken, authorizedPermissions("admin")];

router.route("/").post(middlewares, createProduct).get(getAllProducts);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(middlewares, updateProduct)
  .delete(middlewares, deleteProduct);

export default router;
