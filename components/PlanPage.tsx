import React, { useState } from 'react';
// FIX: Import the shared Plan interface from types.ts
import type { ArtistUser, Plan } from '../types';
import { ChevronLeftIcon, CreditCardIcon, CrownIcon, XMarkIcon } from '../constants';

// FIX: Removed local Plan interface definition. It is now imported from types.ts.

interface PlanPageProps {
  artist: ArtistUser;
  onPurchase: (plan: Plan) => void;
  onBack: () => void;
}


const PLANS: Plan[] = [
    { months: 1, title: '1개월 플랜', pricePerMonth: 30000, totalPrice: 30000 },
    { months: 3, title: '3개월 플랜', pricePerMonth: 27000, totalPrice: 81000, discount: '10% 할인', popular: true },
    { months: 12, title: '1년 플랜', pricePerMonth: 24000, totalPrice: 288000, discount: '20% 할인' },
];

const ConfirmationModal = ({ plan, onConfirm, onCancel }: { plan: Plan; onConfirm: () => void; onCancel: () => void; }) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in p-4" onClick={onCancel}>
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm text-center p-8 border border-gray-700" onClick={(e) => e.stopPropagation()}>
                <button onClick={onCancel} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors" aria-label="Close">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <CreditCardIcon className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
                <h2 className="text-2xl font-bold mb-2">결제 확인</h2>
                <p className="text-gray-400 mb-6">아래 플랜으로 결제를 진행하시겠습니까?</p>
                <div className="bg-gray-700 p-4 rounded-lg text-left space-y-2 mb-8">
                    <div className="flex justify-between">
                        <span className="text-gray-300">플랜:</span>
                        <span className="font-semibold text-white">{plan.title}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-300">결제 금액:</span>
                        <span className="font-semibold text-cyan-400 text-lg">₩{plan.totalPrice.toLocaleString()}</span>
                    </div>
                </div>
                <button
                    onClick={onConfirm}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    결제 확정 및 플랜 시작
                </button>
            </div>
        </div>
    );
};

interface PlanCardProps {
    plan: Plan;
    onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
    return (
        <div className={`relative bg-gray-800 p-6 rounded-lg border-2 transition-all ${plan.popular ? 'border-cyan-400' : 'border-gray-700 hover:border-gray-600'}`}>
            {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-cyan-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                </div>
            )}
            {plan.discount && (
                 <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    {plan.discount}
                </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
            <p className="text-gray-400 mb-4">월 ₩{plan.pricePerMonth.toLocaleString()}</p>
            <p className="text-4xl font-extrabold text-white mb-6">
                ₩{plan.totalPrice.toLocaleString()}
            </p>
            <button 
                onClick={onSelect}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-colors ${plan.popular ? 'bg-cyan-500 hover:bg-cyan-400 text-black' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
            >
                플랜 선택
            </button>
        </div>
    );
};


export const PlanPage: React.FC<PlanPageProps> = ({ artist, onPurchase, onBack }) => {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const handleConfirmPurchase = () => {
        if (selectedPlan) {
            onPurchase(selectedPlan);
            setSelectedPlan(null); // Close modal and reset
        }
    };

    return (
        <div className="animate-fade-in">
            <header className="p-4 flex items-center sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Go back">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold mx-auto pr-8">플랜 관리</h1>
            </header>

            <div className="px-4 py-8">
                <section className="text-center mb-12">
                     <CrownIcon className="w-12 h-12 mx-auto text-yellow-400 mb-2" />
                    <h2 className="text-3xl font-bold">프리미엄 플랜으로 더 많은 기회를!</h2>
                    <p className="text-gray-400 mt-2 max-w-xl mx-auto">프리미엄 플랜을 구독하고, 당신의 작품과 프로필을 최상단에 노출시켜 더 많은 고객을 만나보세요.</p>
                </section>

                <section className="space-y-8">
                    {PLANS.map(plan => (
                        <PlanCard key={plan.months} plan={plan} onSelect={() => setSelectedPlan(plan)} />
                    ))}
                </section>
            </div>

            {selectedPlan && (
                <ConfirmationModal 
                    plan={selectedPlan}
                    onConfirm={handleConfirmPurchase}
                    onCancel={() => setSelectedPlan(null)}
                />
            )}
        </div>
    );
};
