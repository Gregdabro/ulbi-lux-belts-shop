import $api from "../../shared/api/axios/interceptors";
import {USER_ENDPOINTS} from "../../shared/config/api.config";

export default class UserService {
    static fetchUsers() {
        return $api.get(USER_ENDPOINTS.GET_ALL)
    }
}

