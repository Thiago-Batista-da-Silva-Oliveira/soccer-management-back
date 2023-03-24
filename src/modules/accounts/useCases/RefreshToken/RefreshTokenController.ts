import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenService } from './RefreshTokenService';

class RefreshTokenUserController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body;

    const refreshTokenService = container.resolve(
        RefreshTokenService,
    );

    const token = await refreshTokenService.execute(refresh_token);

    return response.json(token);
  }
}

export { RefreshTokenUserController };
