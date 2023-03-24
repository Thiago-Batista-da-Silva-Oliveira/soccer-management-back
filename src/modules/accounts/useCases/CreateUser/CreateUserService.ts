import { container, inject, injectable } from "tsyringe";
import { HASH_PROVIDER, USER_REPOSITORY_KEY } from "../../../../config/constants";
import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/prisma";
import { IHashProvider } from "../../providers/HashProvider/models";
import { IUserRepository } from "../../repositories";
import { ISessionResponse, SessionService } from "../Session";

@injectable()
export class CreateUserService {
    constructor(
        @inject(USER_REPOSITORY_KEY)
        private userRepository: IUserRepository,
        @inject(HASH_PROVIDER)
        private hashProvider: IHashProvider
    ){}
    async execute({email, password, name}): Promise<ISessionResponse> {
     const sessionService = container.resolve(SessionService);
     const findExistingUser = await this.userRepository.exists(email)
     if(findExistingUser) {
        throw new AppError("Email já cadastrado")
     }
     const createUser = User.create({
        email,
        name
     })
     const hashedPassword = await this.hashProvider.generateHash(password)

     const user = await this.userRepository.create(createUser,{
      type: 'default',
      password: hashedPassword
     })

     if(!user) {
        throw new AppError("Erro ao criar usuário")
     }

     const sessionData = await sessionService.execute({email, password})

     return sessionData
    }
}