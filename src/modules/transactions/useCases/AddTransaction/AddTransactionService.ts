import { injectable, inject } from "tsyringe";
import {
  TRANSACTION_REPOSITORY_KEY,
} from "../../../../config/constants";
import { Transaction } from "../../infra";
import { ITransactionRepository } from "../../repositories";

interface IAddTransactionService {
  amount: number;
  description: string;
  teamId: string;
  type: string;
  playerId?: string;
}

@injectable()
export class AddTransactionService {
  constructor(
    @inject(TRANSACTION_REPOSITORY_KEY)
    private tranasctionRepository: ITransactionRepository
  ) {}
  async execute({
    amount,
    description,
    teamId,
    type,
    playerId,
  }: IAddTransactionService): Promise<Transaction> {
    const transaction = Transaction.create({
      amount,
      description,
      teamId,
      type,
      playerId,
    });

    return await this.tranasctionRepository.create(transaction);
  }
}
