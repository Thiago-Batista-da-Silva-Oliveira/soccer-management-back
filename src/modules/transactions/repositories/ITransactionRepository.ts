import { ICreateTransactionDTO } from "../dtos";
import { Transaction } from "../infra/prisma/entities";

export interface ITransactionRepository {
    create(data: ICreateTransactionDTO): Promise<Transaction>;
}