import React from 'react';
import type { Artist } from '../../types';

export const ArtistApprovalPage = ({ artists, onApprove, onReject }) => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">아티스트 가입 승인</h1>
      
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          {artists.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">아티스트</th>
                  <th scope="col" className="px-6 py-3">전문 분야</th>
                  <th scope="col" className="px-6 py-3">지역</th>
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
                    <td className="px-6 py-4">{artist.specialty}</td>
                    <td className="px-6 py-4">{artist.location}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => onApprove(artist.id)} className="font-medium text-green-400 hover:underline bg-green-900/50 px-3 py-1 rounded-md">승인</button>
                        <button onClick={() => onReject(artist.id)} className="font-medium text-red-400 hover:underline bg-red-900/50 px-3 py-1 rounded-md">거절</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p>승인 대기 중인 아티스트가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};