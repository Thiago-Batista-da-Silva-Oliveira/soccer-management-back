import uniqid from 'uniqid';

export class RefreshToken {
  id?: string;
  expiresIn?: number;
  userId: string;

  private constructor(RefreshTokenInfo: RefreshToken) {
    if (!this.id) {
      this.id = uniqid();
    }

    Object.assign(this, { ...RefreshTokenInfo });
  }

  static create(data: RefreshToken) {
    return new RefreshToken(data);
  }
}
