import React from 'react';
import type { Event } from '../types';
import { CrownIcon } from '../constants';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
  isPremium?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick, isPremium }) => {
  const discountPercentage = Math.round(
    ((event.originalPrice - event.discountPrice) / event.originalPrice) * 100
  );

  return (
    <div 
      className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer bg-gray-800"
      onClick={() => onClick(event)}
    >
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3 left-3 bg-cyan-500 text-black text-xs font-bold px-2.5 py-1 rounded-full">
          {discountPercentage}% OFF
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate group-hover:text-cyan-400 transition-colors">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-2 flex items-center gap-1.5">
          {isPremium && <CrownIcon className="w-4 h-4 text-yellow-400" />}
          <span>{event.artistName}</span>
        </p>
        <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-cyan-400">₩{event.discountPrice.toLocaleString()}</p>
            <p className="text-sm text-gray-500 line-through">₩{event.originalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};