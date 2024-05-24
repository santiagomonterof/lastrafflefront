import { ParticipatingUser } from "../models/objects/ParticipatingUser";
import { Raffle } from "../models/objects/Raffle"
import { RaffleSaveRequest } from "../models/requests/RaffleSaveRequest";
import api from "./Interceptors"

export const RaffleService = {
    create: (raffle: RaffleSaveRequest) => {
        return new Promise<Raffle>((resolve, reject) => {
            api.post('raffles/', raffle)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    update: (raffle: RaffleSaveRequest) => {
        return new Promise<Raffle>((resolve, reject) => {
            api.put(`raffles/${raffle.id}/`, raffle)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    delete: (raffleId: number) => {
        return new Promise<void>((resolve, reject) => {
            api.delete(`raffles/${raffleId}`)
            .then(() => resolve())
            .catch(error => reject(error))
        });
    },
    actives: (requestingUserId: number) => {
        return new Promise<Raffle[]>((resolve, reject) => {
            api.post('raffles/actives/', { "user_id" : requestingUserId })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    getById: (raffleId: number) => {
        return new Promise<Raffle>((resolve, reject) => {
            api.get(`raffles/${raffleId}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    participate: (raffleId: number, userId: number) => {
        return new Promise<Raffle>((resolve, reject) => {
            api.post(`raffles/${raffleId}/participate/`, { "user_id" : userId })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    participating: (raffleId: number) => {
        return new Promise<ParticipatingUser[]>((resolve, reject) => {
            api.get(`raffles/${raffleId}/participating/`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    start: (raffleId: number) => {
        return new Promise<Raffle>((resolve, reject) => {
            api.post(`raffles/${raffleId}/start/`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    draw: (raffleId: number) => {
        return new Promise<ParticipatingUser>((resolve, reject) => {
            api.post(`raffles/${raffleId}/draw/`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    finish: (raffleId: number) => {
        return new Promise<Raffle>((resolve, reject) => {
            api.post(`raffles/${raffleId}/finish/`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    winners: (raffleId: number) => {
        return new Promise<ParticipatingUser[]>((resolve, reject) => {
            api.get(`raffles/${raffleId}/winners/`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    }
}