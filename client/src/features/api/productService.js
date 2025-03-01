import $api from "../../shared/api/axios/interceptors";
import { PRODUCT_ENDPOINTS } from "../../shared/config/api.config";

export default class ProductService {
    static async getAll() {
        return $api.get(PRODUCT_ENDPOINTS.GET_ALL);
    }

    static async getById(id) {
        return $api.get(`${PRODUCT_ENDPOINTS.GET_ALL}/${id}`);
    }

    static async getByCategory(category) {
        return $api.get(`${PRODUCT_ENDPOINTS.GET_ALL}/category/${category}`);
    }
}
