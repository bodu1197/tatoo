import React from 'react';
import { HomeIcon, UserGroupIcon, MagnifyingGlassIcon, SparklesIcon, CalendarDaysIcon, UserCircleIcon } from '../constants';
// FIX: Imported shared View type.
import type { View } from '../types';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center flex-1 text-xs gap-1 transition-colors ${active ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`} aria-label={label}>
    {icon}
    <span>{label}</span>
  </button>
);

interface BottomNavProps {
    activeView: View;
    onNavigate: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 z-50">
      <div className="max-w-[720px] mx-auto flex justify-around items-stretch h-16 px-2">
        <NavItem icon={<HomeIcon className="w-6 h-6" />} label="홈" active={activeView === 'HOME'} onClick={() => onNavigate('HOME')} />
        <NavItem icon={<UserGroupIcon className="w-6 h-6" />} label="아티스트" active={activeView === 'ARTISTS'} onClick={() => onNavigate('ARTISTS')} />
        <NavItem icon={<MagnifyingGlassIcon className="w-6 h-6" />} label="작품 검색" active={activeView === 'SEARCH'} onClick={() => onNavigate('SEARCH')} />
        <NavItem icon={<SparklesIcon className="w-6 h-6" />} label="AI 존" active={activeView === 'AI_ZONE'} onClick={() => onNavigate('AI_ZONE')} />
        <NavItem icon={<CalendarDaysIcon className="w-6 h-6" />} label="이벤트" active={activeView === 'EVENTS'} onClick={() => onNavigate('EVENTS')} />
        <NavItem icon={<UserCircleIcon className="w-6 h-6" />} label="마이 페이지" active={activeView === 'MYPAGE'} onClick={() => onNavigate('MYPAGE')} />
      </div>
    </nav>
  );
};