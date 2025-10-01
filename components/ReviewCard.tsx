import React from 'react';
import type { Review } from '../types';
import { StarIcon } from '../constants';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
          <img src={review.userAvatarUrl} alt={review.userName} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
        <div>
          <h4 className="font-bold text-white">{review.userName}</h4>
          <p className="text-sm text-gray-400">Review for {review.artistName}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
        ))}
      </div>
      <p className="text-gray-300 mb-4 text-sm italic">"{review.comment}"</p>
      <img src={review.tattooImageUrl} alt="Tattoo" className="rounded-md mt-auto object-cover aspect-video" loading="lazy" decoding="async" />
    </div>
  );
};