
import React from 'react';
import type { View } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 text-gray-400 text-xs px-4 py-8 mt-12 border-t border-gray-700">
      <div className="container mx-auto">
        <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-6 text-sm">
          <button onClick={() => onNavigate('COMPANY')} className="hover:text-white transition-colors">회사소개</button>
          <button onClick={() => onNavigate('TERMS')} className="hover:text-white transition-colors">이용약관</button>
          <button onClick={() => onNavigate('PRIVACY')} className="font-semibold text-white hover:text-cyan-400 transition-colors">개인정보처리방침</button>
          <button onClick={() => onNavigate('SUPPORT')} className="hover:text-white transition-colors">고객센터</button>
        </div>
        <div className="text-center space-y-1">
          <p>(주)잉크스팟 | 대표: 홍길동 | 사업자등록번호: 123-45-67890</p>
          <p>통신판매업신고: 제2024-서울강남-12345호</p>
          <p>주소: 서울특별시 강남구 테헤란로 123, 45층 (잉크스팟 타워)</p>
          <p>이메일: contact@inkspot.com | 고객센터: 1588-1234</p>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} InkSpot Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};