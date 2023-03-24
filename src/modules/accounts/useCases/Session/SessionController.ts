import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SessionService } from './SessionService';

export class SessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const userSessionService = container.resolve(SessionService);
    const user = await userSessionService.execute({ email, password });
    return res.status(200).json({ message: 'success', payload: user });
  }
}
