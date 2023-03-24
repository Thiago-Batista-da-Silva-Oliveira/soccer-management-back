import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';
import { REFRESHTOKEN_REPOSITORY_KEY } from '../../../config/constants';
import { IRefreshTokenRepository } from '../repositories';


@injectable()
class GenerateRefreshToken {
  constructor(
    @inject(REFRESHTOKEN_REPOSITORY_KEY)
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}
  async execute(userId: string) {
    const expiresIn = dayjs().add(2, 'days').unix();
    const generateRefreshToken = await this.refreshTokenRepository.create({
      userId,
      expiresIn,
    });
    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };
