import { inject, injectable } from "tsyringe";
import { TEAM_REPOSITORY_KEY } from "../../../../config/constants";
import { AppError } from "../../../../shared/errors/AppError";
import { ITeamRepository } from "../../repositories";

interface IRequest {
    id: string;
    ownerId: string;
}

@injectable()
export class DeleteTeamService {
    constructor(
        @inject(TEAM_REPOSITORY_KEY)
        private teamRepository: ITeamRepository,
    ){}
    async execute({id, ownerId}: IRequest): Promise<void> {
        const findById = await this.teamRepository.findById(id);
        if (!findById) {
            throw new AppError("Time não encontrado", 404);
        }

        if(findById.ownerId !== ownerId) {
            throw new AppError("Você não tem permissão para deletar esse time", 403);
        }
      
        await this.teamRepository.delete(id);
    }
}