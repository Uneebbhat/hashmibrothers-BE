import ProductSchema from "../schemas/ProductSchema.schema";
import authorization from "../middlewares/authorization.middleware";
import authentication from "../middlewares/authentication.middleware";

import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.controller";
import { validateBody } from "../helpers/validateBody";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router
  .post(
    "/v1/add-product",
    // authentication,
    // authorization(["admin"]),
    upload.single("productImage"),
    validateBody(ProductSchema),
    addProduct
  )
  .get(
    "/v1/get-all-products",
    // authentication,
    // authorization(["admin"]),
    getAllProducts
  )
  .put(
    "/v1/update-product",
    // authentication,
    // authorization(["admin"]),
    updateProduct
  )
  .delete(
    "/v1/delete-product",
    // authentication,
    // authorization(["admin"]),
    deleteProduct
  );

export default router;
