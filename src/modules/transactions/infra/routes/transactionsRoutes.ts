import { Router } from "express";
import { validateTransaction } from "../../middlewares";
import { AddTransactionController } from "../../useCases";

export const transactionsRoutes = Router();

const addTransactionController = new AddTransactionController();

transactionsRoutes.post(
  "/make-transaction",
  validateTransaction,
  addTransactionController.handle
);
