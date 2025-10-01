
import React from 'react';
import type { Artist } from '../types';
import { isArtistPremium } from '../types';
import { StarIcon, CrownIcon, HeartIcon, SolidHeartIcon } from '../constants';

interface ArtistCardProps {
  artist: Artist;
  isLiked?: boolean;
  onToggleLike?: (artistId: number) => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist, isLiked, onToggleLike }) => {
  const isPremium = isArtistPremium(artist);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike?.(artist.id);
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg text-center flex flex-col items-center transition-transform hover:scale-105 hover:bg-gray-700 h-full relative">
      <div className="relative w-full">
        {onToggleLike && (
          <button
            onClick={handleLikeClick}
            className={`absolute top-0 right-0 p-2 z-10 transition-colors ${isLiked ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-white'}`}
            aria-label={isLiked ? 'Unlike artist' : 'Like artist'}
          >
            {isLiked ? <SolidHeartIcon className="w-6 h-6" /> : <HeartIcon className="w-6 h-6" />}
          </button>
        )}
      </div>

      <div className="relative">
        <div className="w-24 h-24 rounded-full mb-4 border-4 border-gray-700 group-hover:border-cyan-400 overflow-hidden">
             <img src={artist.avatarUrl} alt={artist.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
        {isPremium && (
          <div className="absolute -top-1 -right-1 bg-yellow-400 p-1.5 rounded-full border-2 border-gray-800">
            <CrownIcon className="w-4 h-4 text-black" />
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-white">{artist.name}</h3>
      <p className="text-cyan-400 text-sm mb-2">{artist.specialty}</p>
      <p className="text-gray-400 text-xs mb-3">{artist.location}</p>
      <div className="flex items-center text-yellow-400 mt-auto">
        <StarIcon className="w-5 h-5" />
        <span className="ml-1 text-white font-bold">{artist.rating.toFixed(1)}</span>
        <span className="ml-2 text-gray-400 text-sm">({artist.reviewCount} reviews)</span>
      </div>
    </div>
  );
};