import { Router } from "express";
import { validateTeam } from "../../middlewares";
import {  CreateTeamController, DeleteTeamController } from "../../useCases";
import { GetTeamsController } from "../../useCases/GetTeams";

export const teamsRoutes = Router();

const createTeamController = new CreateTeamController();
const getTeamsController = new GetTeamsController();
const deleteTeamController = new DeleteTeamController()

teamsRoutes.post("/create", validateTeam, createTeamController.handle);

teamsRoutes.get("/list", getTeamsController.handle);

teamsRoutes.get("/delete/:id", deleteTeamController.handle);