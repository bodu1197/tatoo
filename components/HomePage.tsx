import React, { useState, useRef, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { TattooCard } from './TattooCard';
import { ArtistCard } from './ArtistCard';
import { CategoryPill } from './CategoryPill';
import { ReviewCard } from './ReviewCard';
import { TATTOO_STYLES as CATEGORIES, REVIEWS, ChevronLeftIcon, ChevronRightIcon } from '../constants';
import type { Tattoo, Artist, ArtistUser, User } from '../types';

interface HomePageProps {
    tattoos: Tattoo[];
    artists: ArtistUser[];
    onTattooClick: (tattoo: Tattoo) => void;
    onArtistClick: (artist: Artist) => void;
    onSearchSubmit: (query: string) => void;
    currentUser: User | null;
    likedArtistsData: ArtistUser[];
    likedTattoosData: Tattoo[];
    likedArtists: Set<number>;
    onToggleLikeArtist: (artistId: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
    tattoos,
    artists,
    onTattooClick,
    onArtistClick,
    onSearchSubmit,
    currentUser,
    likedArtistsData,
    likedTattoosData,
    likedArtists,
    onToggleLikeArtist
}) => {
  const artistsScrollRef = useRef<HTMLDivElement>(null);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);
  const likedArtistsScrollRef = useRef<HTMLDivElement>(null);
  const likedTattoosScrollRef = useRef<HTMLDivElement>(null);

  const useScrollState = (ref: React.RefObject<HTMLDivElement>) => {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollability = () => {
        if (ref.current) {
            const { scrollLeft, scrollWidth, clientWidth } = ref.current;
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const observer = new ResizeObserver(checkScrollability);
        observer.observe(container);
        
        // Initial check
        setTimeout(checkScrollability, 100);

        return () => {
          if (container) {
            observer.unobserve(container);
          }
        };
    }, [ref]);

    return { ref, canScrollLeft, canScrollRight, checkScrollability };
  };
  
  const artistsScrollState = useScrollState(artistsScrollRef);
  const reviewsScrollState = useScrollState(reviewsScrollRef);
  const likedArtistsScrollState = useScrollState(likedArtistsScrollRef);
  const likedTattoosScrollState = useScrollState(likedTattoosScrollRef);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };
  
  // FIX: Replaced inline prop types with a defined interface to resolve TypeScript errors.
  interface CarouselProps {
    title: string;
    state: ReturnType<typeof useScrollState>;
    children: React.ReactNode;
    itemWidthClass: string;
  }
  
  const Carousel: React.FC<CarouselProps> = ({ title, state, children, itemWidthClass }) => (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="relative">
        <div 
          ref={state.ref} 
          onScroll={state.checkScrollability} 
          className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {React.Children.map(children, child => (
            <div className={`flex-shrink-0 ${itemWidthClass} snap-start`}>
              {child}
            </div>
          ))}
        </div>
        {state.canScrollLeft && (
          <button onClick={() => scroll(state.ref, 'left')} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/80 p-2 rounded-full hidden md:block transition-opacity" aria-label="Scroll left">
            <ChevronLeftIcon className="w-6 h-6 text-white"/>
          </button>
        )}
        {state.canScrollRight && (
          <button onClick={() => scroll(state.ref, 'right')} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-800/80 p-2 rounded-full hidden md:block transition-opacity" aria-label="Scroll right">
            <ChevronRightIcon className="w-6 h-6 text-white"/>
          </button>
        )}
      </div>
    </section>
  );

  return (
    <div className="px-4 py-8">
        <section className="text-center py-16 md:py-24 rounded-lg bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('https://picsum.photos/1200/400?random=1')"}}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-wider">Find Your Next Tattoo</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Explore thousands of designs and connect with the best artists.</p>
          <SearchBar onSearchSubmit={onSearchSubmit} artists={artists} tattoos={tattoos} />
        </section>
        
        {currentUser && likedArtistsData.length > 0 && (
          <Carousel title="내가 찜한 아티스트" state={likedArtistsScrollState} itemWidthClass="w-3/4 sm:w-[45%] md:w-1/3">
             {likedArtistsData.map(artist => (
                <div key={artist.id} onClick={() => onArtistClick(artist)} className="cursor-pointer">
                    <ArtistCard artist={artist} isLiked={likedArtists.has(artist.id)} onToggleLike={onToggleLikeArtist} />
                </div>
            ))}
          </Carousel>
        )}
        
        {currentUser && likedTattoosData.length > 0 && (
           <Carousel title="내가 찜한 작품" state={likedTattoosScrollState} itemWidthClass="w-1/2 sm:w-1/3 md:w-1/4">
             {likedTattoosData.map(tattoo => (
                <TattooCard key={tattoo.id} tattoo={tattoo} onClick={onTattooClick} />
            ))}
          </Carousel>
        )}

        <section id="trending" className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Trending Tattoos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {tattoos.slice(0, 8).map(tattoo => (
              <TattooCard key={tattoo.id} tattoo={tattoo} onClick={onTattooClick} />
            ))}
          </div>
        </section>

        <section id="categories" className="py-12 bg-gray-800 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Browse by Style</h2>
          <div className="flex flex-wrap justify-center items-center gap-3 px-4">
            {CATEGORIES.map(category => (
              <CategoryPill key={category} category={category} onClick={() => onSearchSubmit(category)} />
            ))}
          </div>
        </section>

        <Carousel title="Meet Top Artists" state={artistsScrollState} itemWidthClass="w-3/4 sm:w-[45%] md:w-1/3">
            {artists.map(artist => (
                <div key={artist.id} onClick={() => onArtistClick(artist)} className="cursor-pointer">
                  <ArtistCard artist={artist} isLiked={likedArtists.has(artist.id)} onToggleLike={currentUser ? onToggleLikeArtist : undefined} />
                </div>
            ))}
        </Carousel>

        <Carousel title="What Our Clients Say" state={reviewsScrollState} itemWidthClass="w-5/6 sm:w-2/3 md:w-1/2 lg:w-[31%]">
            {REVIEWS.map(review => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </Carousel>
    </div>
  );
};
