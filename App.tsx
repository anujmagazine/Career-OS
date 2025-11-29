
import React, { useState } from 'react';
import { AppStep, CareerOption, CareerRoadmap, UserProfile, PersonalityAnalysis } from './types';
import IntakeForm from './components/IntakeForm';
import CareerList from './components/CareerList';
import RoadmapView from './components/RoadmapView';
import PersonalityModal from './components/PersonalityModal';
import { fetchCareerOptions, fetchCareerRoadmap, fetchPersonalityAnalysis } from './services/geminiService';
import { Compass } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INTAKE);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [careers, setCareers] = useState<CareerOption[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<CareerRoadmap | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingPersonality, setLoadingPersonality] = useState(false);
  const [personalityData, setPersonalityData] = useState<PersonalityAnalysis | null>(null);
  const [selectedPersonName, setSelectedPersonName] = useState("");

  // Step 1 -> Step 2
  const handleIntakeSubmit = async (data: UserProfile) => {
    setUserProfile(data);
    setStep(AppStep.LOADING_LIST);
    setErrorMsg(null);

    try {
      const options = await fetchCareerOptions(data);
      setCareers(options);
      setStep(AppStep.LIST);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong while thinking. Please check your connection and try again!");
      setStep(AppStep.INTAKE); // Go back to allow retry
    }
  };

  // Step 2 -> Step 3
  const handleCareerSelect = async (career: CareerOption) => {
    if (!userProfile) return;
    setStep(AppStep.LOADING_ROADMAP);
    setErrorMsg(null);

    try {
      const roadmap = await fetchCareerRoadmap(career.title, userProfile);
      setSelectedRoadmap(roadmap);
      setStep(AppStep.ROADMAP);
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not generate the roadmap. Please try selecting again.");
      setStep(AppStep.LIST);
    }
  };

  // Personality Analysis
  const handleAnalyzePersonality = async (name: string, careerTitle: string) => {
    if (!userProfile) return;
    
    setSelectedPersonName(name);
    setIsModalOpen(true);
    setLoadingPersonality(true);
    setPersonalityData(null);

    try {
      const analysis = await fetchPersonalityAnalysis(name, careerTitle, userProfile);
      setPersonalityData(analysis);
    } catch (err) {
      console.error(err);
      // Keep modal open but maybe show error inside (handled by modal component or just close)
      setIsModalOpen(false); 
      alert("Oops, couldn't find info on " + name + " right now.");
    } finally {
      setLoadingPersonality(false);
    }
  };

  const resetApp = () => {
    setStep(AppStep.INTAKE);
    setUserProfile(null);
    setCareers([]);
    setSelectedRoadmap(null);
    setErrorMsg(null);
  };

  const backToList = () => {
    setStep(AppStep.LIST);
    setSelectedRoadmap(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-100 to-transparent opacity-60"></div>
         <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
         <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      <header className="relative z-10 w-full p-6 flex justify-center">
        {step !== AppStep.INTAKE && (
           <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl tracking-tight">
             <Compass className="w-6 h-6" />
             Career Path Finder
           </div>
        )}
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-start p-4 md:p-8 w-full max-w-6xl mx-auto">
        
        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl max-w-md text-center shadow-sm animate-bounce">
            {errorMsg}
          </div>
        )}

        {/* View Switcher */}
        {step === AppStep.INTAKE && (
          <IntakeForm onSubmit={handleIntakeSubmit} isLoading={false} />
        )}

        {step === AppStep.LOADING_LIST && (
           <div className="flex flex-col items-center justify-center mt-20 space-y-6">
             <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
             <p className="text-xl font-medium text-slate-600 animate-pulse">Analyzing your interests and market trends...</p>
           </div>
        )}

        {step === AppStep.LIST && (
          <CareerList 
            careers={careers} 
            onSelect={handleCareerSelect} 
            onBack={resetApp} 
            onAnalyzePersonality={handleAnalyzePersonality}
          />
        )}

        {step === AppStep.LOADING_ROADMAP && (
          <div className="flex flex-col items-center justify-center mt-20 space-y-6 text-center">
             <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
             <div className="space-y-2">
                <p className="text-xl font-medium text-slate-600 animate-pulse">Building your roadmap...</p>
                <p className="text-sm text-slate-400">Checking exams, degrees, and timelines.</p>
             </div>
           </div>
        )}

        {step === AppStep.ROADMAP && selectedRoadmap && (
          <RoadmapView 
            roadmap={selectedRoadmap} 
            onBack={backToList} 
          />
        )}

        {/* Personality Analysis Modal */}
        <PersonalityModal 
          isOpen={isModalOpen}
          isLoading={loadingPersonality}
          data={personalityData}
          onClose={() => setIsModalOpen(false)}
          personName={selectedPersonName}
        />

      </main>

      <footer className="relative z-10 p-6 text-center text-slate-400 text-sm">
        <p>© 2025 Career Path Finder. Built for students.</p>
      </footer>
    </div>
  );
};

export default App;
