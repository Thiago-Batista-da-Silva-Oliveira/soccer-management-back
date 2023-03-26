import { IFindUserDTO } from "../../../../dtos";
import { IUserRepository } from "../../../../repositories";
import { User } from "../../entities";

export class FakeUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "teste@user.com",
      createdAt: new Date(),
      loginMode: {
        password: '123456',
        type: 'google',
        userId: '1'
      },
      iPlayIn: [],
    }
  ];

  async findById(id: string): Promise<User> {
    return this.users.find((u) => u.id === id);
  }

  async findBy(data: IFindUserDTO): Promise<User> {
    return this.users.find((u) => u.id === data.id);
  }

  async findMany(data: IFindUserDTO): Promise<User[]> {
    return this.users.filter((u) => u.id === data.id);
  }

  async exists(email: string): Promise<boolean> {
    return this.users.some((u) => u.email === email);
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async updatePassword(id: any, status: any): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    user.loginMode.password = status;
    return user;
  }

  async update(id: any, data: any): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    user.name = data.name;
    user.email = data.email;
    user.loginMode = data.loginMode;
    return user;
  }

  async delete(id: string) {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
