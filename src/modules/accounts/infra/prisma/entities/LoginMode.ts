import { User } from './User';

export class LoginMode {
  userId: string;
  user?: User;
  type: string
  password?: string;

  private constructor(LoginModeInfo: LoginMode) {
    Object.assign(this, { ...LoginModeInfo });
  }

  static create(data: LoginMode) {
    return new LoginMode(data);
  }
}
