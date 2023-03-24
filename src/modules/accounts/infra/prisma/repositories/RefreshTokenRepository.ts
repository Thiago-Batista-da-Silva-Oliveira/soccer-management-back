import { prisma } from '../../../../../config/prismaClient';
import { IRefreshTokenRepository } from '../../../repositories';
import { RefreshToken } from '../entities/RefreshToken';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository: typeof prisma.refreshToken;

  constructor() {
    this.repository = prisma.refreshToken;
  }

  async create(data: {
    id?: string;
    userId: string;
    expiresIn: number;
  }): Promise<RefreshToken> {
    return this.repository.create({ data });
  }

  async deleteMany(userId: string): Promise<any> {
    return this.repository.deleteMany({ where: { userId } });
  }

  async findFirst(id: string): Promise<RefreshToken> {
    return this.repository.findFirst({ where: { id } });
  }
}
