import React from 'react';
import { ChevronLeftIcon } from '../constants';
import type { ChatRoom, ChatMessage, LoggedInUser, ArtistUser } from '../types';

interface ChatListPageProps {
  chatRooms: ChatRoom[];
  messages: ChatMessage[];
  currentUser: LoggedInUser;
  allArtists: ArtistUser[];
  onSelectChat: (roomId: number) => void;
  onBack: () => void;
}

export const ChatHistoryPage: React.FC<ChatListPageProps> = ({ chatRooms, currentUser, allArtists, onSelectChat, onBack }) => {

  const getParticipantDetails = (room: ChatRoom) => {
    const participantId = room.participant_ids.find(id => id !== currentUser.id);
    if (!participantId) return { name: 'Unknown', avatarUrl: '' };
    
    // In a real app, you might have a single users table. Here we only have artists.
    const artist = allArtists.find(a => a.id === participantId);
    if (artist) {
      return { name: artist.name, avatarUrl: artist.avatarUrl };
    }
    
    // Fallback for non-artist users (not fully implemented in mock data)
    return { name: `User #${participantId}`, avatarUrl: 'https://picsum.photos/100/100?random=99' };
  };
  
  const formatTimestamp = (timestamp: string | undefined) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    }
    if (diffDays === 1) {
      return '어제';
    }
    return date.toLocaleDateString('ko-KR');
  }

  return (
    <div className="animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8">채팅</h1>
      </header>
      
      <div className="px-4 py-8">
        {chatRooms.length > 0 ? (
          <div className="space-y-3">
            {chatRooms.map((room) => {
              const participant = getParticipantDetails(room);
              return (
                <div
                  key={room.id}
                  onClick={() => onSelectChat(room.id)}
                  className="flex items-center p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden flex-shrink-0">
                    <img
                      src={participant.avatarUrl}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-baseline">
                      <p className="font-semibold text-white truncate">{participant.name}</p>
                      <p className="text-xs text-gray-500 flex-shrink-0">{formatTimestamp(room.last_message_timestamp)}</p>
                    </div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-400 truncate pr-2">{room.last_message_text || '아직 메시지가 없습니다.'}</p>
                      {room.unread_count && room.unread_count > 0 && (
                        <span className="bg-cyan-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                          {room.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-lg">
            <p>아직 채팅 기록이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};