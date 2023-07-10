import { Request, Response } from "express";
import { ProductService } from "./products/product.service";
import { Server } from "socket.io";
import { httpServer as server } from "./app";
import { ICart, Product } from "./entities/products";
export class AppController {
    constructor(
        public productsService = new ProductService(),
        public getAllProducts = async (req: Request, res: Response) => {
            try {
                const response = await this.productsService.getData()
                let content: Product[] = [];
                if (response.data !== null) {
                    content = response.data as Product[];
                }
                res.render("index", { content })

            } catch (error) { console.log(error) }

        },
        public realTimeProducts = async (req: Request, res: Response) => {
            const ioServer = new Server(server)
            ioServer.on("connection", async () => {
                console.log("Real Time Sockets Connected")
                const response = await this.productsService.getData()
                ioServer.emit("data", response)
            })
            res.render("realtime")

        }

    ) { }
}