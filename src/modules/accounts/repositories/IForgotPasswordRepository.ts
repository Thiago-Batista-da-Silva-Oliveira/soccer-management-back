import { ICreateRefreshTokenDTO } from "../dtos/ICreateRefreshTokenDTO";
import { ForgotPassword } from "../infra/prisma";

export interface IForgotPasswordRepository {
  create(data: ICreateRefreshTokenDTO): Promise<ForgotPassword>;
  delete(id: string): Promise<ForgotPassword>;
  findFirst(id: string): Promise<ForgotPassword>;
  findByUserId(userId: string): Promise<ForgotPassword>;
}
