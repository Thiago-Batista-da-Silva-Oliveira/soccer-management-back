import { Router } from "express";
import { accountsRoutes } from "../../../../modules/accounts/infra/routes/accountsRoutes";
import { playersRoutes } from "../../../../modules/players/infra/routes/playersRoutes";
import { teamsRoutes } from "../../../../modules/teams";
import { transactionsRoutes } from "../../../../modules/transactions/infra";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const routes = Router();

routes.use("/accounts", accountsRoutes);

routes.use("/players", ensureAuthenticated, playersRoutes);

routes.use("/teams", ensureAuthenticated, teamsRoutes);

routes.use('/transactions', ensureAuthenticated, transactionsRoutes);