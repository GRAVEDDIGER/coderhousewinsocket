import { cartRouter } from "./carts/cart.routes";
import { productRoute } from "./products/products.routes";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import path = require("path");
import express, { Request, Response } from "express"
import { AppController } from "./app.controller";
import { appRoutes } from "./app.routes";
import http from "http";

const app = express();
export const httpServer = http.createServer(app)
const appController = new AppController()
app.use(express.static('src/public'))
app.engine("handlebars", engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(appRoutes)
app.use("/api/", productRoute)
app.use("/api/carts", cartRouter)
app.use(appController.getAllProducts)
httpServer.listen(PORT, () => console.log(`Connected to port ${PORT}`))
