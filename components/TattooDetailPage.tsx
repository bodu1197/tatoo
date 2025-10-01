import React, { useEffect, useState, useRef } from 'react';
import type { Tattoo, Artist, User, Review } from '../types';
import { ChevronLeftIcon, HeartIcon, ShareIcon, XMarkIcon, StarIcon, PaperAirplaneIcon, SolidHeartIcon, PhotoIcon } from '../constants';
import { TattooCard } from './TattooCard';
import { ShareModal } from './ShareModal';
import { compressImage, fileToDataUrl } from '../services/imageCompressor';

interface ImageViewerProps {
  src: string;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, onClose }) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = scale - e.deltaY * 0.001;
    // Clamp scale between 1x and 5x
    setScale(Math.min(Math.max(1, newScale), 5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPanning(true);
    setStartPoint({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    e.preventDefault();
    setOffset({
      x: e.clientX - startPoint.x,
      y: e.clientY - startPoint.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
  };

  const handleDoubleClick = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white bg-black/50 rounded-full hover:bg-black/80 transition-colors z-20"
        aria-label="Close image viewer"
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
      <div
        className={`w-full h-full flex items-center justify-center p-4 ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <img
          ref={imageRef}
          src={src}
          alt="Zoomable tattoo"
          className="max-w-full max-h-full object-contain transition-transform duration-100 ease-out"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
          draggable="false"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};


interface TattooDetailPageProps {
  tattoo: Tattoo;
  artist: Artist;
  otherTattoos: Tattoo[];
  reviews: Review[];
  onBack: () => void;
  onTattooClick: (tattoo: Tattoo) => void;
  onArtistClick: (artist: Artist) => void;
  onReviewSubmit: (tattooId: number, rating: number, comment: string, reviewImageDataUrl: string | null) => void;
  currentUser: User | null;
  likedTattoos: Set<number>;
  onToggleLike: (tattooId: number) => void;
}

export const TattooDetailPage: React.FC<TattooDetailPageProps> = ({ tattoo, artist, onBack, otherTattoos, onTattooClick, onArtistClick, reviews, onReviewSubmit, currentUser, likedTattoos, onToggleLike }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tattoo.id]);

  const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        try {
          const compressedBlob = await compressImage(file);
          const compressedFile = new File([compressedBlob], file.name, { type: 'image/webp' });
          setImageFile(compressedFile);
          if (imagePreview) URL.revokeObjectURL(imagePreview);
          setImagePreview(URL.createObjectURL(compressedFile));
        } catch (error) {
          console.error("Error compressing review image:", error);
          alert("Failed to process image.");
        }
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (rating === 0 || comment.trim() === '') {
        alert('별점과 리뷰 내용을 모두 입력해주세요.');
        return;
      }
      const reviewImageDataUrl = imageFile ? await fileToDataUrl(imageFile) : null;
      onReviewSubmit(tattoo.id, rating, comment, reviewImageDataUrl);
      setRating(0);
      setComment('');
      setImageFile(null);
      setImagePreview(null);
    };
    
    return (
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg space-y-4">
        <h4 className="text-lg font-bold">리뷰 작성하기</h4>
        <div>
            <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
                aria-label={`Rate ${star} star`}
                >
                <StarIcon
                    className={`w-7 h-7 cursor-pointer transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'
                    }`}
                />
                </button>
            ))}
            </div>
        </div>
        
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="이 타투에 대한 당신의 경험을 공유해주세요..."
          rows={4}
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Review comment"
        />

        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">사진 첨부 (선택 사항)</label>
            {imagePreview && (
                <div className="my-2 relative w-32 h-32">
                    <img src={imagePreview} alt="Review Preview" className="w-full h-full object-cover rounded-lg" />
                    <button type="button" onClick={() => { setImageFile(null); if(imagePreview) URL.revokeObjectURL(imagePreview); setImagePreview(null); }} className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5 text-white">
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>
            )}
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <PhotoIcon className="mx-auto h-10 w-10 text-gray-500" />
                    <div className="flex text-sm text-gray-400">
                        <label htmlFor="reviewImageFile" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none">
                            <span>사진 업로드</span>
                            <input id="reviewImageFile" name="reviewImageFile" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                        </label>
                    </div>
                    <p className="text-xs text-gray-500">시술 후 사진을 공유해보세요</p>
                </div>
            </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
          리뷰 제출하기
        </button>
      </form>
    );
  };

  const hasUserReviewed = currentUser ? reviews.some(r => r.userName === currentUser.name) : false;
  const isLiked = likedTattoos.has(tattoo.id);

  return (
    <div className="animate-fade-in">
      {/* Back Button Header */}
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8">Tattoo Details</h1>
      </header>

      <div>
        {/* Tattoo Image */}
        <div className="relative">
          <img
            src={tattoo.imageUrl}
            alt={`Tattoo in ${tattoo.style} style by ${tattoo.artistName}`}
            className="w-full h-auto object-cover aspect-square cursor-zoom-in"
            onClick={() => setIsViewerOpen(true)}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
        

        <div className="px-4 py-6">
          {/* Artist Info & Actions */}
          <section className="flex justify-between items-center mb-6">
            <button onClick={() => onArtistClick(artist)} className="flex items-center gap-4 group text-left">
              <div className="w-14 h-14 rounded-full border-2 border-cyan-400 group-hover:border-cyan-300 transition-colors overflow-hidden flex-shrink-0">
                <img
                  src={artist.avatarUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{artist.name}</h2>
                <p className="text-gray-400">{tattoo.style}</p>
                <p className="text-xs text-cyan-400 mt-1 font-semibold">아티스트 프로필 보기 →</p>
              </div>
            </button>
            <div className="flex items-center gap-4">
              <button onClick={() => onToggleLike(tattoo.id)} className={`p-2 transition-colors ${isLiked ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-white'}`} aria-label={isLiked ? 'Unlike tattoo' : 'Like tattoo'}>
                {isLiked ? <SolidHeartIcon className="w-6 h-6" /> : <HeartIcon className="w-6 h-6" />}
              </button>
              <button onClick={() => setIsShareModalOpen(true)} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Share tattoo">
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </section>

          {/* Description */}
          {tattoo.description && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">About this piece</h3>
              <p className="text-gray-400 leading-relaxed">{tattoo.description}</p>
            </section>
          )}

          {/* Tags */}
          {tattoo.tags && tattoo.tags.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tattoo.tags.map((tag) => (
                  <span key={tag} className="bg-gray-700 text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}
          
          {/* Reviews Section */}
          <section className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-2xl font-bold mb-6">Reviews for this piece</h3>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full mr-3 overflow-hidden flex-shrink-0">
                        <img src={review.userAvatarUrl} alt={review.userName} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      </div>
                      <div>
                        <p className="font-semibold">{review.userName}</p>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm italic">"{review.comment}"</p>
                    <img src={review.tattooImageUrl} alt="User review tattoo" className="rounded-md mt-4 object-cover aspect-video" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center bg-gray-800 p-6 rounded-lg">No reviews for this tattoo yet. Be the first!</p>
            )}

            {/* Review Form */}
            <div className="mt-8">
              {currentUser ? (
                hasUserReviewed ? (
                  <p className="text-center text-cyan-400 bg-gray-800 p-4 rounded-lg">이미 이 작품에 대한 리뷰를 작성하셨습니다. 감사합니다!</p>
                ) : (
                  <ReviewForm />
                )
              ) : (
                <p className="text-center text-gray-400 bg-gray-800 p-4 rounded-lg">
                  리뷰를 작성하려면 로그인해주세요.
                </p>
              )}
            </div>
          </section>
        </div>
        
        {/* More from this artist */}
        {otherTattoos.length > 0 && (
            <section className="bg-gray-800 py-8 px-4 mt-8">
                <h3 className="text-2xl font-bold mb-6">More from {artist.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {otherTattoos.map((t) => (
                    <TattooCard key={t.id} tattoo={t} onClick={onTattooClick} />
                ))}
                </div>
            </section>
        )}
      </div>
      
      {isViewerOpen && (
        <ImageViewer src={tattoo.imageUrl} onClose={() => setIsViewerOpen(false)} />
      )}

      {isShareModalOpen && (
        <ShareModal 
            onClose={() => setIsShareModalOpen(false)}
            shareUrl={window.location.href}
            shareTitle={`Check out this ${tattoo.style} tattoo by ${artist.name}!`}
            shareImage={tattoo.imageUrl}
        />
      )}
    </div>
  );
};
