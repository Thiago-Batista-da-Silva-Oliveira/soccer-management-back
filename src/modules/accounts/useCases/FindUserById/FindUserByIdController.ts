import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserByIdService } from './FindUserByIdService';

export class FindUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findUserByIdService = container.resolve(FindUserByIdService);
    const { id } = request.params;
    const user = await findUserByIdService.execute(id);

    return response.status(200).json({ status: 'success', payload: user });
  }
}
