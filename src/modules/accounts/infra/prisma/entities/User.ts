import uniqid from 'uniqid';
import { ForgotPassword } from './ForgotPassword';
import { LoginMode } from './LoginMode';
export class User {
  id?: string;
  email: string;
  name: string;
  loginMode?: LoginMode;
  forgotPassword?: ForgotPassword;
  createdAt?: Date;

  private constructor(userInfo: User) {
    if (!this.id) {
      this.id = uniqid();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    Object.assign(this, { ...userInfo });
  }

  static create(data: User) {
    return new User(data);
  }
}
