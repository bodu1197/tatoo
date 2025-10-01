import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronDownIcon } from '../constants';

interface InfoPageProps {
  onBack: () => void;
}

const faqs = [
    {
        question: 'Q. 아티스트 가입 승인은 얼마나 걸리나요?',
        answer: '아티스트 가입 신청 후, 관리자 검토를 거쳐 영업일 기준 1~3일 이내에 승인 여부가 결정됩니다. 프로필 정보가 정확하고 포트폴리오가 명확할수록 승인 절차가 빠르게 진행됩니다.'
    },
    {
        question: 'Q. 프리미엄 플랜 결제는 어떻게 하나요?',
        answer: '아티스트로 로그인 후, 마이 페이지의 \'아티스트 대시보드\'에서 \'광고 및 플랜 관리\' 섹션을 통해 원하시는 플랜을 선택하고 결제를 진행할 수 있습니다.'
    },
    {
        question: 'Q. 부적절한 리뷰를 신고하고 싶어요.',
        answer: '리뷰 내용 옆의 \'신고\' 버튼을 통해 신고할 수 있습니다. 신고된 내용은 관리자 검토 후 조치됩니다. (현재 기능 구현 예정)'
    },
];

export const SupportPage: React.FC<InfoPageProps> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="animate-fade-in">
      <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto pr-8">고객센터</h1>
      </header>
      <div className="px-4 py-8 text-gray-300 leading-relaxed space-y-8">
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">무엇을 도와드릴까요?</h2>
            <p>InkSpot 이용 중 불편한 점이나 궁금한 점이 있으시면 언제든지 문의해주세요. 신속하고 친절하게 답변해드리겠습니다.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">자주 묻는 질문 (FAQ)</h3>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg">
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex justify-between items-center text-left p-4 font-semibold text-white"
                            aria-expanded={openFaq === index}
                        >
                            <span>{faq.question}</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${openFaq === index ? 'transform rotate-180' : ''}`} />
                        </button>
                        {openFaq === index && (
                            <div className="px-4 pb-4 text-gray-300 animate-simple-fade-in">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">연락처 정보</h3>
            <p><strong>이메일:</strong> <a href="mailto:support@inkspot.com" className="text-cyan-400 hover:underline">support@inkspot.com</a></p>
            <p><strong>고객센터:</strong> 1588-1234</p>
            <p className="text-sm text-gray-400 mt-2">(평일 오전 10:00 ~ 오후 6:00, 점심시간 12:00 ~ 1:00)</p>
        </div>
      </div>
    </div>
  );
};
