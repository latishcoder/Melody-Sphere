import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,

  fetchAlbums: async () => {
    //data fetch Logic...
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/album");
      set({ albums: response.data });
    } catch (error: any) {
        let errorMessage = "An unexpected error occurred";

        if (error.response) {
            errorMessage = error.response.data?.message || `Error: ${error.response.status}`;
        } else if (error.request) {
            errorMessage = "No response from server. Please check your network connection.";
        } else {
            errorMessage = error.message;
        }
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/album/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
