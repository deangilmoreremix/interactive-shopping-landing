export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  videoTimestamp?: number;
}

export interface InteractionArea {
  id: string;
  productId: string;
  startTime: number;
  endTime: number;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface VideoSource {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publicId: string;
  views: number;
  duration: string;
}

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  duration: number;
}

export interface UGCPost {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  products: Product[];
  createdAt: string;
  tags: string[];
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: UGCPost[];
  verified: boolean;
}