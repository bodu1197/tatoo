import React from 'react';
import type { ArtistUser, Event, Tattoo } from '../types';
import { PencilSquareIcon, PlusCircleIcon, StarIcon, TattooIcon, TrashIcon, EyeIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon, CrownIcon } from '../constants';
import { ArtistCard } from './ArtistCard';
import { TattooCard } from './TattooCard';

interface ArtistDashboardPageProps {
  artist: ArtistUser;
  stats: {
    events: number;
    reviews: number;
    tattoos: number;
  };
  events: Event[];
  likedArtists: ArtistUser[];
  likedTattoos: Tattoo[];
  onLogout: () => void;
  onCreateEvent: () => void;
  onUploadTattoo: () => void;
  onViewProfile: () => void;
  onEditProfile: () => void;
  onShowChats: () => void;
  onManagePlan: () => void;
  onArtistClick: (artist: ArtistUser) => void;
  onTattooClick: (tattoo: Tattoo) => void;
}

const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
  <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
    <div className="bg-gray-700 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export const ArtistDashboardPage: React.FC<ArtistDashboardPageProps> = ({
  artist,
  stats,
  events,
  likedArtists,
  likedTattoos,
  onLogout,
  onCreateEvent,
  onUploadTattoo,
  onViewProfile,
  onEditProfile,
  onShowChats,
  onManagePlan,
  onArtistClick,
  onTattooClick,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };
  
  const formatFullDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="animate-fade-in">
      <header className="p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 text-center">
        <h1 className="text-xl font-bold">아티스트 대시보드</h1>
      </header>

      <div className="px-4 py-8 space-y-8">
        <section className="text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-400 overflow-hidden">
            <img
              src={artist.avatarUrl}
              alt={artist.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h2 className="text-2xl font-bold">환영합니다, {artist.name}님!</h2>
          <p className="text-gray-400">{artist.email}</p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="평균 평점" value={artist.rating.toFixed(1)} icon={<StarIcon className="w-6 h-6 text-yellow-400" />} />
          <StatCard title="총 리뷰 수" value={stats.reviews} icon={<ChatBubbleLeftRightIcon className="w-6 h-6 text-cyan-400" />} />
          <StatCard title="내 작업물" value={stats.tattoos} icon={<TattooIcon className="w-6 h-6 text-pink-400" />} />
        </section>
        
        {/* Ad & Plan Management */}
        <section className="p-4 bg-gray-800 rounded-lg">
           <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CrownIcon className="w-6 h-6 text-yellow-400" />
            <span>광고 및 플랜 관리</span>
           </h3>
           <div className="bg-gray-700 p-4 rounded-md">
             {artist.subscription.tier === 'PREMIUM' ? (
                <div>
                    <p className="text-lg">현재 플랜: <span className="font-bold text-cyan-400">PREMIUM</span></p>
                    <p className="text-sm text-gray-400">만료일: {formatFullDate(artist.subscription.expiryDate)}</p>
                </div>
             ) : (
                <p className="text-lg">현재 플랜: <span className="font-bold text-gray-400">FREE</span></p>
             )}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button onClick={onManagePlan} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                    {artist.subscription.tier === 'PREMIUM' ? '플랜 연장하기' : '플랜 업그레이드'}
                </button>
                 <button onClick={onManagePlan} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                    플랜 옵션 보기
                </button>
            </div>
           </div>
        </section>

        {/* Account Management */}
        <section className="p-4 bg-gray-800 rounded-lg">
           <h3 className="text-lg font-bold mb-4">계정 관리</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <button onClick={onEditProfile} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Cog6ToothIcon className="w-5 h-5" />
                <span>프로필 수정</span>
             </button>
             <button onClick={onShowChats} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span>채팅 기록</span>
             </button>
           </div>
        </section>

        {/* Actions */}
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={onUploadTattoo}
            className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <TattooIcon className="w-6 h-6" />
            작품 업로드
          </button>
          <button
            onClick={onCreateEvent}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircleIcon className="w-6 h-6" />
            이벤트 만들기
          </button>
          <button
            onClick={onViewProfile}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 col-span-2 lg:col-span-1"
          >
            <EyeIcon className="w-6 h-6" />
            내 프로필 보기
          </button>
        </section>
        
        {/* Manage Events */}
        <section>
            <h3 className="text-xl font-bold mb-4">이벤트 관리</h3>
            {events.length > 0 ? (
                <div className="space-y-3 bg-gray-800 p-4 rounded-lg">
                    {events.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-2 bg-gray-700 rounded-md">
                        <div>
                          <p className="font-semibold text-white">{event.title}</p>
                          <p className="text-xs text-gray-400">기간: {formatDate(event.startDate)} ~ {formatDate(event.endDate)}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-300 hover:text-white transition-colors"><PencilSquareIcon className="w-5 h-5"/></button>
                          <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><TrashIcon className="w-5 h-5"/></button>
                        </div>
                      </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-lg">
                    <p>아직 등록된 이벤트가 없습니다.</p>
                    <p className="text-sm mt-2">'새 이벤트 만들기'를 눌러 첫 이벤트를 등록해보세요!</p>
                </div>
            )}
        </section>
        
        <section>
          <h3 className="text-xl font-bold mb-4">찜한 목록</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-3">찜한 아티스트 ({likedArtists.length})</h4>
              {likedArtists.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {likedArtists.map(likedArtist => (
                    <div key={likedArtist.id} onClick={() => onArtistClick(likedArtist)} className="cursor-pointer">
                      <ArtistCard artist={likedArtist} />
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

        {/* Logout */}
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