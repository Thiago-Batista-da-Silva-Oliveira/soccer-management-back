import { inject, injectable } from "tsyringe";
import {
  TEAM_REPOSITORY_KEY,
  TRANSACTION_REPOSITORY_KEY,
} from "../../../../config/constants";
import { AppError } from "../../../../shared/errors/AppError";
import { ITeamRepository } from "../../../teams";
import { Transaction } from "../../infra";
import { format } from 'date-fns';
import { ITransactionRepository } from "../../repositories";

interface IRequest {
  teamId: string;
  startDate?: string;
  endDate?: string;
}

interface ITransactions  extends Transaction{
   name: string;
   date: string;
}

interface IOutput {
  transactions: ITransactions[];
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

    const startDateFiltered = startDate
    ? format(new Date(startDate), 'MM/dd/yyyy')
    : null;
  const finalDateFiltered = endDate
    ? format(new Date(endDate), 'MM/dd/yyyy 23:59:59')
    : null;
    const transactions = await this.transactionRepository.list({
      teamId,
      startDate: new Date(startDateFiltered),
      endDate: new Date(finalDateFiltered),
    });

    const filteredTransaction = transactions.map((data) => {
      return {
        ...data,
        date: format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm:ss'),
        name: data?.player?.name || "Time",
        type: data.type === "contribution" ? "Contribuição" : "Despesa",
      }
    })

    const totalIncome = transactions.reduce((acc, transaction) => {
      if (transaction.type === "contribution") {
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
      transactions: filteredTransaction,
      totalIncome,
      totalExpense,
      total,
    };
  }
}
