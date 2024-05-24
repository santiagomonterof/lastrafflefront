import { User } from "../models/objects/User";
import { LoginRequest } from "../models/requests/LoginRequest";
import { SignUpRequest } from "../models/requests/SignUpRequest";
import { AuthResponse } from "../models/responses/AuthResponse";
import api from "./Interceptors";

export const AuthService = {
    login: (request: LoginRequest) => {
        return new Promise<AuthResponse>((resolve, reject) => {
            api.post('token/', request)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    signUp: (request: SignUpRequest) => {
        return new Promise<User>((resolve, reject) => {
            api.post('users/', request)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    getUserInfo: () => {
        return new Promise<User>((resolve, reject) => {
            api.get('http://localhost:8000/api/users/me')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    }
}