import { Raffle } from "../models/objects/Raffle";
import { User } from "../models/objects/User"
import api from "./Interceptors"

export const UserService = {
    list: () => {
        return new Promise<User[]>((resolve, reject) => {
            api.get('users/')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    createdRaffles: (userId: number) => {
        return new Promise<Raffle[]>((resolve, reject) => {
            api.get(`users/${userId}/raffles/created`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    participatingRaffles: (userId: number) => {
        return new Promise<Raffle[]>((resolve, reject) => {
            api.get(`users/${userId}/raffles/participating`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    }
}