import React, { useState, useMemo, useRef, useEffect } from 'react';
import { generateTattooIdea } from '../services/geminiService';
import { SparklesIcon, XMarkIcon } from '../constants';
import type { Tattoo } from '../types';

interface AIGeneratorProps {
  tattoos: Tattoo[];
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({ tattoos }) => {
  const [prompt, setPrompt] = useState('');
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const generatorRef = useRef<HTMLDivElement>(null);

  const keywords = useMemo(() => {
    const keywordSet = new Set<string>();
    if (!tattoos) return [];
    tattoos.forEach(tattoo => {
        if (tattoo.style) keywordSet.add(tattoo.style.toLowerCase());
        tattoo.tags?.forEach(tag => keywordSet.add(tag.toLowerCase()));
        tattoo.description?.split(/\s+/).forEach(word => {
            const cleanWord = word.replace(/[.,!?]/g, '').toLowerCase();
            if (cleanWord.length > 3) {
                keywordSet.add(cleanWord);
            }
        });
    });
    return Array.from(keywordSet).sort();
  }, [tattoos]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (generatorRef.current && !generatorRef.current.contains(event.target as Node)) {
            setSuggestions([]);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrompt(value);
    if (error) setError('');

    if (value.trim()) {
      const filtered = keywords.filter(k => 
        k.toLowerCase().includes(value.toLowerCase()) && 
        k.toLowerCase() !== value.toLowerCase()
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setSuggestions([]);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('타투 아이디어에 대한 설명을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError('');
    setIdea('');
    setSuggestions([]); // Close suggestions when generating
    try {
      const result = await generateTattooIdea(prompt);
      setIdea(result);
    } catch (err) {
      setError('아이디어 생성에 실패했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
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
      <div className="max-w-2xl mx-auto" ref={generatorRef}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              placeholder="예: 팔뚝에 기하학적인 늑대"
              className="w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              disabled={isLoading}
              autoComplete="off"
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-600 border border-gray-500 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                    {suggestions.map(suggestion => (
                        <li
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 cursor-pointer text-white hover:bg-cyan-500 hover:text-black transition-colors"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                생성 중...
              </>
            ) : "아이디어 생성"}
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
          </div>
        )}
      </div>
    </div>
  );
};