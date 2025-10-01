import React, { useState } from 'react';
import { ANALYTICS_DATA } from '../../constants';

const Chart = ({ data, title, period }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title} ({period})</h3>
      <div className="flex justify-between items-end h-96 space-x-1 border-b border-l border-gray-700 p-4">
        {data.map((point, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full group relative">
            <div
              className="w-3/4 bg-cyan-600 rounded-t-sm transition-colors hover:bg-cyan-500"
              style={{ height: `${(point.value / maxValue) * 100}%` }}
            >
             <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white bg-gray-700 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {point.value.toLocaleString()}
             </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 absolute -bottom-6">{point.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

type Period = 'hourly' | 'daily' | 'monthly' | 'yearly';

export const AnalyticsPage = () => {
  const [period, setPeriod] = useState<Period>('daily');

  const PeriodButton = ({ value, label }) => (
    <button
      onClick={() => setPeriod(value)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        period === value ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">방문자 통계</h1>
      
      <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-center gap-2">
        <PeriodButton value="hourly" label="시간별" />
        <PeriodButton value="daily" label="일별" />
        <PeriodButton value="monthly" label="월별" />
        <PeriodButton value="yearly" label="연도별" />
      </div>

      <div className="w-full">
        <Chart data={ANALYTICS_DATA[period]} title="방문자 수" period={period} />
      </div>
    </div>
  );
};
