export interface ICreateTransactionDTO {
    id?: string;
    type: string;
    description: string;
    teamId: string;
    amount: number;
    playerId?: string;
    createdAt?: Date;
}