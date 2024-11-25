import React from 'react';
import { Heart, MessageCircle, Share2, ShoppingBag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { UGCPost } from '../../../types';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

interface UGCPostCardProps {
  post: UGCPost;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onProductClick: (productId: string) => void;
}

export default function UGCPostCard({
  post,
  onLike,
  onComment,
  onShare,
  onProductClick,
}: UGCPostCardProps) {
  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const optimizedMedia = cld.image(post.mediaUrl)
    .format('auto')
    .quality('auto');

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.userAvatar}
            alt={post.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{post.username}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        {post.mediaType === 'video' ? (
          <video
            src={post.mediaUrl}
            className="w-full aspect-video object-cover"
            controls
          />
        ) : (
          <img
            src={optimizedMedia.toURL()}
            alt={post.caption}
            className="w-full aspect-video object-cover"
          />
        )}
        {post.products.length > 0 && (
          <button
            onClick={() => onProductClick(post.products[0].id)}
            className="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-white"
          >
            <ShoppingBag size={16} />
            <span className="text-sm">Shop Now</span>
          </button>
        )}
      </div>

      <div className="p-4">
        <p className="text-gray-800 mb-3">{post.caption}</p>
        
        <div className="flex items-center gap-6">
          <button
            onClick={() => onLike(post.id)}
            className="flex items-center gap-1 text-gray-600 hover:text-pink-600"
          >
            <Heart size={20} />
            <span>{post.likes}</span>
          </button>
          <button
            onClick={() => onComment(post.id)}
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <MessageCircle size={20} />
            <span>{post.comments}</span>
          </button>
          <button
            onClick={() => onShare(post.id)}
            className="flex items-center gap-1 text-gray-600 hover:text-green-600"
          >
            <Share2 size={20} />
            <span>{post.shares}</span>
          </button>
        </div>

        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}