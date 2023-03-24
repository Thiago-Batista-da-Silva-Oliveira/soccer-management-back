import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTeamService } from "./CreateTeamService";


export class CreateTeamController {
    async handle(req:Request, res:Response): Promise<Response> {
        const {ownerId, imgUrl, name} = req.body;
        const createTeamService = container.resolve(CreateTeamService)
        const data = await createTeamService.execute({name, ownerId, imgUrl})
        return res.status(201).json({message: 'success', payload: data})
    };
}