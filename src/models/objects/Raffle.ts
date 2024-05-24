import { User } from "./User";

export interface Raffle {
    id?: number;
    name: string;
    ticket_amount: number;
    ticket_code: string;
    status: number;
    created_by: User;
    users: User[];
}