import React, { useState } from 'react';
import { XMarkIcon, LinkIcon, FacebookIcon, TwitterIcon, PinterestIcon } from '../constants';

interface ShareModalProps {
    onClose: () => void;
    shareUrl: string;
    shareTitle: string;
    shareImage?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ onClose, shareUrl, shareTitle, shareImage }) => {
    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setIsLinkCopied(true);
            setTimeout(() => setIsLinkCopied(false), 2000);
        });
    };

    const handleSocialShare = (platform: 'facebook' | 'twitter' | 'pinterest') => {
        const url = encodeURIComponent(shareUrl);
        const text = encodeURIComponent(shareTitle);
        const imageUrl = shareImage ? encodeURIComponent(shareImage) : '';
        let newWindowUrl = '';

        switch (platform) {
            case 'facebook':
                newWindowUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                newWindowUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'pinterest':
                 if (imageUrl) {
                    newWindowUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${imageUrl}&description=${text}`;
                } else {
                    alert('An image is required to share on Pinterest.');
                    return;
                }
                break;
        }

        window.open(newWindowUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md text-center p-8 border border-gray-700 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white bg-black/50 rounded-full hover:bg-black/80 transition-colors z-20" aria-label="Close share options">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                
                <h2 className="text-2xl font-bold mb-2">공유하기</h2>
                <p className="text-gray-400 mb-6">이 콘텐츠를 친구들과 공유해보세요.</p>
                
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleSocialShare('facebook')} className="w-full bg-[#1877F2] hover:bg-[#166bda] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <FacebookIcon className="w-6 h-6" />
                        <span>Facebook</span>
                    </button>
                    <button onClick={() => handleSocialShare('twitter')} className="w-full bg-[#1DA1F2] hover:bg-[#1a90d9] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <TwitterIcon className="w-6 h-6" />
                        <span>Twitter</span>
                    </button>
                    <button onClick={() => handleSocialShare('pinterest')} className="w-full bg-[#E60023] hover:bg-[#cf001f] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <PinterestIcon className="w-6 h-6" />
                        <span>Pinterest</span>
                    </button>
                    <button onClick={handleCopyLink} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <LinkIcon className="w-6 h-6" />
                        <span>{isLinkCopied ? '복사 완료!' : '링크 복사'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
