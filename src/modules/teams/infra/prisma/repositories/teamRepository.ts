import { prisma } from '../../../../../config/prismaClient';
import { ICreateTeamDTO } from '../../../dtos';
import { ITeamRepository } from '../../../repositories';
import { Team } from '../entities';

export class TeamRepository implements ITeamRepository {
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

  async list({ ownerId }: { ownerId: string }): Promise<Team[]> {
    const teams = await this.repository.findMany({
      where: {
        ownerId,
      },
      include: {players: true}
    });

    return teams;
  }

  async findById(id: string): Promise<Team | undefined> {
    const team = await this.repository.findFirst({
      where: {
        id,
      },
    });

    return team;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id,
      },
    });
  }

  async update(team: Partial<Team>): Promise<Team> {
    return this.repository.update({
      where: {
        id: team.id,
      },
      data: {
        name: team.name,
      },
    });
  }
}
