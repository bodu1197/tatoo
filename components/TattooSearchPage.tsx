import React, { useState, useMemo, useEffect } from 'react';
import { TATTOO_STYLES, PMU_STYLES, KOREA_LOCATIONS } from '../constants';
import type { Tattoo, Artist } from '../types';
import { isArtistPremium } from '../types';
import { TattooCard } from './TattooCard';

interface TattooSearchPageProps {
    tattoos: Tattoo[];
    artists: Artist[];
    onTattooClick: (tattoo: Tattoo) => void;
}

export const TattooSearchPage: React.FC<TattooSearchPageProps> = ({ tattoos, artists, onTattooClick }) => {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [selectedStyle, setSelectedStyle] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('popularity');
    const [artistTypeFilter, setArtistTypeFilter] = useState<'TATTOO' | 'PMU'>('TATTOO');

    useEffect(() => {
        setSelectedStyle('All');
    }, [artistTypeFilter]);

    const premiumArtistNames = useMemo(() => {
        return new Set(artists.filter(isArtistPremium).map(a => a.name));
    }, [artists]);

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvince(e.target.value);
        setDistrict('');
    };

    const currentStyles = artistTypeFilter === 'TATTOO' ? TATTOO_STYLES : PMU_STYLES;

    const filteredTattoos = useMemo(() => {
        const artistsInLocation = artists.filter(artist => {
            if (!province) return true;
            const locationParts = artist.location.split(' ');
            const artistProvince = locationParts[0];
            const artistDistrict = locationParts.length > 1 ? locationParts.slice(1).join(' ') : '';
            const provinceMatch = artistProvince === province;
            if (!district) return provinceMatch;
            return provinceMatch && artistDistrict === district;
        });
        const artistNamesInLocation = new Set(artistsInLocation.map(a => a.name));

        let filtered = tattoos.filter(tattoo => 
            artistNamesInLocation.has(tattoo.artistName) && tattoo.artistType === artistTypeFilter
        );

        if (selectedStyle !== 'All') {
            filtered = filtered.filter(tattoo => tattoo.style === selectedStyle);
        }

        const sortedTattoos = [...filtered];
        
        // Primary sort by premium status
        sortedTattoos.sort((a, b) => {
            const aIsPremium = premiumArtistNames.has(a.artistName);
            const bIsPremium = premiumArtistNames.has(b.artistName);
            if (bIsPremium && !aIsPremium) return 1;
            if (!bIsPremium && aIsPremium) return -1;

            // Secondary sort based on user selection
            if (sortBy === 'artist-asc') {
                return a.artistName.localeCompare(b.artistName);
            }
            if (sortBy === 'artist-desc') {
                return b.artistName.localeCompare(a.artistName);
            }
            // Default to popularity (or keep original order if no specific logic)
            return 0;
        });

        return sortedTattoos;
    }, [province, district, selectedStyle, sortBy, artistTypeFilter, tattoos, artists, premiumArtistNames]);

    return (
        <div className="animate-fade-in">
            <header className="p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 text-center">
                <h1 className="text-xl font-bold">작품 검색</h1>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="province-filter-tattoo" className="block text-sm font-medium text-gray-300 mb-1">아티스트 지역 (시/도)</label>
                            <select
                                id="province-filter-tattoo"
                                value={province}
                                onChange={handleProvinceChange}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="">전체</option>
                                {Object.keys(KOREA_LOCATIONS).map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div>
                             <label htmlFor="district-filter-tattoo" className="block text-sm font-medium text-gray-300 mb-1">아티스트 지역 (시/군/구)</label>
                            <select
                                id="district-filter-tattoo"
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

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                             <label htmlFor="style-filter-tattoo" className="block text-sm font-medium text-gray-300 mb-1">스타일</label>
                            <select
                                id="style-filter-tattoo"
                                value={selectedStyle}
                                onChange={(e) => setSelectedStyle(e.target.value)}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="All">All Styles</option>
                                {currentStyles.map(category => (
                                <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sort-by-tattoo" className="block text-sm font-medium text-gray-300 mb-1">정렬</label>
                            <select
                                id="sort-by-tattoo"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="popularity">인기순</option>
                                <option value="artist-asc">아티스트 이름 (오름차순)</option>
                                <option value="artist-desc">아티스트 이름 (내림차순)</option>
                            </select>
                        </div>
                     </div>
                </div>

                 {filteredTattoos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {filteredTattoos.map(tattoo => (
                        <TattooCard key={tattoo.id} tattoo={tattoo} onClick={onTattooClick} />
                        ))}
                    </div>
                 ) : (
                    <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-lg">
                        <p>해당 조건에 맞는 작품이 없습니다.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};
