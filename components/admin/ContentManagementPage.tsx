import React, { useState } from 'react';
import type { Tattoo, Event, Review } from '../../types';
import { TrashIcon } from '../../constants';

interface ContentManagementPageProps {
    tattoos: Tattoo[];
    events: Event[];
    reviews: Review[];
    onDeleteTattoo: (id: number) => void;
    onDeleteEvent: (id: number) => void;
    onDeleteReview: (id: number) => void;
}

type ContentTab = 'tattoos' | 'events' | 'reviews';

export const ContentManagementPage: React.FC<ContentManagementPageProps> = ({
    tattoos,
    events,
    reviews,
    onDeleteTattoo,
    onDeleteEvent,
    onDeleteReview
}) => {
    const [activeTab, setActiveTab] = useState<ContentTab>('tattoos');

    const renderContent = () => {
        switch(activeTab) {
            case 'tattoos':
                // FIX: Removed redundant `title` prop. The active tab provides context.
                return <ContentTable items={tattoos} columns={['Artist', 'Style']} renderRow={(item) => (
                    <>
                        <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <img src={item.imageUrl} alt={item.style} className="w-10 h-14 rounded-md object-cover" loading="lazy" decoding="async" />
                                <span>{item.artistName}</span>
                             </div>
                        </td>
                        <td className="px-6 py-4">{item.style}</td>
                    </>
                )} onDelete={onDeleteTattoo} />;
            case 'events':
                // FIX: Removed redundant `title` prop. The active tab provides context.
                return <ContentTable items={events} columns={['Title', 'Artist']} renderRow={(item) => (
                    <>
                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{item.title}</td>
                        <td className="px-6 py-4">{item.artistName}</td>
                    </>
                )} onDelete={onDeleteEvent} />;
            case 'reviews':
                // FIX: Removed redundant `title` prop. The active tab provides context.
                return <ContentTable items={reviews} columns={['Comment', 'User', 'Artist']} renderRow={(item) => (
                    <>
                        <td className="px-6 py-4 italic">"{item.comment}"</td>
                        <td className="px-6 py-4">{item.userName}</td>
                        <td className="px-6 py-4">{item.artistName}</td>
                    </>
                )} onDelete={onDeleteReview} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">콘텐츠 관리</h1>
            
            <div className="flex border-b border-gray-700">
                <TabButton label={`타투 (${tattoos.length})`} isActive={activeTab === 'tattoos'} onClick={() => setActiveTab('tattoos')} />
                <TabButton label={`이벤트 (${events.length})`} isActive={activeTab === 'events'} onClick={() => setActiveTab('events')} />
                <TabButton label={`리뷰 (${reviews.length})`} isActive={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
            </div>

            {renderContent()}
        </div>
    );
};

const TabButton = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            isActive ? 'border-cyan-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
        }`}
    >
        {label}
    </button>
);

const ContentTable = ({ items, columns, renderRow, onDelete }) => (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
            {items.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                        <tr>
                            {columns.map(col => <th key={col} scope="col" className="px-6 py-3">{col}</th>)}
                            <th scope="col" className="px-6 py-3 text-right">삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                                {renderRow(item)}
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => onDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                 <div className="text-center py-16 text-gray-500">
                    <p>콘텐츠가 없습니다.</p>
                </div>
            )}
        </div>
    </div>
);