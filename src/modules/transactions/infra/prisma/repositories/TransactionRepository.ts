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
}
