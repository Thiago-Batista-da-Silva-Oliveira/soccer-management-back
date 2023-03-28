import { ICreatePlayerDTO, IUpdatePlayerDTO } from "../dtos";
import { Player } from "../infra/prisma/entities";

export interface IPlayerRepository {
    create(data: ICreatePlayerDTO): Promise<Player>;
    update(id: string, data: IUpdatePlayerDTO): Promise<Player>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Player>;

}