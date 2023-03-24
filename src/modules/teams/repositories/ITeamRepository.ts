import { ICreateTeamDTO } from "../dtos";
import { Team } from "../infra";

export interface ITeamRepository {
  create(team: ICreateTeamDTO): Promise<Team>;
  checkIfAlreadyExists(name: string, ownerId: string): Promise<boolean>;
}
