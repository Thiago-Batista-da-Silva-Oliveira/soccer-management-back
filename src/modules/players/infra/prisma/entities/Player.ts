import uniqid from "uniqid";
import { User } from "../../../../accounts";
import { Team } from "../../../../teams";

export class Player {
  id?: string;
  name: string;
  position: string;
  team?: Team;
  teamId: string;
  accountId?: string;
  user?: User;
  createdAt?: Date;

  private constructor(playerInfo: Player) {
    if (!this.id) {
      this.id = uniqid();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    Object.assign(this, { ...playerInfo });
  }

  static create(data: Player) {
    return new Player(data);
  }
}
