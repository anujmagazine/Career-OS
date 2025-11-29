
import React from 'react';
import { PersonalityAnalysis } from '../types';
import { X, User, Sparkles } from 'lucide-react';

interface PersonalityModalProps {
  isOpen: boolean;
  isLoading: boolean;
  data: PersonalityAnalysis | null;
  onClose: () => void;
  personName: string; // Passed for loading state
}

const PersonalityModal: React.FC<PersonalityModalProps> = ({ isOpen, isLoading, data, onClose, personName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-start">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
               <User className="w-6 h-6 text-white" />
             </div>
             <div>
               <h3 className="text-sm font-medium text-indigo-100 uppercase tracking-wide">Inspiration</h3>
               <h2 className="text-2xl font-bold">{data?.name || personName}</h2>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[300px] flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center py-10">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium animate-pulse">
                Learning about {personName}'s journey...
              </p>
            </div>
          ) : data ? (
            <div className="space-y-6">
              
              <div>
                <h4 className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-2">
                  The Journey 🚀
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {data.journeySummary}
                </p>
              </div>

              <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                <h4 className="flex items-center gap-2 font-bold text-indigo-900 text-lg mb-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  Matching Your Vibe
                </h4>
                <p className="text-indigo-800 leading-relaxed text-sm md:text-base italic">
                  "{data.connectionToUser}"
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-500 py-10">
              Could not load the story. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalityModal;
