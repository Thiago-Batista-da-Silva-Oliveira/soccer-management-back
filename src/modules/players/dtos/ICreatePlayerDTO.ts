export interface ICreatePlayerDTO {
    id?: string;
    name: string;
    position: string;
    teamId: string;
    accountId?: string;
    createdAt?: Date;
}