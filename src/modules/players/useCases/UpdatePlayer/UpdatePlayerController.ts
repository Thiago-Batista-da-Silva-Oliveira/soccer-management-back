import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePlayerService } from "./UpdatePlayerService";

export class UpdatePlayerController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params
        const {name, position} = request.body
        const updatePlayerService = container.resolve(UpdatePlayerService);
        const data = updatePlayerService.execute({id, name, position});
        return response.status(200).json({message: 'success', payload: data})
    }
}