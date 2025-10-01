import React from 'react';
import type { GeneralUser, ArtistUser, Tattoo } from '../types';
import { Cog6ToothIcon, ChatBubbleLeftRightIcon } from '../constants';
import { ArtistCard } from './ArtistCard';
import { TattooCard } from './TattooCard';

interface GeneralUserDashboardPageProps {
  user: GeneralUser;
  likedArtists: ArtistUser[];
  likedTattoos: Tattoo[];
  onLogout: () => void;
  onEditProfile: () => void;
  onShowChats: () => void;
  onArtistClick: (artist: ArtistUser) => void;
  onTattooClick: (tattoo: Tattoo) => void;
}

export const GeneralUserDashboardPage: React.FC<GeneralUserDashboardPageProps> = ({
  user,
  likedArtists,
  likedTattoos,
  onLogout,
  onEditProfile,
  onShowChats,
  onArtistClick,
  onTattooClick,
}) => {
  return (
    <div className="animate-fade-in">
      <header className="p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 text-center">
        <h1 className="text-xl font-bold">마이 페이지</h1>
      </header>

      <div className="px-4 py-8 space-y-8">
        <section className="text-center">
          <h2 className="text-2xl font-bold">환영합니다, {user.name}님!</h2>
          <p className="text-gray-400">{user.email}</p>
        </section>

        <section className="p-4 bg-gray-800 rounded-lg">
           <h3 className="text-lg font-bold mb-4">계정 관리</h3>
           <div className="space-y-3">
             <button
                onClick={onEditProfile}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
             >
                <Cog6ToothIcon className="w-5 h-5" />
                <span>프로필 수정</span>
             </button>
             <button
                onClick={onShowChats}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
             >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span>채팅 기록</span>
             </button>
           </div>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4">찜한 목록</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">찜한 아티스트 ({likedArtists.length})</h4>
              {likedArtists.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {likedArtists.map(artist => (
                    <div key={artist.id} onClick={() => onArtistClick(artist)} className="cursor-pointer">
                      <ArtistCard artist={artist} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">찜한 아티스트가 없습니다.</p>
              )}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">찜한 작품 ({likedTattoos.length})</h4>
              {likedTattoos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {likedTattoos.map(tattoo => (
                     <TattooCard key={tattoo.id} tattoo={tattoo} onClick={onTattooClick} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">찜한 작품이 없습니다.</p>
              )}
            </div>
          </div>
        </section>

        <div className="mt-12 text-center">
            <button
                onClick={onLogout}
                className="w-full max-w-xs bg-red-800/50 hover:bg-red-700/50 text-red-300 border border-red-700/50 font-bold py-3 px-4 rounded-lg transition-colors"
            >
                로그아웃
            </button>
        </div>
      </div>
    </div>
  );
};
