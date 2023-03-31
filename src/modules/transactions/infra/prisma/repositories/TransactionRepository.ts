import { prisma } from "../../../../../config/prismaClient";
import { ICreateTransactionDTO } from "../../../dtos";
import { ITransactionRepository } from "../../../repositories";
import { Transaction } from "../entities";

export class TransactionRepository implements ITransactionRepository {
  private repository: typeof prisma.transaction;

  constructor() {
    this.repository = prisma.transaction;
  }

  async create(data: ICreateTransactionDTO): Promise<Transaction> {
    return await this.repository.create({
      data: {
        amount: data.amount,
        description: data.description,
        teamId: data.teamId,
        type: data.type,
        playerId: data.playerId,
        createdAt: data.createdAt,
      },
    });
  }

  async list({
    teamId,
    startDate,
    endDate,
  }: {
    teamId: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Transaction[]> {
    if (startDate && endDate) {
      return await this.repository.findMany({
        where: {
          teamId,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {player: true},
        orderBy: {
          createdAt: "desc",
        }
      });
    } else {
      return await this.repository.findMany({
        where: {
          teamId,
        },
        include: {player: true},
        orderBy: {
          createdAt: "desc",
        }
      });
    }
  }
}
