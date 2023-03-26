import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddPlayerService } from "./AddPlayerService";

export class AddPlayerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const addPlayerService = container.resolve(AddPlayerService);
    const { name, position, teamId, accountId } = request.body;

    const player = await addPlayerService.execute({
      name,
      position,
      teamId,
      accountId,
    });

    return response.status(201).json({ message: "success", payload: player });
  }
}
