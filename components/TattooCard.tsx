import React from 'react';
import type { Tattoo } from '../types';

interface TattooCardProps {
  tattoo: Tattoo;
  onClick?: (tattoo: Tattoo) => void;
}

export const TattooCard: React.FC<TattooCardProps> = ({ tattoo, onClick }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer" onClick={() => onClick?.(tattoo)}>
      <img src={tattoo.imageUrl} alt={tattoo.style} className="w-full h-full object-cover aspect-[4/5] transition-transform duration-300 group-hover:scale-110" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden flex-shrink-0">
          <img src={tattoo.artistAvatarUrl} alt={tattoo.artistName} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{tattoo.artistName}</p>
          <p className="text-gray-300 text-xs">{tattoo.style}</p>
        </div>
      </div>
    </div>
  );
};