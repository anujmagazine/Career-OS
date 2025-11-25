import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface IntakeFormProps {
  onSubmit: (data: UserProfile) => void;
  isLoading: boolean;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserProfile>({
    interests: '',
    dislikes: '',
    country: ''
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.interests.trim() || !formData.dislikes.trim() || !formData.country.trim()) {
      setError("Please fill in all three fields so I can help you best! 🌱");
      return;
    }
    setError('');
    onSubmit(formData);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-indigo-600 p-8 text-white">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-300" />
          Career Path Finder
        </h1>
        <p className="mt-4 text-indigo-100 text-lg leading-relaxed">
          Helping 10th graders figure out exactly what to do next without the confusion. 
          Enter your preferences to discover realistic options and practical roadmaps—from streams to exams—so you can plan your future based on facts, not guesswork.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div>
          <label className="block text-slate-700 font-semibold mb-2 text-lg">
            1. What are your Interests? 🎨 💻 ⚽
          </label>
          <p className="text-sm text-slate-500 mb-2">Hobbies, favorite school subjects, things you are good at.</p>
          <textarea
            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50"
            rows={3}
            placeholder="e.g., I love video games, drawing, and solving puzzles..."
            value={formData.interests}
            onChange={(e) => handleChange('interests', e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-2 text-lg">
            2. What do you Dislike? 🚫
          </label>
          <p className="text-sm text-slate-500 mb-2">Subjects you find boring, environments you hate.</p>
          <textarea
            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-slate-50"
            rows={2}
            placeholder="e.g., I hate math and sitting at a desk all day..."
            value={formData.dislikes}
            onChange={(e) => handleChange('dislikes', e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-2 text-lg">
            3. Where do you live? 🌍
          </label>
          <input
            type="text"
            className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50"
            placeholder="e.g., India, USA, Canada..."
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 animate-pulse">
            <span className="font-bold">Oops!</span> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] ${
            isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30'
          }`}
        >
          {isLoading ? (
            <>Thinking... <span className="animate-spin">🌀</span></>
          ) : (
            <>Find My Paths <ArrowRight className="w-5 h-5" /></>
          )}
        </button>
      </form>
    </div>
  );
};

export default IntakeForm;