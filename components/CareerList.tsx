import React from 'react';
import { CareerOption } from '../types';
import { RotateCcw, ArrowRight } from 'lucide-react';

interface CareerListProps {
  careers: CareerOption[];
  onSelect: (career: CareerOption) => void;
  onBack: () => void;
}

const CareerList: React.FC<CareerListProps> = ({ careers, onSelect, onBack }) => {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Here are 5 exciting paths for you! 🎉</h2>
        <p className="text-slate-600 mt-3 text-lg">Which one sounds the most interesting? Tap a card to see your roadmap.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {careers.map((career, index) => {
          const style = getCardStyle(index);
          return (
            <button
              key={career.id}
              onClick={() => onSelect(career)}
              className={`group relative flex flex-col h-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 ${style.hoverBorder} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm ${style.badgeBg} ${style.badgeText}`}>
                  {index + 1}
                </div>
                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors">
                  <ArrowRight className={`w-5 h-5 text-slate-300 group-hover:${style.badgeText} transition-colors`} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors leading-tight">
                {career.title}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {career.summary}
              </p>
              
              <div className={`w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-semibold text-center text-sm group-hover:bg-slate-900 group-hover:text-white transition-all mt-auto flex items-center justify-center gap-2`}>
                View Roadmap
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onBack}
          className="text-slate-500 hover:text-indigo-600 font-medium flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-full hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100"
        >
          <RotateCcw className="w-4 h-4" /> Start Over
        </button>
      </div>
    </div>
  );
};

// Helper function to generate distinct but harmonious styles for each card
const getCardStyle = (index: number) => {
  const styles = [
    { badgeBg: 'bg-blue-100', badgeText: 'text-blue-600', hoverBorder: 'hover:border-blue-200' },
    { badgeBg: 'bg-purple-100', badgeText: 'text-purple-600', hoverBorder: 'hover:border-purple-200' },
    { badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-600', hoverBorder: 'hover:border-emerald-200' },
    { badgeBg: 'bg-amber-100', badgeText: 'text-amber-600', hoverBorder: 'hover:border-amber-200' },
    { badgeBg: 'bg-rose-100', badgeText: 'text-rose-600', hoverBorder: 'hover:border-rose-200' },
  ];
  return styles[index % styles.length];
};

export default CareerList;