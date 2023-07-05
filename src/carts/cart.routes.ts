import { Router } from "express";
import { CartController } from "./cart.controller";
export const cartRouter = Router()
const cartController = new CartController()
cartRouter.post("/", cartController.createCart)
cartRouter.post("/:cid/product/:pid", cartController.addProduct)
cartRouter.get("/:cid", cartController.getCartProduct)