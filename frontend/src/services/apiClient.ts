import { Routes } from '@/models';
import { getLocalStorage } from '@/utilities';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : Routes.HOME,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        if (getLocalStorage('userInfo')) {
            config.headers.authorization = `Bearer ${JSON.parse(getLocalStorage('userInfo')!).token}`
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default apiClient