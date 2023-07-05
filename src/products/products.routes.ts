import { Router } from "express";
import { ProductController } from "./product.controller";
const productController = new ProductController()
export const productRoute = Router()
productRoute.get("/products", productController.getProducts)
productRoute.get("/products/:id", productController.getById)
productRoute.post("/product", productController.addProduct)
productRoute.put("/product", productController.updateById)
productRoute.delete("/product/:id", productController.deleteById)
