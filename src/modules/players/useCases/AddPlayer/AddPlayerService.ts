import { injectable, inject } from "tsyringe";
import { PLAYER_REPOSITORY_KEY } from "../../../../config/constants";
import { Player } from "../../infra";
import { IPlayerRepository } from "../../repositories";

interface IAddPlayerService {
    name: string;
    position: string;
    teamId: string;
    accountId?: string;
}

@injectable()
export class AddPlayerService {
    constructor(
        @inject(PLAYER_REPOSITORY_KEY)
        private playerRepository: IPlayerRepository,
    ){}
    async execute({name, position, teamId, accountId}: IAddPlayerService): Promise<Player> {
        const player = Player.create({
            name,
            position,
            teamId,
            accountId
        })
    
        return await this.playerRepository.create(player)
    }
}