import { prisma } from '../../../../../config/prismaClient';
import { ICreatePlayerDTO } from '../../../dtos';
import { IPlayerRepository } from '../../../repositories';
import { Player } from '../entities';

export class PlayerRepository implements IPlayerRepository {
  private repository: typeof prisma.player;

  constructor() {
    this.repository = prisma.player;
  }

  async create(data: ICreatePlayerDTO): Promise<Player> {
     return await this.repository.create({
        data: {
            name: data.name,
            position: data.position,
            teamId: data.teamId,
            accountId: data.accountId,
            createdAt: data.createdAt
        }
     })
  }
}
