import { cartRouter } from "./carts/cart.routes";
import { productRoute } from "./products/products.routes";
import express from "express"
const app = express();
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/", productRoute)
app.use("/api/carts", cartRouter)
app.listen(PORT, () => console.log(`Connected to port ${PORT}`))