// src/plugins/axios.ts
import axios, { AxiosError } from 'axios'
import type { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:5050/api",
})

// Interceptor: เพิ่ม token, จัดการ error
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (config.headers && token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (res) => {
        if (res?.data?.code === 401) {
            localStorage.removeItem("auth_token");
        }
        return res;
    },
    (err: AxiosError) => {
        if (
            err.response?.status === 400 ||
            err.response?.status === 409 ||
            err.response?.status === 500
        ) {
            return err.response;
        }
        return Promise.reject(err)
    }
)

export default apiClient
