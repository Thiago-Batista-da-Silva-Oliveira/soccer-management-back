import { inject, injectable } from "tsyringe";
import { TEAM_REPOSITORY_KEY, USER_REPOSITORY_KEY } from "../../../../config/constants";
import { IUserRepository } from "../../../accounts";
import { Team } from "../../infra";
import { ITeamRepository } from "../../repositories";

@injectable()
export class GetTeamsService {
  constructor(
    @inject(TEAM_REPOSITORY_KEY)
    private teamsRepository: ITeamRepository,
    @inject(USER_REPOSITORY_KEY)
    private usersRepository: IUserRepository
  ) {}

  async execute({ownerId}: {ownerId: string}): Promise<Team[]> {
    const user = await this.usersRepository.findById(ownerId);
    const iPlayIn = user.iPlayIn;
    const teamsThatIPlayIn = iPlayIn.map((team) => team.team);
    const teams = await this.teamsRepository.list({ownerId});

    const allTeams = [...teamsThatIPlayIn, ...teams];

    return allTeams;
  }
}