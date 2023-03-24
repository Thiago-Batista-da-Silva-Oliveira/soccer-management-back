import { IFindUserDTO } from '../dtos';
import { ICreateLoginModeDTO } from '../dtos/ICreateLoginModeDTO';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/prisma/entities/User';

export interface IUserRepository {
  create(user: ICreateUserDTO, loginMode: ICreateLoginModeDTO ): Promise<User>;
  updatePassword(id: any, status: any): Promise<User>;
  update(id: any, data: any): Promise<User>;
  findById(id: string): Promise<User>;
  findBy(data: IFindUserDTO): Promise<User>;
  findMany(data: IFindUserDTO): Promise<User[]>;
  exists(email: string): Promise<boolean>;
}
