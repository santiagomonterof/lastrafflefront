import { User } from "./User";

export interface ParticipatingUser {
    id: number;
    user_id: number;
    raffle_id: number;
    ticket_number: string;
    winner: boolean;
    user: User;
}