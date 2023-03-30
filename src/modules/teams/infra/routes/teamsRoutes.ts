import { Router } from "express";
import { validateTeam } from "../../middlewares";
import {  CreateTeamController, DeleteTeamController, UpdateTeamController } from "../../useCases";
import { GetTeamsController } from "../../useCases/GetTeams";

export const teamsRoutes = Router();

const createTeamController = new CreateTeamController();
const getTeamsController = new GetTeamsController();
const deleteTeamController = new DeleteTeamController()
const updateTeamController = new UpdateTeamController()

teamsRoutes.post("/create", validateTeam, createTeamController.handle);

teamsRoutes.patch("/update/:id", updateTeamController.handle);

teamsRoutes.get("/list", getTeamsController.handle);

teamsRoutes.delete("/delete/:id", deleteTeamController.handle);
