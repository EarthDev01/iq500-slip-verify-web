import api from '@/plugins/axios'
import type { AllRoomPayload } from '@/types/room';

export const getRoom = async () => {
    try {
        const { data } = await api.get("/room");
        return data;
    } catch (error) {
        console.error("Room error:", error);
    }
};

export const postRoom = async () => {
    try {
        const { data } = await api.post("/room");
        return data;
    } catch (error) {
        console.error("Room error:", error);
    }
};

export const deleteRoom = async (id: string) => {
    try {
        const { data } = await api.delete(`/room/${id}`);
        return data;
    } catch (error) {
        console.error("Room error:", error);
    }
};
