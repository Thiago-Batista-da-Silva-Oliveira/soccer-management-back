import { Router } from "express";
import { validateTeam } from "../../middlewares";
import {  CreateTeamController } from "../../useCases";

export const teamsRoutes = Router();

const createTeamController = new CreateTeamController();

teamsRoutes.post("/create", validateTeam, createTeamController.handle);
