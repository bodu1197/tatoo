import React from 'react';

interface CategoryPillProps {
  category: string;
  onClick?: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ category, onClick }) => {
  return (
    <button onClick={onClick} className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-cyan-500 hover:text-black transition-colors">
      {category}
    </button>
  );
};