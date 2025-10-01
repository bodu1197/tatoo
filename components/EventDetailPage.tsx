import React from 'react';
import type { Event, ArtistUser } from '../types';
import { ChevronLeftIcon, CalendarDaysIcon, TagIcon } from '../constants';

interface EventDetailPageProps {
  event: Event;
  artist: ArtistUser;
  onBack: () => void;
  onArtistClick: (artist: ArtistUser) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({ event, artist, onBack, onArtistClick }) => {
  const discountPercentage = Math.round(
    ((event.originalPrice - event.discountPrice) / event.originalPrice) * 100
  );
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8">Event Details</h1>
      </header>

      <div>
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-auto object-cover aspect-square"
          loading="lazy"
          decoding="async"
        />

        <div className="px-4 py-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <button onClick={() => onArtistClick(artist)} className="flex items-center gap-3 mb-2 group text-left">
                <div className="w-10 h-10 rounded-full border-2 border-gray-600 group-hover:border-cyan-400 transition-colors overflow-hidden flex-shrink-0">
                    <img src={artist.avatarUrl} alt={artist.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{artist.name}</p>
              </button>
              <h2 className="text-3xl font-bold text-white">{event.title}</h2>
            </div>
            <div className="bg-red-500 text-white text-lg font-bold px-3 py-1.5 rounded-md flex-shrink-0 ml-4">
              {discountPercentage}%
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <p className="text-4xl font-bold text-cyan-300">₩{event.discountPrice.toLocaleString()}</p>
            <p className="text-xl text-gray-500 line-through">₩{event.originalPrice.toLocaleString()}</p>
          </div>

          <div className="space-y-4 text-gray-300 mb-8">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="w-6 h-6 text-gray-400" />
              <span>{formatDate(event.startDate)} ~ {formatDate(event.endDate)}</span>
            </div>
             <div className="flex items-center gap-3">
              <TagIcon className="w-6 h-6 text-gray-400" />
              <span>{artist.specialty}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">About this Event</h3>
            <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{event.description}</p>
          </div>
        </div>
        
        <div className="px-4 pt-8 pb-4">
            <button onClick={() => onArtistClick(artist)} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 px-6 rounded-lg transition-colors text-lg">
                예약 문의하기
            </button>
        </div>
      </div>
    </div>
  );
};
