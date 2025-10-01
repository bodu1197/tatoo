
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, PaperAirplaneIcon } from '../constants';
import type { ChatRoom, ChatMessage, LoggedInUser, ArtistUser } from '../types';
import { supabase } from '../services/supabaseClient';


interface ChatPageProps {
  chatRoom: ChatRoom;
  messages: ChatMessage[];
  currentUser: LoggedInUser;
  allArtists: ArtistUser[];
  onSendMessage: (chatRoomId: number, content: string) => void;
  onBack: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ chatRoom, messages, currentUser, allArtists, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Real Supabase Integration ---
  // In a real app with a Supabase backend, you would uncomment this useEffect hook.
  // It listens for any new messages inserted into the 'messages' table for this specific chat room
  // and would automatically update the UI in real-time.
  /*
  useEffect(() => {
    // 1. Define a function to handle incoming messages
    const handleNewMessage = (payload) => {
      // `payload.new` contains the newly inserted row (the new message)
      const newMsg = payload.new as ChatMessage;
      
      // Add the new message to the local state to update the UI
      // Note: You might need to adjust the state management based on your app's architecture
      // (e.g., using a state management library like Zustand or Redux).
      // For this simulation, we assume the parent `App.tsx` handles this via `onSendMessage`.
      
      // To prevent adding a message you just sent, you can add a check:
      // if (newMsg.sender_id !== currentUser.id) {
      //   setMessages(prevMessages => [...prevMessages, newMsg]);
      // }
    };

    // 2. Create a Supabase channel and subscribe to database inserts
    const channel = supabase
      .channel(`chat_room_${chatRoom.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_room_id=eq.${chatRoom.id}`, // Only listen for messages in this room
        },
        handleNewMessage
      )
      .subscribe();

    // 3. Clean up the subscription when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatRoom.id, currentUser.id]);
  */
  // --- End Real Supabase Integration ---
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const participantId = chatRoom.participant_ids.find(id => id !== currentUser.id);
  const participant = allArtists.find(a => a.id === participantId) || { name: 'Unknown User', avatarUrl: 'https://picsum.photos/100/100?random=99' };

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(chatRoom.id, newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  return (
    <div className="h-screen flex flex-col animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-700">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 mx-auto pr-8">
            <img src={participant.avatarUrl} alt={participant.name} className="w-8 h-8 rounded-full" />
            <h1 className="text-xl font-bold truncate">{participant.name}</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isSent = msg.sender_id === currentUser.id;
          const showAvatar = index === 0 || messages[index - 1].sender_id !== msg.sender_id;

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isSent ? 'justify-end' : 'justify-start'}`}>
              {!isSent && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    {showAvatar && <img src={participant.avatarUrl} alt={participant.name} className="w-full h-full object-cover" />}
                </div>
              )}
              <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${isSent ? 'bg-cyan-500 text-black rounded-br-none' : 'bg-gray-700 text-white rounded-bl-none'}`}>
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            rows={1}
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none no-scrollbar"
            style={{ maxHeight: '100px' }}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-cyan-500 text-black rounded-full p-2 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
