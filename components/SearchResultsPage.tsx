import React, { useMemo } from 'react';
import type { ArtistUser, Tattoo, Event } from '../types';
import { isArtistPremium } from '../types';
import { ArtistCard } from './ArtistCard';
import { TattooCard } from './TattooCard';
import { EventCard } from './EventCard';
import { ChevronLeftIcon } from '../constants';

interface SearchResultsPageProps {
  query: string;
  artists: ArtistUser[];
  tattoos: Tattoo[];
  events: Event[];
  onArtistClick: (artist: ArtistUser) => void;
  onTattooClick: (tattoo: Tattoo) => void;
  onEventClick: (event: Event) => void;
  onBack: () => void;
  likedArtists: Set<number>;
  onToggleLikeArtist: (artistId: number) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  artists,
  tattoos,
  events,
  onArtistClick,
  onTattooClick,
  onEventClick,
  onBack,
  likedArtists,
  onToggleLikeArtist,
}) => {
  const lowerCaseQuery = query.toLowerCase();

  const filteredArtists = useMemo(() => {
    return artists
      .filter(artist =>
        artist.name.toLowerCase().includes(lowerCaseQuery) ||
        artist.specialty.toLowerCase().includes(lowerCaseQuery) ||
        artist.location.toLowerCase().includes(lowerCaseQuery)
      )
      .sort((a, b) => {
        const aIsPremium = isArtistPremium(a);
        const bIsPremium = isArtistPremium(b);
        if (bIsPremium && !aIsPremium) return 1;
        if (!bIsPremium && aIsPremium) return -1;
        return 0;
      });
  }, [artists, lowerCaseQuery]);

  const filteredTattoos = useMemo(() => {
    return tattoos
      .filter(tattoo =>
        tattoo.artistName.toLowerCase().includes(lowerCaseQuery) ||
        tattoo.style.toLowerCase().includes(lowerCaseQuery) ||
        (tattoo.tags && tattoo.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))) ||
        (tattoo.description && tattoo.description.toLowerCase().includes(lowerCaseQuery))
      )
      .sort((a, b) => {
        const artistA = artists.find(art => art.name === a.artistName);
        const artistB = artists.find(art => art.name === b.artistName);
        const aIsPremium = artistA ? isArtistPremium(artistA) : false;
        const bIsPremium = artistB ? isArtistPremium(artistB) : false;
        if (bIsPremium && !aIsPremium) return 1;
        if (!bIsPremium && aIsPremium) return -1;
        return 0;
      });
  }, [tattoos, artists, lowerCaseQuery]);

  const filteredEvents = useMemo(() => {
    return events
      .filter(event =>
        event.title.toLowerCase().includes(lowerCaseQuery) ||
        event.artistName.toLowerCase().includes(lowerCaseQuery) ||
        event.description.toLowerCase().includes(lowerCaseQuery)
      )
      .sort((a, b) => {
        const artistA = artists.find(art => art.name === a.artistName);
        const artistB = artists.find(art => art.name === b.artistName);
        const aIsPremium = artistA ? isArtistPremium(artistA) : false;
        const bIsPremium = artistB ? isArtistPremium(artistB) : false;
        if (bIsPremium && !aIsPremium) return 1;
        if (!bIsPremium && aIsPremium) return -1;
        return 0;
      });
  }, [events, artists, lowerCaseQuery]);

  const hasResults = filteredArtists.length > 0 || filteredTattoos.length > 0 || filteredEvents.length > 0;

  return (
    <div className="animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8 truncate">
          <span className="text-gray-400">"{query}"</span> 검색 결과
        </h1>
      </header>

      <div className="px-4 py-8 space-y-12">
        {hasResults ? (
          <>
            {filteredArtists.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">아티스트 ({filteredArtists.length})</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filteredArtists.map(artist => (
                    <div key={artist.id} onClick={() => onArtistClick(artist)} className="cursor-pointer">
                      <ArtistCard artist={artist} isLiked={likedArtists.has(artist.id)} onToggleLike={onToggleLikeArtist} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {filteredTattoos.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">타투 ({filteredTattoos.length})</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredTattoos.map(tattoo => (
                    <TattooCard key={tattoo.id} tattoo={tattoo} onClick={onTattooClick} />
                  ))}
                </div>
              </section>
            )}

            {filteredEvents.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">이벤트 ({filteredEvents.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.map(event => {
                    const artist = artists.find(a => a.name === event.artistName);
                    return (
                      <EventCard key={event.id} event={event} onClick={onEventClick} isPremium={artist ? isArtistPremium(artist) : false} />
                    );
                  })}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-gray-400 bg-gray-800 rounded-lg">
            <p className="text-lg">"{query}"에 대한 검색 결과가 없습니다.</p>
            <p className="text-sm mt-2">다른 검색어를 시도해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};
