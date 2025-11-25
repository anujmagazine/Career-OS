import React from 'react';
import { CareerRoadmap } from '../types';
import { GraduationCap, CheckCircle2, Clock, Map, ArrowLeft, BookOpen, PenTool } from 'lucide-react';

interface RoadmapViewProps {
  roadmap: CareerRoadmap;
  onBack: () => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto pb-12 animate-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="bg-white p-3 rounded-full shadow-md text-slate-600 hover:text-indigo-600 hover:scale-110 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
           <p className="text-slate-500 font-medium text-sm uppercase tracking-wide">Your Future Roadmap</p>
           <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
             {roadmap.title} 🚀
           </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Content - Left Column (Academic) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Section 1: Education */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-indigo-900">1. The Academic Route</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">High School (11th-12th)</h3>
                <p className="text-lg text-slate-800 font-medium">{roadmap.academicRoute.highSchool}</p>
              </div>
              <div className="h-px bg-slate-100 w-full" />
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Entrance Exams</h3>
                <p className="text-lg text-slate-800 font-medium flex items-start gap-2">
                   <PenTool className="w-5 h-5 text-indigo-400 mt-1" />
                   {roadmap.academicRoute.entranceExams}
                </p>
              </div>
              <div className="h-px bg-slate-100 w-full" />
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Undergraduate Degree</h3>
                <p className="text-lg text-slate-800 font-medium flex items-start gap-2">
                   <BookOpen className="w-5 h-5 text-indigo-400 mt-1" />
                   {roadmap.academicRoute.undergraduateDegree}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Timeline */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-600" />
              <h2 className="text-xl font-bold text-amber-900">3. Study Timeline</h2>
            </div>
            <div className="p-6">
              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                {roadmap.studyTimeline}
              </p>
            </div>
          </section>

             {/* Section 4: Fit */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg text-white overflow-hidden">
             <div className="px-6 py-4 flex items-center gap-3 border-b border-white/20">
               <Map className="w-6 h-6 text-indigo-200" />
               <h2 className="text-xl font-bold">4. Why this fits you</h2>
             </div>
             <div className="p-6">
               <p className="text-lg text-indigo-50 font-medium leading-relaxed italic opacity-90">
                 "{roadmap.fitReason}"
               </p>
             </div>
          </section>
        </div>

        {/* Sidebar - Right Column (Skills) */}
        <div className="md:col-span-1 space-y-6">
          <section className="bg-white rounded-2xl shadow-lg border border-slate-100 h-full">
            <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center gap-3 rounded-t-2xl">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-emerald-900">2. Skills</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-emerald-700 font-bold mb-3 flex items-center gap-2">
                  Hard Skills <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Tools</span>
                </h3>
                <ul className="space-y-2">
                  {roadmap.skills.hardSkills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-slate-100 w-full" />

              <div>
                <h3 className="text-emerald-700 font-bold mb-3 flex items-center gap-2">
                  Soft Skills <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Traits</span>
                </h3>
                <ul className="space-y-2">
                  {roadmap.skills.softSkills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                       <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default RoadmapView;
