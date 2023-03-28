import { Router } from "express";
import { validateTransaction } from "../../middlewares";
import { AddTransactionController } from "../../useCases";
import { GetTransactionsController } from "../../useCases/GetTransactions";

export const transactionsRoutes = Router();

const addTransactionController = new AddTransactionController();
const getTransactionsController = new GetTransactionsController();

transactionsRoutes.post(
  "/make-transaction",
  validateTransaction,
  addTransactionController.handle
);
transactionsRoutes.get(
  "/transactions",
  getTransactionsController.handle
);

