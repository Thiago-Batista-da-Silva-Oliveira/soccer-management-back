import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddTransactionService } from "./AddTransactionService";

export class AddTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const addTransactionService = container.resolve(AddTransactionService);
    const { amount, description, teamId, type, playerId } = request.body;

    const transaction = await addTransactionService.execute({
      amount,
      description,
      teamId,
      type,
      playerId,
    });

    return response
      .status(201)
      .json({ message: "success", payload: transaction });
  }
}
