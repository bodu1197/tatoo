import React, { useState, useMemo, useRef, useEffect } from 'react';
import { KOREA_LOCATIONS } from '../constants';
import type { Artist } from '../types';
import { isArtistPremium } from '../types';
import { ArtistCard } from './ArtistCard';

interface ArtistSearchPageProps {
    artists: Artist[];
    onArtistClick: (artist: Artist) => void;
    likedArtists: Set<number>;
    onToggleLikeArtist: (artistId: number) => void;
}

export const ArtistSearchPage: React.FC<ArtistSearchPageProps> = ({ artists, onArtistClick, likedArtists, onToggleLikeArtist }) => {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Artist[]>([]);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const [artistTypeFilter, setArtistTypeFilter] = useState<'TATTOO' | 'PMU'>('TATTOO');
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvince(e.target.value);
        setDistrict(''); // Reset district when province changes
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length > 0) {
            const filtered = artists.filter(artist =>
                artist.name.toLowerCase().includes(query.toLowerCase()) && artist.artistType === artistTypeFilter
            );
            setSuggestions(filtered);
            setIsSuggestionsOpen(true);
        } else {
            setSuggestions([]);
            setIsSuggestionsOpen(false);
        }
    };

    const handleSuggestionClick = (artistName: string) => {
        setSearchQuery(artistName);
        setIsSuggestionsOpen(false);
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSuggestionsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredArtists = useMemo(() => {
        const filtered = artists.filter(artist => {
            const locationParts = artist.location.split(' ');
            const artistProvince = locationParts[0];
            const artistDistrict = locationParts.length > 1 ? locationParts.slice(1).join(' ') : '';
            
            const typeMatch = artist.artistType === artistTypeFilter;
            const provinceMatch = !province || artistProvince === province;
            const districtMatch = !district || artistDistrict === district;
            const nameMatch = !searchQuery || artist.name.toLowerCase().includes(searchQuery.toLowerCase());

            return typeMatch && provinceMatch && districtMatch && nameMatch;
        });

        // Sort by premium status first
        return filtered.sort((a, b) => {
            const aIsPremium = isArtistPremium(a);
            const bIsPremium = isArtistPremium(b);
            if (bIsPremium && !aIsPremium) return 1;
            if (!bIsPremium && aIsPremium) return -1;
            return a.name.localeCompare(b.name); // Secondary sort
        });
        
    }, [province, district, searchQuery, artistTypeFilter, artists]);

    return (
        <div className="animate-fade-in">
            <header className="p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 text-center">
                <h1 className="text-xl font-bold">아티스트 검색</h1>
            </header>

            <div className="px-4 py-8">
                 <div className="mb-6 flex border-b border-gray-700">
                    <button
                        onClick={() => setArtistTypeFilter('TATTOO')}
                        className={`px-6 py-3 font-semibold text-sm transition-colors focus:outline-none ${artistTypeFilter === 'TATTOO' ? 'border-b-2 border-cyan-400 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        타투
                    </button>
                    <button
                        onClick={() => setArtistTypeFilter('PMU')}
                        className={`px-6 py-3 font-semibold text-sm transition-colors focus:outline-none ${artistTypeFilter === 'PMU' ? 'border-b-2 border-cyan-400 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        반영구
                    </button>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg mb-8 space-y-4">
                    {/* Location Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="province-filter" className="block text-sm font-medium text-gray-300 mb-1">시/도</label>
                            <select
                                id="province-filter"
                                value={province}
                                onChange={handleProvinceChange}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="">전체</option>
                                {Object.keys(KOREA_LOCATIONS).map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div>
                             <label htmlFor="district-filter" className="block text-sm font-medium text-gray-300 mb-1">시/군/구</label>
                            <select
                                id="district-filter"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                disabled={!province}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                <option value="">전체</option>
                                {province && KOREA_LOCATIONS[province] && KOREA_LOCATIONS[province].map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>
                    {/* Search by name */}
                    <div ref={searchContainerRef}>
                        <label htmlFor="artist-search" className="block text-sm font-medium text-gray-300 mb-1">아티스트 이름</label>
                        <div className="relative">
                           <input
                            type="text"
                            id="artist-search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="이름으로 검색..."
                            autoComplete="off"
                            className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                            {isSuggestionsOpen && suggestions.length > 0 && (
                                <ul className="absolute z-20 w-full bg-gray-700 border border-gray-600 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                                    {suggestions.map(artist => (
                                        <li
                                            key={artist.id}
                                            onClick={() => handleSuggestionClick(artist.name)}
                                            className="px-4 py-2 cursor-pointer hover:bg-cyan-500 hover:text-black transition-colors"
                                        >
                                            {artist.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Artist List */}
                {filteredArtists.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {filteredArtists.map(artist => (
                            <div key={artist.id} onClick={() => onArtistClick(artist)} className="cursor-pointer">
                                <ArtistCard artist={artist} isLiked={likedArtists.has(artist.id)} onToggleLike={onToggleLikeArtist} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-lg">
                        <p>해당 조건에 맞는 아티스트가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
