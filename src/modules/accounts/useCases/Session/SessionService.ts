import { container, inject, injectable } from 'tsyringe';
import { CACHE_PROVIDER, HASH_PROVIDER, USER_REPOSITORY_KEY } from '../../../../config/constants';
import { ICacheProvider } from '../../../../shared/containers/providers/CacheProvider/models/ICacheProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { GenerateRefreshToken } from '../../providers/GenerateRefreshTokenProvider';
import { GenerateTokenProvider } from '../../providers/GenerateTokenProvider';
import { IHashProvider } from '../../providers/HashProvider/models';
import { IUserRepository } from '../../repositories';

export interface ISessionResponse {
  user: {
    id?: string;
    name: string;
    email: string;
    token: string;
    refreshToken: string;
  };
}

interface ISession {
  email: string;
  password: string;
}

@injectable()
export class SessionService {
  constructor(
    @inject(USER_REPOSITORY_KEY)
    private userRepository: IUserRepository,
    @inject(HASH_PROVIDER)
    private hashProvider: IHashProvider,
    @inject(CACHE_PROVIDER)
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ email, password }: ISession): Promise<ISessionResponse> {
    const user = await this.userRepository.findBy({ email });

    if (!user) {
      throw new AppError(
        'Email ou senha inválido! Verifique suas credências',
        400,
      );
    }

    const validatePassword = await this.hashProvider.compareHash(
      password,
      user?.loginMode?.password || '',
    );

    if (!user || !validatePassword) {
      throw new AppError(
        'Email ou senha inválido! Verifique suas credências',
        400,
      );
    }

    const generateTokenProvider = container.resolve(GenerateTokenProvider);
    const generateRefreshToken = container.resolve(GenerateRefreshToken)
    const token = await generateTokenProvider.execute(user);
    const refreshToken = await generateRefreshToken.execute(user.id);

    this.cacheProvider.setCache(`user-${user.id}`, user, 6 * 60 * 60);

    const userData = {
      ...user,
      token,
      refreshToken: refreshToken.id
    }

    return { user:userData };
  }
}
