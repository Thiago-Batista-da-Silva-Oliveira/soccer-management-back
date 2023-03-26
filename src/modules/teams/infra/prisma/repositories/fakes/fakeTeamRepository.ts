import { ITeamRepository } from "../../../../repositories";
import { Team } from "../../entities";


export class FakeTeamRepository implements ITeamRepository {
  private teams: Team[] = [];

  async create(team: Team): Promise<Team> {
    this.teams.push(team);

    return team;
  }

  async checkIfAlreadyExists(name: string, ownerId: string): Promise<boolean> {
    const existingTeam = this.teams.find(
      (team) => team.name === name && team.ownerId === ownerId
    );

    return !!existingTeam;
  }

  async list({ ownerId }: { ownerId: string }) {
    return this.teams.filter((team) => team.ownerId === ownerId);
  }
}