import React, { useState } from 'react';
import type { Tattoo } from '../types';
// FIX: Added generateTattooIdea from geminiService to be used in the local AIGeneratorWithCopy component.
import { generateAiImage, generateTattooIdea } from '../services/geminiService';
// FIX: Added XMarkIcon from constants to be used for the close button.
import { SparklesIcon, DownloadIcon, ShareIcon, ClipboardIcon, XMarkIcon } from '../constants';
import { ShareModal } from './ShareModal';

const AIImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('생성할 이미지에 대한 설명을 입력해주세요.');
            return;
        }
        setIsLoading(true);
        setError('');
        setImage('');
        try {
            const result = await generateAiImage(prompt);
            setImage(result);
        } catch (err: any) {
            setError(err.message || '이미지 생성에 실패했습니다. 다시 시도해주세요.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
            <div className="text-center mb-6">
                <SparklesIcon className="w-12 h-12 mx-auto text-pink-400 mb-2" />
                <h2 className="text-3xl font-bold">AI 타투 이미지 생성기</h2>
                <p className="text-gray-400 mt-2">상상 속의 타투를 현실로 만들어보세요. AI가 직접 도안을 그려줘요.</p>
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="예: 우주를 항해하는 고래, 수채화 스타일"
                        className="w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? '생성 중...' : '이미지 생성'}
                    </button>
                </div>
                 {error && <p className="text-red-400 text-center mt-4 text-sm">{error}</p>}
                 <div className="mt-6 aspect-square w-full bg-gray-900/50 rounded-lg border border-gray-700 flex items-center justify-center">
                    {isLoading ? (
                         <div className="text-center">
                            <svg className="animate-spin mx-auto h-10 w-10 text-pink-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                             <p className="mt-4 text-gray-400">AI가 열심히 그림을 그리고 있어요...</p>
                         </div>
                    ) : image ? (
                        <div className="relative group w-full h-full">
                           <img src={image} alt="AI generated tattoo" className="w-full h-full object-contain rounded-lg" loading="lazy" decoding="async" />
                           <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                 onClick={() => setIsShareModalOpen(true)}
                                 className="bg-black/60 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-black/80"
                               >
                                    <ShareIcon className="w-5 h-5" />
                                    <span>공유하기</span>
                               </button>
                               <a
                                 href={image}
                                 download={`inkspot-ai-tattoo-${Date.now()}.jpg`}
                                 className="bg-black/60 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-black/80"
                               >
                                    <DownloadIcon className="w-5 h-5" />
                                    <span>다운로드</span>
                               </a>
                           </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">이곳에 생성된 이미지가 표시됩니다.</p>
                    )}
                 </div>
            </div>
            {isShareModalOpen && (
                <ShareModal
                    onClose={() => setIsShareModalOpen(false)}
                    shareUrl={window.location.href}
                    shareTitle="AI로 생성한 멋진 타투 디자인을 확인해보세요!"
                    shareImage={image}
                />
            )}
        </div>
    );
}

interface AIZonePageProps {
  tattoos: Tattoo[];
}

export const AIZonePage: React.FC<AIZonePageProps> = ({ tattoos }) => {
    const AIGeneratorWithCopy: React.FC<{tattoos: Tattoo[]}> = ({ tattoos }) => {
        const [prompt, setPrompt] = useState('');
        const [idea, setIdea] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState('');
        const [isCopied, setIsCopied] = useState(false);

        const handleGenerate = async () => {
            if (!prompt.trim()) {
                setError('타투 아이디어에 대한 설명을 입력해주세요.');
                return;
            }
            setIsLoading(true);
            setError('');
            setIdea('');
            try {
                const result = await generateTattooIdea(prompt);
                setIdea(result);
            } catch (err: any) {
                setError(err.message || '아이디어 생성에 실패했습니다. 다시 시도해주세요.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        const handleCopy = () => {
            if (idea) {
                navigator.clipboard.writeText(idea).then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                });
            }
        };

        const handleClearIdea = () => {
          setIdea('');
        };
      
        return (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
            <div className="text-center mb-6">
              <SparklesIcon className="w-12 h-12 mx-auto text-cyan-400 mb-2" />
              <h2 className="text-3xl font-bold">AI 타투 아이디어 생성기</h2>
              <p className="text-gray-400 mt-2">아이디어가 떠오르지 않나요? 컨셉을 설명하면 AI가 영감을 줄 거예요.</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="예: 팔뚝에 기하학적인 늑대"
                  className="w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {isLoading ? '생성 중...' : "아이디어 생성"}
                </button>
              </div>
              {error && <p className="text-red-400 text-center mt-4 text-sm">{error}</p>}
              {idea && (
                <div className="relative mt-6 bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                  <button
                    onClick={handleClearIdea}
                    className="absolute top-3 right-3 p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="결과 닫기"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                  <h3 className="font-semibold text-lg mb-2 text-cyan-300">AI가 생성한 컨셉:</h3>
                  <p className="text-gray-300 whitespace-pre-wrap pr-6">{idea}</p>
                  <div className="mt-4">
                    <button
                        onClick={handleCopy}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <ClipboardIcon className="w-5 h-5" />
                        <span>{isCopied ? '복사 완료!' : '아이디어 복사'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
  return (
    <div className="animate-fade-in">
      <header className="p-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 text-center">
        <h1 className="text-xl font-bold">AI 존</h1>
      </header>

      <div className="px-4 py-8 space-y-16">
        <AIGeneratorWithCopy tattoos={tattoos} />
        <AIImageGenerator />
      </div>
    </div>
  );
};
