import { prisma } from '../../../../../config/prismaClient';
import { ICreatePlayerDTO, IUpdatePlayerDTO } from '../../../dtos';
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

  async delete(id: string): Promise<void> {
    await this.repository.delete({
        where: {
            id
        }
    })
  }

  async findById(id: string): Promise<Player> {
    return await this.repository.findUnique({
        where: {
            id
        }
    })
  }

  async update(id: string, data: IUpdatePlayerDTO): Promise<Player> {
    return await this.repository.update({
        where: {
            id,
        },
        data,
    })
  }
}
