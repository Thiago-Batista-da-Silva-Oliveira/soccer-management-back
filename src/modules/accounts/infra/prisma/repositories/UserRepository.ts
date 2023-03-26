import { prisma } from "../../../../../config/prismaClient";
import { IFindUserDTO } from "../../../dtos";
import { ICreateLoginModeDTO } from "../../../dtos/ICreateLoginModeDTO";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../../repositories";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  private repository: typeof prisma.user;

  constructor() {
    this.repository = prisma.user;
  }

  async exists(email: string): Promise<boolean> {
    const userExists = await this.repository.findUnique({
      where: { email: email },
    });
    return !!userExists;
  }

  async findBy(data: IFindUserDTO): Promise<User> {
    return this.repository.findFirst({
      where: data,
      include: {
        loginMode: true,
      },
    });
  }

  async create(
    user: ICreateUserDTO,
    loginMode: ICreateLoginModeDTO
  ): Promise<User> {
    return prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        id: user.id,
        loginMode: {
          create: {
            ...loginMode,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<User> {
    return this.repository.findFirst({
      where: { id },
      include: { loginMode: true, teams: true, iPlayIn: true },
    });
  }

  async findMany(data: any): Promise<User[]> {
    return this.repository.findMany({
      where: data,
      include: { loginMode: true, teams: true, iPlayIn: true },
    });
  }

  async update(id: { id: string }, data: any): Promise<User> {
    return this.repository.update({
      where: id,
      data,
    });
  }

  async updatePassword(id: { id: string }, password: any): Promise<User> {
    return this.repository.update({
      where: id,
      data: password,
    });
  }
}
