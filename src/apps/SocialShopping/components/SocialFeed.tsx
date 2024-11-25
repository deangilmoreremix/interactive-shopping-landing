import React, { useState } from 'react';
import { useSocialStore } from '../../../store/socialStore';
import UGCPostCard from './UGCPostCard';
import { UGCPost } from '../../../types';
import { Filter, TrendingUp } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

export default function SocialFeed() {
  const { posts, likePost } = useSocialStore();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const handleLike = (postId: string) => {
    likePost(postId);
  };

  const handleComment = (postId: string) => {
    // Implement comment functionality
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    // Implement share functionality
    console.log('Share post:', postId);
  };

  const handleProductClick = (productId: string) => {
    // Implement product view functionality
    console.log('View product:', productId);
  };

  const filteredPosts = posts
    .filter(post => {
      if (filter === 'all') return true;
      if (filter === 'photos') return post.mediaType === 'image';
      if (filter === 'videos') return post.mediaType === 'video';
      if (filter === 'products') return post.products.length > 0;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'popular') return b.likes - a.likes;
      if (sortBy === 'trending') return (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares);
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Feed Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm border-none focus:ring-0"
              >
                <option value="all">All Posts</option>
                <option value="photos">Photos</option>
                <option value="videos">Videos</option>
                <option value="products">Products</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-none focus:ring-0"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post: UGCPost) => (
          <UGCPostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onProductClick={handleProductClick}
          />
        ))}
      </div>
    </div>
  );
}