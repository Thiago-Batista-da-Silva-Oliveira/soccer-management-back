import { inject, injectable } from "tsyringe";
import {
  TEAM_REPOSITORY_KEY,
  TRANSACTION_REPOSITORY_KEY,
} from "../../../../config/constants";
import { AppError } from "../../../../shared/errors/AppError";
import { ITeamRepository } from "../../../teams";
import { Transaction } from "../../infra";
import { ITransactionRepository } from "../../repositories";

interface IRequest {
  teamId: string;
  startDate?: string;
  endDate?: string;
}

interface IOutput {
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  total: number;
}

@injectable()
export class GetTransactionsService {
  constructor(
    @inject(TRANSACTION_REPOSITORY_KEY)
    private transactionRepository: ITransactionRepository,
    @inject(TEAM_REPOSITORY_KEY)
    private teamRepository: ITeamRepository
  ) {}
  async execute({
    teamId,
    startDate,
    endDate,
  }: IRequest): Promise<IOutput> {
    const checkIfTeamExists = await this.teamRepository.findById(teamId);
    if (!checkIfTeamExists) {
      throw new AppError("Time não encontrado", 404);
    }
    const transactions = await this.transactionRepository.list({
      teamId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    const totalIncome = transactions.reduce((acc, transaction) => {
      if (transaction.type === "income") {
        return acc + transaction.amount;
      }
      return acc;
    }, 0)
    const totalExpense = transactions.reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        return acc + transaction.amount;
      }
      return acc;
    },0)
    const total = totalIncome - totalExpense;
    return {
      transactions,
      totalIncome,
      totalExpense,
      total,
    };
  }
}
