import { ICreateRefreshTokenDTO } from '../dtos/ICreateRefreshTokenDTO';
import { RefreshToken } from '../infra/prisma/entities/RefreshToken';

export interface IRefreshTokenRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  deleteMany(userId: string): Promise<RefreshToken>;
  findFirst(id: string): Promise<RefreshToken>;
}
