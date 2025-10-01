import React from 'react';
import { ChevronLeftIcon } from '../constants';

interface InfoPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<InfoPageProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8">이용약관</h1>
      </header>
      <div className="px-4 py-8 text-gray-300 leading-relaxed space-y-4">
        <h2 className="text-xl font-bold text-white">제 1조 (목적)</h2>
        <p>이 약관은 (주)잉크스팟이 운영하는 InkSpot 플랫폼(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
        
        <h2 className="text-xl font-bold text-white mt-6">제 2조 (정의)</h2>
        <p>"회원"이란 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</p>
        <p>"아티스트 회원"이란 타투 또는 반영구 시술을 제공할 목적으로 서비스에 가입한 회원을 말합니다.</p>

        <h2 className="text-xl font-bold text-white mt-6">제 3조 (서비스의 제공 및 변경)</h2>
        <p>회사는 다음과 같은 업무를 수행합니다.</p>
        <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>아티스트 및 작품 정보 제공</li>
            <li>AI 기반 타투 아이디어 생성 서비스</li>
            <li>회원 간의 소통 중개 서비스</li>
            <li>기타 회사가 정하는 업무</li>
        </ol>

        <p className="mt-8 text-sm text-gray-500">[이하 내용은 법률 전문가의 검토를 거친 전체 약관으로 대체되어야 합니다.]</p>
      </div>
    </div>
  );
};
