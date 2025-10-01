import React from 'react';
import { ChevronLeftIcon } from '../constants';

interface InfoPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<InfoPageProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8">개인정보처리방침</h1>
      </header>
      <div className="px-4 py-8 text-gray-300 leading-relaxed space-y-4">
        <h2 className="text-xl font-bold text-white">1. 수집하는 개인정보의 항목 및 수집방법</h2>
        <p>회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
        <ul className="list-disc list-inside space-y-1 pl-4">
            <li>일반 회원: 이름, 이메일 주소, 비밀번호</li>
            <li>아티스트 회원: 이름, 이메일 주소, 비밀번호, 프로필 사진, 전문 분야, 작업실 위치, 연락처 정보</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-6">2. 개인정보의 수집 및 이용목적</h2>
        <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
        <ul className="list-disc list-inside space-y-1 pl-4">
            <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산</li>
            <li>회원 관리</li>
            <li>마케팅 및 광고에 활용</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-6">3. 개인정보의 보유 및 이용기간</h2>
        <p>원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>

        <p className="mt-8 text-sm text-gray-500">[이하 내용은 법률 전문가의 검토를 거친 전체 약관으로 대체되어야 합니다.]</p>
      </div>
    </div>
  );
};
