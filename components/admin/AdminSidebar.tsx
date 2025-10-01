
import React from 'react';
import { TattooIcon, HomeIcon, UserPlusIcon, UsersIcon, ChartBarIcon, MegaphoneIcon, DocumentDuplicateIcon, CurrencyWonIcon } from '../../constants';
import type { AdminView } from '../../types';

interface AdminSidebarProps {
  activeView: AdminView;
  onNavigate: (view: AdminView) => void;
  onLogout: () => void;
}

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-cyan-500 text-black font-bold'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, onNavigate, onLogout }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 border-r border-gray-700">
      <div className="flex items-center gap-2 text-2xl font-bold text-white mb-8 px-2">
        <TattooIcon className="w-8 h-8 text-cyan-400" />
        <span className="font-serif">InkSpot Admin</span>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem
          icon={<HomeIcon className="w-6 h-6" />}
          label="대시보드"
          active={activeView === 'DASHBOARD'}
          onClick={() => onNavigate('DASHBOARD')}
        />
        <NavItem
          icon={<UserPlusIcon className="w-6 h-6" />}
          label="아티스트 승인"
          active={activeView === 'APPROVAL'}
          onClick={() => onNavigate('APPROVAL')}
        />
        <NavItem
          icon={<UsersIcon className="w-6 h-6" />}
          label="사용자 관리"
          active={activeView === 'USERS'}
          onClick={() => onNavigate('USERS')}
        />
         <NavItem
          icon={<MegaphoneIcon className="w-6 h-6" />}
          label="광고 관리"
          active={activeView === 'ADS'}
          onClick={() => onNavigate('ADS')}
        />
        <NavItem
          icon={<DocumentDuplicateIcon className="w-6 h-6" />}
          label="콘텐츠 관리"
          active={activeView === 'CONTENT'}
          onClick={() => onNavigate('CONTENT')}
        />
         <NavItem
          icon={<CurrencyWonIcon className="w-6 h-6" />}
          label="매출 관리"
          active={activeView === 'REVENUE'}
          onClick={() => onNavigate('REVENUE')}
        />
        <NavItem
          icon={<ChartBarIcon className="w-6 h-6" />}
          label="방문자 통계"
          active={activeView === 'ANALYTICS'}
          onClick={() => onNavigate('ANALYTICS')}
        />
      </nav>

      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full text-left text-gray-400 hover:text-red-400 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
};