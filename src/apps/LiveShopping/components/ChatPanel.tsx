import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

interface ChatPanelProps {
  messages: any[];
  isLive: boolean;
  config: {
    enabled: boolean;
    moderationEnabled: boolean;
    userLimit: number;
    messageRateLimit: number;
  };
}

export default function ChatPanel({ messages, isLive, config }: ChatPanelProps) {
  const [newMessage, setNewMessage] = useState('');
  const [rateLimit, setRateLimit] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isLive || rateLimit) return;

    // Implement rate limiting
    setRateLimit(true);
    setTimeout(() => setRateLimit(false), (1000 / config.messageRateLimit));

    // Clear input
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-[400px] flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Live Chat</h3>
        {!isLive && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <AlertCircle size={16} />
            <span>Chat is disabled while stream is offline</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
            <div>
              <p className="text-sm">
                <span className="font-medium">{message.user}</span>
                <span className="text-gray-500 text-xs ml-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </p>
              <p className="text-gray-700">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isLive ? "Type a message..." : "Chat is disabled"}
            disabled={!isLive || rateLimit}
            className="w-full px-4 py-2 pr-12 border rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!isLive || !newMessage.trim() || rateLimit}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:text-gray-300"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}