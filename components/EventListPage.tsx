import React, { useState, useMemo } from 'react';
import type { Event, Artist } from '../types';
import { isArtistPremium } from '../types';
import { EventCard } from './EventCard';

interface EventListPageProps {
  events: Event[];
  artists: Artist[];
  onEventClick: (event: Event) => void;
}

export const EventListPage: React.FC<EventListPageProps> = ({ events, artists, onEventClick }) => {
  const [artistTypeFilter, setArtistTypeFilter] = useState<'TATTOO' | 'PMU'>('TATTOO');

  const premiumArtistNames = useMemo(() => {
    return new Set(artists.filter(isArtistPremium).map(a => a.name));
  }, [artists]);

  const filteredAndSortedEvents = useMemo(() => {
    const filtered = events.filter(event => event.artistType === artistTypeFilter);
    
    // Sort by premium status first
    return filtered.sort((a, b) => {
        const aIsPremium = premiumArtistNames.has(a.artistName);
        const bIsPremium = premiumArtistNames.has(b.artistName);
        if (bIsPremium && !aIsPremium) return 1;
        if (!bIsPremium && aIsPremium) return -1;
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime(); // Secondary sort by date
    });
  }, [events, artistTypeFilter, premiumArtistNames]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="animate-fade-in">
      <header className="p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 text-center">
        <h1 className="text-xl font-bold">진행중인 이벤트</h1>
      </header>

      <div className="px-4 py-8">
        <div className="mb-6 flex border-b border-gray-700">
          <button
              onClick={() => setArtistTypeFilter('TATTOO')}
              className={`px-6 py-3 font-semibold text-sm transition-colors focus:outline-none ${artistTypeFilter === 'TATTOO' ? 'border-b-2 border-cyan-400 text-white' : 'text-gray-400 hover:text-white'}`}
          >
              타투 이벤트
          </button>
          <button
              onClick={() => setArtistTypeFilter('PMU')}
              className={`px-6 py-3 font-semibold text-sm transition-colors focus:outline-none ${artistTypeFilter === 'PMU' ? 'border-b-2 border-cyan-400 text-white' : 'text-gray-400 hover:text-white'}`}
          >
              반영구 이벤트
          </button>
        </div>

        {filteredAndSortedEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedEvents.map(event => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className="group cursor-pointer"
              >
                <EventCard event={event} onClick={() => {}} isPremium={premiumArtistNames.has(event.artistName)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-lg">
            <p>진행중인 이벤트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
