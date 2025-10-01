import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Artist, Tattoo } from '../types';

interface SearchBarProps {
  onSearchSubmit: (query: string) => void;
  artists: Artist[];
  tattoos: Tattoo[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchSubmit, artists, tattoos }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchKeywords = useMemo(() => {
    const keywordSet = new Set<string>();
    artists.forEach(artist => {
      keywordSet.add(artist.name.toLowerCase());
      keywordSet.add(artist.specialty.toLowerCase());
    });
    tattoos.forEach(tattoo => {
      keywordSet.add(tattoo.style.toLowerCase());
      tattoo.tags?.forEach(tag => keywordSet.add(tag.toLowerCase()));
    });
    return Array.from(keywordSet).sort();
  }, [artists, tattoos]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim()) {
      const filtered = searchKeywords.filter(k => k.includes(value.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      onSearchSubmit(query.trim());
      setInputValue('');
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch(suggestion);
  };
  
  return (
    <div className="max-w-xl mx-auto px-4" ref={searchRef}>
      <div className="relative">
        <input
          type="search"
          placeholder="Search styles, artists, or body parts..."
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-600 rounded-full py-3 pr-12 pl-5 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
        />
        <button
          onClick={() => handleSearch(inputValue)}
          className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-400 hover:text-white"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-gray-800 border border-gray-600 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg text-left">
            {suggestions.map(suggestion => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer text-white hover:bg-cyan-500 hover:text-black transition-colors capitalize"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};