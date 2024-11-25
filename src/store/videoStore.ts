import { create } from 'zustand';
import { VideoSource, Product, InteractionArea } from '../types';

interface VideoStore {
  videos: VideoSource[];
  products: Product[];
  interactionAreas: InteractionArea[];
  activeVideo: VideoSource | null;
  setVideos: (videos: VideoSource[]) => void;
  setProducts: (products: Product[]) => void;
  setInteractionAreas: (areas: InteractionArea[]) => void;
  setActiveVideo: (video: VideoSource | null) => void;
  addVideo: (video: VideoSource) => void;
  addProduct: (product: Product) => void;
  addInteractionArea: (area: InteractionArea) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  videos: [],
  products: [],
  interactionAreas: [],
  activeVideo: null,
  setVideos: (videos) => set({ videos }),
  setProducts: (products) => set({ products }),
  setInteractionAreas: (areas) => set({ interactionAreas: areas }),
  setActiveVideo: (video) => set({ activeVideo: video }),
  addVideo: (video) => set((state) => ({ videos: [...state.videos, video] })),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  addInteractionArea: (area) =>
    set((state) => ({ interactionAreas: [...state.interactionAreas, area] })),
}));