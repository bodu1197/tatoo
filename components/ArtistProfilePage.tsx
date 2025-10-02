import React, { useState } from 'react';
import type { Artist, Tattoo, Review, Event, User } from '../types';
import { isArtistPremium } from '../types';
import { StarIcon, ChevronLeftIcon, MapPinIcon, WhatsAppIcon, KakaoTalkIcon, ChatBubbleIcon, PlusCircleIcon, HeartIcon, SolidHeartIcon, ShareIcon } from '../constants';
import { TattooCard } from './TattooCard';
import { ReviewCard } from './ReviewCard';
import { EventCard } from './EventCard';
import { ShareModal } from './ShareModal';

interface ArtistProfilePageProps {
  artist: Artist;
  tattoos: Tattoo[];
  reviews: Review[];
  events: Event[];
  onBack: () => void;
  onTattooClick: (tattoo: Tattoo) => void;
  onEventClick: (event: Event) => void;
  onOpenCreateEventForm: () => void;
  currentUser: User | null;
  isLiked: boolean;
  onToggleLike: (artistId: number) => void;
}

type ProfileTab = 'INFO' | 'TATTOOS' | 'REVIEWS' | 'EVENTS';

export const ArtistProfilePage: React.FC<ArtistProfilePageProps> = ({ artist, tattoos, reviews, events, onBack, onTattooClick, onEventClick, onOpenCreateEventForm, currentUser, isLiked, onToggleLike }) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('INFO');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const isOwner = currentUser?.type === 'artist' && currentUser.email === artist.email;
  const isPremium = isArtistPremium(artist);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'INFO':
        const paragraphs = artist.bio ? artist.bio.split('\n').filter(p => p.trim() !== '') : [];
        const images = artist.infoImages || [];

        return (
          <section className="bg-gray-800 p-6 rounded-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-6">About {artist.name}</h3>
            <div className="space-y-4">
              {paragraphs.length > 0 || images.length > 0 ? (
                <>
                  {paragraphs.map((paragraph, index) => (
                    <div key={index}>
                      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{paragraph}</p>
                      {images[index] && (
                        <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                          <img 
                            src={images[index]} 
                            alt={`Info image ${index + 1}`} 
                            className="w-full h-auto object-cover" 
                            loading="lazy" decoding="async"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {images.length > paragraphs.length && (
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {images.slice(paragraphs.length).map((img, index) => (
                         <div key={`extra-${index}`} className="rounded-lg overflow-hidden shadow-lg">
                           <img
                             src={img}
                             alt={`Info gallery image ${index + paragraphs.length + 1}`}
                             className="w-full h-full object-cover aspect-square"
                             loading="lazy" decoding="async"
                           />
                         </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-400">The artist has not provided a biography yet.</p>
              )}
            </div>
          </section>
        );
      case 'TATTOOS':
        return (
          <section className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {tattoos.map(tattoo => (
                <TattooCard key={tattoo.id} tattoo={tattoo} onClick={onTattooClick} />
              ))}
            </div>
            {tattoos.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
                  View All Works
                </button>
              </div>
            )}
          </section>
        );
      case 'REVIEWS':
        return (
           <section className="animate-fade-in">
             {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
             ) : (
              <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-lg">
                <p>This artist doesn't have any reviews yet.</p>
              </div>
             )}
          </section>
        );
       case 'EVENTS':
        return (
           <section className="animate-fade-in">
             {isOwner && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={onOpenCreateEventForm}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                    새 이벤트 만들기
                  </button>
                </div>
              )}
             {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(event => (
                  <EventCard key={event.id} event={event} onClick={onEventClick} isPremium={isPremium} />
                ))}
              </div>
             ) : (
              <div className="text-center text-gray-400 bg-gray-800 p-8 rounded-lg">
                <p>This artist has no active events.</p>
              </div>
             )}
          </section>
        );
      default:
        return null;
    }
  }

  return (
    <div className="bg-gray-900">
      <header className="p-4 flex items-center absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent z-20">
        <button onClick={onBack} className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8 text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">{artist.name}'s Profile</h1>
      </header>

      {artist.coverImageUrl && (
        <div className="relative h-96 w-full">
          <img src={artist.coverImageUrl} alt={`${artist.name}'s cover photo`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      )}

      <div className="px-4 pb-8">
        <section className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 mb-8 -mt-20 relative z-10">
          <div className="w-32 h-32 rounded-full border-4 border-gray-900 bg-gray-800 shadow-lg flex-shrink-0 overflow-hidden">
            <img
              src={artist.avatarUrl}
              alt={artist.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex-grow w-full pt-16 sm:pt-4">
            <div className="flex items-center justify-center sm:justify-start gap-4 mb-1">
              <h2 className="text-4xl font-bold">{artist.name}</h2>
            </div>
            <p className="text-cyan-300 text-lg mb-2">{artist.specialty}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400 mb-4">
               <MapPinIcon className="w-5 h-5" />
               <span>{artist.location}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start text-yellow-400 mb-6">
              <StarIcon className="w-6 h-6" />
              <span className="ml-1.5 text-white font-bold text-lg">{artist.rating.toFixed(1)}</span>
              <span className="ml-2 text-gray-400 text-base">({artist.reviewCount} reviews)</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (!currentUser) {
                    alert('찜하기 기능은 로그인 후 이용 가능합니다.');
                    return;
                  }
                  onToggleLike(artist.id);
                }}
                className={`w-full sm:w-auto flex-1 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border ${
                  isLiked && currentUser
                    ? 'bg-red-900/30 text-red-400 border-red-700/50 hover:bg-red-900/50'
                    : 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600'
                }`}
              >
                {isLiked && currentUser ? <SolidHeartIcon className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                <span>{currentUser ? (isLiked ? '찜 취소' : '찜하기') : '로그인 후 찜하기'}</span>
              </button>
              <button onClick={() => setIsShareModalOpen(true)} className="w-full sm:w-auto flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-gray-600">
                <ShareIcon className="w-5 h-5" />
                <span>공유하기</span>
              </button>
            </div>
          </div>
        </section>

        <nav className="mb-8 border-b border-gray-700 flex">
            <TabButton label="Info" isActive={activeTab === 'INFO'} onClick={() => setActiveTab('INFO')} />
            <TabButton label="Tattoos" isActive={activeTab === 'TATTOOS'} onClick={() => setActiveTab('TATTOOS')} />
            <TabButton label="Reviews" isActive={activeTab === 'REVIEWS'} onClick={() => setActiveTab('REVIEWS')} />
            <TabButton label="Events" isActive={activeTab === 'EVENTS'} onClick={() => setActiveTab('EVENTS')} />
        </nav>

        {renderTabContent()}
      </div>
      
      {isShareModalOpen && (
        <ShareModal 
          onClose={() => setIsShareModalOpen(false)}
          shareUrl={window.location.href}
          shareTitle={`Check out ${artist.name} on InkSpot!`}
        />
      )}
    </div>
  );
};

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 font-semibold text-sm transition-colors focus:outline-none ${
                isActive
                    ? 'border-b-2 border-cyan-400 text-white'
                    : 'text-gray-400 hover:text-white'
            }`}
        >
            {label}
        </button>
    )
}