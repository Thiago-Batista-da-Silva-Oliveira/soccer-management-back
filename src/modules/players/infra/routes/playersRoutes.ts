import { Router } from "express";
import { validatePlayer } from "../../middlewares";
import { AddPlayerController } from "../../useCases";

export const playersRoutes = Router();

const addPlayerController = new AddPlayerController();

playersRoutes.post("/create", validatePlayer, addPlayerController.handle);
