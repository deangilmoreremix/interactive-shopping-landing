import { create } from 'zustand';
import { UGCPost, UserProfile } from '../types';

interface SocialStore {
  posts: UGCPost[];
  profiles: UserProfile[];
  activeProfile: UserProfile | null;
  challenges: Array<{
    id: string;
    title: string;
    description: string;
    reward: string;
    participants: number;
    endDate: string;
  }>;
  rewards: Array<{
    id: string;
    userId: string;
    type: string;
    points: number;
    earned: string;
  }>;
  trends: Array<{
    id: string;
    name: string;
    posts: number;
    engagement: number;
    growth: number;
  }>;
  addPost: (post: UGCPost) => void;
  removePost: (postId: string) => void;
  likePost: (postId: string) => void;
  setActiveProfile: (profile: UserProfile | null) => void;
  addChallenge: (challenge: any) => void;
  addReward: (reward: any) => void;
  updateTrends: (trends: any[]) => void;
}

export const useSocialStore = create<SocialStore>((set) => ({
  posts: [],
  profiles: [],
  activeProfile: null,
  challenges: [],
  rewards: [],
  trends: [],
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
  addChallenge: (challenge) =>
    set((state) => ({ challenges: [...state.challenges, challenge] })),
  addReward: (reward) =>
    set((state) => ({ rewards: [...state.rewards, reward] })),
  updateTrends: (trends) => set({ trends }),
}));