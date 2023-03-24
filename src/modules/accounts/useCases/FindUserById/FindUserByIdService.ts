import { inject, injectable } from 'tsyringe';
import { CACHE_PROVIDER, USER_REPOSITORY_KEY } from '../../../../config/constants';
import { ICacheProvider } from '../../../../shared/containers/providers/CacheProvider/models/ICacheProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { User } from '../../infra/prisma';
import { IUserRepository } from '../../repositories';

@injectable()
export class FindUserByIdService {
  constructor(
    @inject(USER_REPOSITORY_KEY)
    private userRepository: IUserRepository,
    @inject(CACHE_PROVIDER)
    private cacheProvider: ICacheProvider,
  ) {}

  async execute(id: string): Promise<User> {
    const cacheKey = `user-${id}`;
    const cachedUser = await this.cacheProvider.getCache(cacheKey);
    if (cachedUser) {
      delete cachedUser.password;
      return cachedUser;
    }

    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new AppError('Usuário não encontrado!!.', 404);
    }
    this.cacheProvider.setCache(cacheKey, userExists, 2 * 60 * 60);
    return userExists;
  }
}
