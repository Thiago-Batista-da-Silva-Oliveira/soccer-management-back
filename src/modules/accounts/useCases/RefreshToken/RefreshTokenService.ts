import dayjs from 'dayjs';
import { container, inject, injectable } from 'tsyringe';
import { REFRESHTOKEN_REPOSITORY_KEY } from '../../../../config/constants';
import { AppError } from '../../../../shared/errors/AppError';
import { GenerateRefreshToken } from '../../providers/GenerateRefreshTokenProvider';
import { GenerateTokenProvider } from '../../providers/GenerateTokenProvider';
import { IRefreshTokenRepository } from '../../repositories';
import { FindUserByIdService } from '../FindUserById';



@injectable()
class RefreshTokenService {
  constructor(
    @inject(REFRESHTOKEN_REPOSITORY_KEY)
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}
  async execute(refresh_token: string) {
    const refreshToken = await this.refreshTokenRepository.findFirst(
      refresh_token,
    );

    if (!refreshToken) {
      throw new AppError('Refresh token invalid', 400);
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn),
    );

    const findUserById = container.resolve(FindUserByIdService);

    const user = await findUserById.execute(refreshToken.userId);

    const generateTokenProvider = container.resolve(GenerateTokenProvider);
    const token = await generateTokenProvider.execute(user);

    if (refreshTokenExpired) {
      await this.refreshTokenRepository.deleteMany(refreshToken.userId);

      const generatedRefreshTokenProvider =
        container.resolve(GenerateRefreshToken);

      const newRefreshToken = await generatedRefreshTokenProvider.execute(
        refreshToken.userId,
      );

      const userData = {
        ...user,
        refreshToken: newRefreshToken.id,
        token,
      }

      return {user: userData}
    }
    const userData = {
      ...user,
      token,
    }
    return { user: userData };
  }
}

export { RefreshTokenService };
