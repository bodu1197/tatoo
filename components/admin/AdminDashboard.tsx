
import React from 'react';
// FIX: Import ArtistUser to be used in the type guard.
import type { User, Payment, ArtistUser } from '../../types';
import { isArtistPremium } from '../../types';
import { ANALYTICS_DATA } from '../../constants';

const StatCard = ({ title, value, change, changeType }: { title: string, value: string, change?: string, changeType?: 'increase' | 'decrease' }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-3xl font-bold text-white mt-1">{value}</p>
    {change && (
      <p className={`text-xs mt-2 ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
        {change} vs last month
      </p>
    )}
  </div>
);

const Chart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="flex justify-between items-end h-64 space-x-2">
        {data.map((point, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full group">
            <div
              className="w-full bg-cyan-500 rounded-t-sm transition-colors hover:bg-cyan-400"
              style={{ height: `${(point.value / maxValue) * 100}%` }}
              title={`${point.label}: ${point.value.toLocaleString()}`}
            ></div>
            <p className="text-xs text-gray-500 mt-2">{point.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface AdminDashboardProps {
    allUsers: User[];
    allPayments: Payment[];
    pendingCount: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ allUsers, allPayments, pendingCount }) => {
  const totalUsers = allUsers.length;
  // FIX: Use a type guard to filter for artist users. This correctly types `artists` as `ArtistUser[]`.
  const artists = allUsers.filter((u): u is ArtistUser => u?.type === 'artist');
  // FIX: `artists` is now correctly typed, so `isArtistPremium` can be called without a type error.
  const premiumArtists = artists.filter(isArtistPremium).length;
  
  const thisMonthRevenue = allPayments.reduce((acc, payment) => {
    const paymentDate = new Date(payment.paymentDate);
    const today = new Date();
    if (paymentDate.getMonth() === today.getMonth() && paymentDate.getFullYear() === today.getFullYear()) {
      return acc + payment.amount;
    }
    return acc;
  }, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">관리자 대시보드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="총 회원 수" value={totalUsers.toLocaleString()} change="+5.2%" changeType="increase" />
        <StatCard title="프리미엄 아티스트" value={premiumArtists.toLocaleString()} change="+2" changeType="increase" />
        <StatCard title="승인 대기중" value={pendingCount.toLocaleString()} change="-1" changeType="decrease" />
        <StatCard title="이번 달 매출" value={`₩${thisMonthRevenue.toLocaleString()}`} change="+1.8%" changeType="increase" />
      </div>

      <div className="w-full">
        <Chart data={ANALYTICS_DATA.monthly} title="월별 방문자 수 (2024)" />
      </div>
    </div>
  );
};