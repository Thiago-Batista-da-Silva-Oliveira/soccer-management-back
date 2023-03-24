import { Router } from "express";
import { accountsRoutes } from "../../../../modules/accounts/infra/routes/accountsRoutes";

export const routes = Router();

routes.use("/accounts", accountsRoutes);
