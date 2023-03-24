import { prisma } from '../../../../../config/prismaClient';
import { ICreateTeamDTO } from '../../../dtos';
import { ITeamRepository } from '../../../repositories';
import { Team } from '../entities';

export class UserRepository implements ITeamRepository {
  private repository: typeof prisma.team;

  constructor() {
    this.repository = prisma.team;
  }

  async create(team: ICreateTeamDTO): Promise<Team> {
    return this.repository.create({
      data: {
        name: team.name,
        ownerId: team.ownerId,
        id : team.id,
        createdAt: team.createdAt,
      },
    });
  }

  async checkIfAlreadyExists(name: string, ownerId: string): Promise<boolean> {
    const team = await this.repository.findFirst({
      where: {
        name,
        ownerId,
      },
    });

    return !!team;
  }
}
