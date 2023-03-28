import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTeamsService } from "./GetTeamsService";

export class GetTeamsController {
    async handle(request: any, response: Response): Promise<Response> {
        const getTeamsService = container.resolve(GetTeamsService)
        const { user_id: ownerId } = request;
        const teams = await getTeamsService.execute({ ownerId });

        return response.status(200).json({message: 'success', payload: teams});
    }
}