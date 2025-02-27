import axios from 'axios';

import { API_URL, AUTH_ENDPOINTS, STORAGE_TOKEN_KEY } from '../../config/api.config';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(STORAGE_TOKEN_KEY)}`
    return config;
})

$api.interceptors.response.use((config) => {
    console.log('API Response:', config.config.url, config.data);
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/${AUTH_ENDPOINTS.REFRESH}`, {withCredentials: true})
            console.log('Refresh token response:', response.data);
            localStorage.setItem(STORAGE_TOKEN_KEY, response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН', e)
        }
    }
    throw error;
})

export default $api;
