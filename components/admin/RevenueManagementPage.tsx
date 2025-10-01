
import React from 'react';
import type { Payment } from '../../types';
import { ANALYTICS_DATA } from '../../constants';

const StatCard = ({ title, value }: { title: string, value: string }) => (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
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
                            title={`${point.label}: ₩${point.value.toLocaleString()}`}
                        ></div>
                        <p className="text-xs text-gray-500 mt-2">{point.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


interface RevenueManagementPageProps {
    payments: Payment[];
}

export const RevenueManagementPage: React.FC<RevenueManagementPageProps> = ({ payments }) => {
    const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);
    const thisMonthRevenue = payments.reduce((acc, payment) => {
        const paymentDate = new Date(payment.paymentDate);
        const today = new Date();
        if (paymentDate.getMonth() === today.getMonth() && paymentDate.getFullYear() === today.getFullYear()) {
            return acc + payment.amount;
        }
        return acc;
    }, 0);
    const totalTransactions = payments.length;
    const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    // This is a simplified monthly aggregation for the chart
    const monthlySales = payments.reduce((acc, p) => {
        const month = new Date(p.paymentDate).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + p.amount;
        return acc;
    }, {});

    const chartData = Object.keys(monthlySales).map(month => ({
        label: month,
        value: monthlySales[month],
    })).slice(-12); // Show last 12 months

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ko-KR');

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">매출 관리</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="총 매출" value={`₩${totalRevenue.toLocaleString()}`} />
                <StatCard title="이번 달 매출" value={`₩${thisMonthRevenue.toLocaleString()}`} />
                <StatCard title="총 결제 건수" value={totalTransactions.toLocaleString()} />
                <StatCard title="평균 결제 금액" value={`₩${Math.round(avgTransactionValue).toLocaleString()}`} />
            </div>

            <Chart data={chartData} title="월별 매출 추이" />

            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                <h3 className="text-lg font-semibold text-white p-6">상세 결제 내역</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">아티스트</th>
                                <th scope="col" className="px-6 py-3">플랜</th>
                                <th scope="col" className="px-6 py-3">금액</th>
                                <th scope="col" className="px-6 py-3">결제일</th>
                                <th scope="col" className="px-6 py-3">갱신된 만료일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(payment => (
                                <tr key={payment.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{payment.artistName}</td>
                                    <td className="px-6 py-4">{payment.planName}</td>
                                    <td className="px-6 py-4">₩{payment.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">{formatDate(payment.paymentDate)}</td>
                                    <td className="px-6 py-4">{formatDate(payment.newExpiryDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};