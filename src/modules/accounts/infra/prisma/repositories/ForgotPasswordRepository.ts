
import { prisma } from '../../../../../config/prismaClient';
import { IForgotPasswordRepository } from '../../../repositories/IForgotPasswordRepository';
import { ForgotPassword } from '../entities';

export class ForgotPasswordRepository implements IForgotPasswordRepository {
  private repository: typeof prisma.forgotPassword;

  constructor() {
    this.repository = prisma.forgotPassword;
  }

  async create(data: {
    id?: string;
    userId: string;
    expiresIn: number;
  }): Promise<ForgotPassword> {
    return this.repository.create({ data });
  }

  async delete(id: string): Promise<any> {
    return this.repository.delete({ where: { id } });
  }

  async findFirst(id: string): Promise<ForgotPassword> {
    return this.repository.findFirst({ where: { id } });
  }

  async findByUserId(userId: string): Promise<ForgotPassword> {
    return this.repository.findFirst({ where: { userId } });
  }
}
