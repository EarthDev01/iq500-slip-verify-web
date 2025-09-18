import api from '@/plugins/axios'
import type { LoginPayload } from '@/types/login'

export const login = async (payload: LoginPayload) => {
    try {
        const { data } = await api.post("/login", payload);
        return data;
    } catch (error) {
        console.error("Login error:", error);
    }
};

export const register = async (payload: LoginPayload) => {
    try {
        const { data } = await api.post("/register", payload);
        return data;
    } catch (error) {
        console.error("Login error:", error);
    }
};