import uniqid from 'uniqid';
import { User } from '../../../../accounts';
export class Team {
  id?: string;
  imgUrl?: string;
  name: string;
  ownerId: string;
  owner?: User
  createdAt?: Date;

  private constructor(teamInfo: Team) {
    if (!this.id) {
      this.id = uniqid();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    Object.assign(this, { ...teamInfo });
  }

  static create(data: Team) {
    return new Team(data);
  }
}
