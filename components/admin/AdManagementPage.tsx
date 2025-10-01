
import React from 'react';
import type { ArtistUser } from '../../types';
import { isArtistPremium } from '../../types';

interface AdManagementPageProps {
    artists: ArtistUser[];
    onSetSubscription: (artistId: number, days: number | null) => void;
}

export const AdManagementPage: React.FC<AdManagementPageProps> = ({ artists, onSetSubscription }) => {
    const formatExpiryDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('ko-KR');
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">광고 관리</h1>
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">아티스트</th>
                                <th scope="col" className="px-6 py-3">현재 플랜</th>
                                <th scope="col" className="px-6 py-3">만료일</th>
                                <th scope="col" className="px-6 py-3 text-center">작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artists.map(artist => (
                                <tr key={artist.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                              <img src={artist.avatarUrl} alt={artist.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                                            </div>
                                            <div>
                                                <p>{artist.name}</p>
                                                <p className="text-xs text-gray-500">{artist.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {isArtistPremium(artist) ?
                                            <span className="text-yellow-400 font-semibold">Premium</span> :
                                            'Free'
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatExpiryDate(artist.subscription.expiryDate)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center items-center gap-2 flex-wrap">
                                            <button onClick={() => onSetSubscription(artist.id, 7)} className="text-xs bg-cyan-800 hover:bg-cyan-700 text-cyan-300 font-semibold py-1 px-2 rounded">7일 부여</button>
                                            <button onClick={() => onSetSubscription(artist.id, 30)} className="text-xs bg-cyan-800 hover:bg-cyan-700 text-cyan-300 font-semibold py-1 px-2 rounded">30일 부여</button>
                                            <button onClick={() => onSetSubscription(artist.id, 365)} className="text-xs bg-cyan-800 hover:bg-cyan-700 text-cyan-300 font-semibold py-1 px-2 rounded">1년 부여</button>
                                            <button onClick={() => onSetSubscription(artist.id, null)} className="text-xs bg-gray-600 hover:bg-gray-500 text-gray-300 font-semibold py-1 px-2 rounded">무료로 전환</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};