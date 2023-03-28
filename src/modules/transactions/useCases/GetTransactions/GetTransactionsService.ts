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
  }: IRequest): Promise<Transaction[]> {
    const checkIfTeamExists = await this.teamRepository.findById(teamId);
    if (!checkIfTeamExists) {
      throw new AppError("Time não encontrado", 404);
    }
    const transactions = await this.transactionRepository.list({
      teamId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    return transactions;
  }
}
