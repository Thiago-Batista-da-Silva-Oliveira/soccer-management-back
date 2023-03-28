import { inject, injectable } from "tsyringe";
import { PLAYER_REPOSITORY_KEY } from "../../../../config/constants";
import { AppError } from "../../../../shared/errors/AppError";
import { IUpdatePlayerDTO } from "../../dtos";
import { Player } from "../../infra";
import { IPlayerRepository } from "../../repositories";

@injectable()
export class UpdatePlayerService {
  constructor(
    @inject(PLAYER_REPOSITORY_KEY)
    private playerRepository: IPlayerRepository
  ) {}
  async execute({
    id,
    name,
    position,
  }: {
    id: string;
    name?: string;
    position?: string;
  }): Promise<Player> {
    const findPlayer = await this.playerRepository.findById(id);
    if (!findPlayer) {
      throw new AppError("Jogador não encontrado", 404);
    }

    const player = await this.playerRepository.update(id, {
      name,
      position,
    });
    return player;
  }
}
