import { Response } from "express";
import { container } from "tsyringe";
import { DeleteTeamService } from "./DeleteTeamService";

export class DeleteTeamController {
    async handle(request: any, response: Response): Promise<Response> {
        const deleteTeamService = container.resolve(DeleteTeamService);
        const { id } = request.params;
        const { user_id: ownerId } = request;

        await deleteTeamService.execute({ id, ownerId });

        return response.status(204).send();
    }
}