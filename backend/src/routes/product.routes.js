import { Router } from "express";
import * as productControllers from "../controllers/product.controllers";
import {
  createProductValidator,
  oneProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../validators/productValHandler";

const router = Router();

router.get("/products", productControllers.all_products);

router.post(
  "/products",
  createProductValidator,
  productControllers.create_product
);

router.get(
  "/products/:product_id",
  oneProductValidator,
  productControllers.one_product
);

router.put(
  "/products/:product_id",
  updateProductValidator,
  productControllers.update_product
);

router.delete(
  "/products/:product_id",
  deleteProductValidator,
  productControllers.delete_product
);

export default router;
