import { ICreatePlayerDTO } from "../dtos";
import { Player } from "../infra/prisma/entities";

export interface IPlayerRepository {
    create(data: ICreatePlayerDTO): Promise<Player>;
}