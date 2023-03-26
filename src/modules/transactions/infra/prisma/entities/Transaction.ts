import uniqid from "uniqid";
import { User } from "../../../../accounts";
import { Player } from "../../../../players/infra";
import { Team } from "../../../../teams";

export class Transaction {
  id?: string;
  type: string;
  description: string;
  amount: number;
  team?: Team;
  teamId: string;
  playerId?: string;
  player?: Player;
  createdAt?: Date;

  private constructor(transactionInfo: Transaction) {
    if (!this.id) {
      this.id = uniqid();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    Object.assign(this, { ...transactionInfo });
  }

  static create(data: Transaction) {
    return new Transaction(data);
  }
}
