import api from '@/plugins/axios'


export const getMessage = async (roomID: string) => {
    try {
        const { data } = await api.get(`/chat/${roomID}`);
        return data;
    } catch (error) {
        console.error("Message error:", error);
    }
}

export const postMessage = async (message: any) => {
    try {
        const { data } = await api.post(`/chat`, message);
        return data;
    } catch (error) {
        console.error("Message error:", error);
    }
}