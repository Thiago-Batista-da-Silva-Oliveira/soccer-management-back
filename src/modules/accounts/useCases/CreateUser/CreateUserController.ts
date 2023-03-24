import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "./CreateUserService";


export class CreateUserController {
    async handle(req:Request, res:Response): Promise<Response> {

        const {email, password, name} = req.body;
        const createUserService = container.resolve(CreateUserService)
        const data = await createUserService.execute({email, password, name})
        return res.status(201).json({message: 'success', payload: data})
    };
}