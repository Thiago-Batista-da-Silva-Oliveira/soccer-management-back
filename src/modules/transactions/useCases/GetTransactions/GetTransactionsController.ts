import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTransactionsService } from "./GetTransactionsService";

export class GetTransactionsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { teamId, startDate, endDate } = request.query;

        const getTransactionsService = container.resolve(GetTransactionsService);

        const transactions = await getTransactionsService.execute({
            teamId: teamId as string,
            startDate: startDate as string,
            endDate: endDate as string,
        });

        return response.status(200).json({message: 'success', payload: transactions});
    }
}