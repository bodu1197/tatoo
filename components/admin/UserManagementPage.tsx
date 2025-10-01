import React from 'react';
import type { User } from '../../types';
import { isArtistPremium } from '../../types';

export const UserManagementPage = ({ users }) => {
  
  const getStatusChip = (user) => {
    if (user.type !== 'artist') return null;
    switch(user.status) {
      case 'active': return <span className="bg-green-900 text-green-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Active</span>;
      case 'pending': return <span className="bg-yellow-900 text-yellow-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Pending</span>;
      case 'rejected': return <span className="bg-red-900 text-red-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Rejected</span>;
      default: return null;
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">사용자 관리</h1>
      
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">이름</th>
                <th scope="col" className="px-6 py-3">이메일</th>
                <th scope="col" className="px-6 py-3">유형</th>
                <th scope="col" className="px-6 py-3">상태</th>
                <th scope="col" className="px-6 py-3">플랜</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id || user.email} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.type}</td>
                  <td className="px-6 py-4">{getStatusChip(user)}</td>
                  <td className="px-6 py-4">
                    {user.type === 'artist' && isArtistPremium(user) ? 
                      <span className="text-yellow-400 font-semibold">Premium</span> : 
                      (user.type === 'artist' ? 'Free' : 'N/A')}
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
