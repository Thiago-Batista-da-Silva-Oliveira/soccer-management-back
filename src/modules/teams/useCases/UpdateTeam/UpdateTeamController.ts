import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTeamService } from "./UpdateTeamService";

export class UpdateTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;
    const updateTeamService = container.resolve(UpdateTeamService);

    const team = await updateTeamService.execute({ id, name });

    return response.status(200).json({ message: "success", payload: team });
  }
}
