import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../../types';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../../config/cloudinary';

interface UserProfileHeaderProps {
  profile: UserProfile;
  onFollow?: () => void;
  isFollowing?: boolean;
}

export default function UserProfileHeader({
  profile,
  onFollow,
  isFollowing = false,
}: UserProfileHeaderProps) {
  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const optimizedAvatar = cld.image(profile.avatar)
    .format('auto')
    .quality('auto')
    .resize({ width: 96, height: 96, crop: 'fill' });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-6">
        <img
          src={optimizedAvatar.toURL()}
          alt={profile.username}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">{profile.username}</h2>
            {profile.verified && (
              <CheckCircle2 className="text-blue-500" size={20} />
            )}
          </div>
          <p className="text-gray-600 mb-4">{profile.bio}</p>
          <div className="flex items-center gap-6">
            <div>
              <span className="font-semibold">{profile.posts.length}</span>
              <span className="text-gray-500 ml-1">posts</span>
            </div>
            <div>
              <span className="font-semibold">{profile.followers}</span>
              <span className="text-gray-500 ml-1">followers</span>
            </div>
            <div>
              <span className="font-semibold">{profile.following}</span>
              <span className="text-gray-500 ml-1">following</span>
            </div>
          </div>
        </div>
        {onFollow && (
          <button
            onClick={onFollow}
            className={`px-6 py-2 rounded-lg ${
              isFollowing
                ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  );
}