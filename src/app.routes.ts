import { Router } from "express";
export const appRoutes = Router()
import { AppController } from "./app.controller";
const appController = new AppController();
appRoutes.get("/realTimeProducts", appController.realTimeProducts)