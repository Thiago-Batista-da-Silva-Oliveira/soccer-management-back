import { inject, injectable } from "tsyringe";
import { TEAM_REPOSITORY_KEY } from "../../../../config/constants";
import { AppError } from "../../../../shared/errors/AppError";
import { Team } from "../../infra";
import { ITeamRepository } from "../../repositories";

@injectable()
export class UpdateTeamService {
  constructor(
    @inject(TEAM_REPOSITORY_KEY)
    private teamRepository: ITeamRepository
  ) {}
  async execute({ id, name }: { id: string; name: string }): Promise<Team> {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new AppError("Time não encontrado", 404);
    }

    return this.teamRepository.update({ id, name });
  }
}
