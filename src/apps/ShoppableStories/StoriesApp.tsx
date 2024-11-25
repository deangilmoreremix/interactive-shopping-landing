import React, { useState } from 'react';
import { BookOpen, Plus, ShoppingBag, Play, Image as ImageIcon } from 'lucide-react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CONFIG } from '../../config/cloudinary';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import StoryViewer from './components/StoryViewer';
import StoryEditor from './components/StoryEditor';

interface Story {
  id: string;
  title: string;
  thumbnail: string;
  slides: Array<{
    id: string;
    type: 'image' | 'video';
    mediaId: string;
    duration?: number;
    products?: Array<{
      id: string;
      name: string;
      price: number;
      position: { x: number; y: number };
    }>;
  }>;
  products: number;
  views: number;
}

export default function StoriesApp() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      title: 'Summer Collection',
      thumbnail: 'samples/ecommerce/summer-collection',
      slides: [
        {
          id: '1-1',
          type: 'image',
          mediaId: 'samples/ecommerce/dress',
          duration: 5,
          products: [
            {
              id: 'p1',
              name: 'Summer Dress',
              price: 89.99,
              position: { x: 50, y: 50 }
            }
          ]
        },
        {
          id: '1-2',
          type: 'video',
          mediaId: 'samples/ecommerce/fashion-show',
          duration: 15
        }
      ],
      products: 12,
      views: 2400,
    },
    {
      id: '2',
      title: 'Tech Essentials',
      thumbnail: 'samples/ecommerce/tech-gear',
      slides: [
        {
          id: '2-1',
          type: 'image',
          mediaId: 'samples/ecommerce/accessories-bag',
          duration: 5
        }
      ],
      products: 8,
      views: 1800,
    },
  ]);

  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_CONFIG.cloudName
    }
  });

  const handleCreateStory = () => {
    setShowEditor(true);
  };

  const handleSaveStory = (newStory: Story) => {
    setStories(prev => [...prev, newStory]);
    setShowEditor(false);
  };

  const optimizeThumbnail = (publicId: string) => {
    return cld.image(publicId)
      .resize(thumbnail().width(400).height(225).gravity(autoGravity()))
      .roundCorners(byRadius(8))
      .format('auto')
      .quality('auto')
      .toURL();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="text-teal-600" size={24} />
              <span className="text-xl font-bold text-gray-800">Shoppable Stories</span>
            </div>
            <button 
              onClick={handleCreateStory}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              <Plus size={20} />
              Create Story
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Story Card */}
          <div 
            onClick={handleCreateStory}
            className="bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-500 hover:text-teal-600 hover:border-teal-600 cursor-pointer"
          >
            <Plus size={40} />
            <p className="mt-2 font-medium">Create New Story</p>
          </div>

          {/* Story Cards */}
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={optimizeThumbnail(story.thumbnail)}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold">{story.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <ShoppingBag size={16} />
                      {story.products} products
                    </span>
                    <span>{story.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <button 
                  onClick={() => setSelectedStory(story)}
                  className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
                >
                  <Play size={20} />
                  Preview
                </button>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {showEditor && (
        <StoryEditor
          onClose={() => setShowEditor(false)}
          onSave={handleSaveStory}
        />
      )}
    </div>
  );
}