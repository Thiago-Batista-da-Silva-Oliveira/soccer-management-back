import { sign } from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
class GenerateTokenProvider {
  async execute(user: { id?: string }) {
    const token = sign({}, '6468468468', {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

export { GenerateTokenProvider };
