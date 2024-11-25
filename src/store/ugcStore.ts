import { create } from 'zustand';
import { UGCPost, UserProfile } from '../types';

interface UGCStore {
  posts: UGCPost[];
  profiles: UserProfile[];
  activeProfile: UserProfile | null;
  setPosts: (posts: UGCPost[]) => void;
  addPost: (post: UGCPost) => void;
  removePost: (postId: string) => void;
  likePost: (postId: string) => void;
  setActiveProfile: (profile: UserProfile | null) => void;
}

export const useUGCStore = create<UGCStore>((set) => ({
  posts: [],
  profiles: [],
  activeProfile: null,
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ),
    })),
  setActiveProfile: (profile) => set({ activeProfile: profile }),
}));