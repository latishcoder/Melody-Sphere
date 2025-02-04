import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface ChatStore {
    users: any[];
    fetchUsers: () => Promise<void>;
    isLoading: boolean;
    error: string | null;    
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    fetchUsers: async() => {
        set({isLoading: true, error: null})
        try {
            const response = await axiosInstance.get("/user");
            set({users: response.data})
        } catch (error:any) {
            let errorMessage = "An unexpected error occurred";

            // Ensure `error.response` exists before accessing `data.message`
            if (error.response) {
                errorMessage = error.response.data?.message || `Error: ${error.response.status}`;
            } else if (error.request) {
                errorMessage = "No response from server. Check your network.";
            } else {
                errorMessage = error.message;
            }
            set({error: errorMessage})
        } finally {
            set({isLoading: false})}
    }
}))