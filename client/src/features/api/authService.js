import $api from "../../shared/api/axios/interceptors";
import {AUTH_ENDPOINTS} from "../../shared/config/api.config";

export default class AuthService {
    static async login(email, password) {
        return $api.post(AUTH_ENDPOINTS.LOGIN, {email, password})
    }

    static async registration(email, password) {
        console.log(email, password)
        return $api.post(AUTH_ENDPOINTS.REGISTER, {email, password})
    }

    static async logout() {
        return $api.post(AUTH_ENDPOINTS.LOGOUT)
    }

}

