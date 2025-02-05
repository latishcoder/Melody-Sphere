import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;

	checkAdminStatus: () => Promise<void>;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isAdmin: false,
	isLoading: false,
	error: null,

	checkAdminStatus: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/check");
			set({ isAdmin: response.data.admin });
		} catch (error: any) {
			let errorMessage = "Failed to check admin status.";

			if (error.response) {
				errorMessage = error.response.data?.message || `Error: ${error.response.status}`;
			} else if (error.request) {
				errorMessage = "No response from server. Please check your network.";
			} else {
				errorMessage = error.message;
			}
			set({ isAdmin: false, error: errorMessage });
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => {
		set({ isAdmin: false, isLoading: false, error: null });
	},
}));