import uniqid from 'uniqid';

export class ForgotPassword {
  id?: string;
  expiresIn?: number;
  userId: string;

  private constructor(ForgotPasswordInfo: ForgotPassword) {
    if (!this.id) {
      this.id = uniqid();
    }

    Object.assign(this, { ...ForgotPasswordInfo });
  }

  static create(data: ForgotPassword) {
    return new ForgotPassword(data);
  }
}
