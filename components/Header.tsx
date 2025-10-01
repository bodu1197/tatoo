
import React from 'react';
import { TattooIcon } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-2xl font-bold text-white">
          <TattooIcon className="w-8 h-8 text-cyan-400" />
          <span className="font-serif">InkSpot</span>
        </a>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
          <a href="#trending" className="hover:text-white transition-colors">Trending</a>
          <a href="#categories" className="hover:text-white transition-colors">Styles</a>
          <a href="#artists" className="hover:text-white transition-colors">Artists</a>
          <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
        </div>
        <a href="#ai-generator" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-full transition-colors text-sm">
          AI Idea Generator
        </a>
      </nav>
    </header>
  );
};
