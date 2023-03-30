import { Router } from "express";
import { validatePlayer, validatePlayerUpdate } from "../../middlewares";
import { AddPlayerController, UpdatePlayerController } from "../../useCases";

export const playersRoutes = Router();

const addPlayerController = new AddPlayerController();
const updatePlayerController = new UpdatePlayerController();

playersRoutes.post("/create", validatePlayer, addPlayerController.handle);
playersRoutes.patch(
  "/update/:id",
  validatePlayerUpdate,
  updatePlayerController.handle
);
