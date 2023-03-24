import { inject, injectable } from "tsyringe";
import { TEAM_REPOSITORY_KEY } from "../../../../config/constants";
import { AppError } from "../../../../shared/errors/AppError";
import { Team } from "../../infra";
import { ITeamRepository } from "../../repositories";

interface ICreateTeamService {
    name: string;
    imgUrl?: string;
    ownerId: string;
}

@injectable()
export class CreateTeamService {
    constructor(
        @inject(TEAM_REPOSITORY_KEY)
        private teamRepository: ITeamRepository,
    ){}
    async execute({name, imgUrl, ownerId}: ICreateTeamService): Promise<Team> {
        const findExistingTeam = await this.teamRepository.checkIfAlreadyExists(name, ownerId)
        if(findExistingTeam) {
            throw new AppError("Time já cadastrado");
        }
      const team = Team.create({
        name,
        imgUrl,
        ownerId
      })

      return await this.teamRepository.create(team)
    }
}