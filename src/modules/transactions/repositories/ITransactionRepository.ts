import { ICreateTransactionDTO } from "../dtos";
import { Transaction } from "../infra/prisma/entities";

export interface ITransactionRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  list({
    teamId,
    startDate,
    endDate,
  }: {
    teamId: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Transaction[]>;
}
