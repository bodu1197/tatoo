import React from 'react';
import { ChevronLeftIcon } from '../constants';

interface InfoPageProps {
  onBack: () => void;
}

export const CompanyPage: React.FC<InfoPageProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8">회사소개</h1>
      </header>
      <div className="px-4 py-8 text-gray-300 leading-relaxed space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">InkSpot: 예술과 사람을 잇다</h2>
        <p>잉크스팟(InkSpot)은 전 세계의 실력 있는 타투 아티스트와 반영구 아티스트들을 사용자와 연결하는 프리미엄 플랫폼입니다.</p>
        <p>저희는 단순히 작품을 보여주는 것을 넘어, 각 아티스트의 철학과 스토리가 담긴 포트폴리오를 통해 사용자가 자신에게 꼭 맞는 아티스트를 발견하는 여정을 돕습니다. 최신 AI 기술을 활용한 아이디어 생성기부터 투명한 리뷰 시스템, 편리한 지역별 검색까지, 잉크스팟은 타투와 반영구 문화의 새로운 기준을 만들어가고 있습니다.</p>
        <p>예술로서의 타투를 존중하고, 아티스트와 고객 모두가 신뢰할 수 있는 건강한 생태계를 만드는 것이 저희의 미션입니다.</p>
      </div>
    </div>
  );
};
