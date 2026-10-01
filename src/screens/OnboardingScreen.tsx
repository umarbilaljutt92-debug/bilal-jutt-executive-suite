import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { ScreenType } from '../types';

interface OnboardingScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const stepsData = [
    {
      title: 'Master Your Daily Flow with Precision',
      body: 'Orchestrate high-priority executive tasks, curated ideas, and strategic milestones within a singular refined space.',
      badge: 'Step 1 of 3 • Command Architecture',
    },
    {
      title: 'Synthesize Milestones at Flight Altitude',
      body: 'Instant algorithmic clarity on where capital, cognitive energy, and high-impact deliverables intersect.',
      badge: 'Step 2 of 3 • Strategic Insight',
    },
    {
      title: 'Seamless Real-Time Synchronization',
      body: 'Command your calendar, assets, and key collaborators through low-latency tactile micro-interactions.',
      badge: 'Step 3 of 3 • Effortless Harmony',
    },
  ];

  const currentData = stepsData[currentStep - 1];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="min-h-screen w-full bg-surface text-on-surface flex flex-col justify-between p-5 select-none pt-safe pb-safe max-w-md mx-auto">
      {/* Top Bar: Skip & Brand */}
      <div className="flex items-center justify-between w-full pt-1 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shadow-sm border border-primary/20">
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              diamond
            </span>
          </div>
          <span className="font-semibold text-lg text-on-surface tracking-tight">Bilal Jutt</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="px-3.5 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-semibold hover:text-on-surface active:bg-surface-container active:scale-95 transition-all"
        >
          Skip
        </button>
      </div>

      {/* Hero Visual: Executive Bento Productivity Stage */}
      <div className="relative w-full rounded-3xl bg-surface-container-lowest p-4 overflow-hidden shadow-2xl border border-surface-container-high mb-4">
        {/* Ambient Radial Golden & Cyan Lighting */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        {/* Main Bento Illustration Layer */}
        <div className="relative z-10 flex flex-col gap-3">
          {/* Glassmorphic Bento Header Card */}
          <div className="w-full rounded-2xl bg-surface-container/90 backdrop-blur-md p-3.5 shadow-lg flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md bg-surface-container-highest shrink-0">
                <img
                  src={ASSETS.bentoDesk}
                  alt="Executive Desk Workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-primary tracking-wider uppercase font-bold">
                    Executive Mode
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>
                <p className="font-semibold text-base text-on-surface leading-tight">Peak Clarity</p>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center gap-1">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                insights
              </span>
              <span>98.4%</span>
            </div>
          </div>

          {/* Bento Split Panels: Metric & Intelligent Scheduling */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Metric Tile */}
            <div className="rounded-2xl bg-surface-container-high/90 backdrop-blur-md p-3.5 flex flex-col justify-between shadow-md border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-base">bolt</span>
                </span>
                <span className="text-[11px] text-secondary font-semibold">+3.8 hrs</span>
              </div>
              <div>
                <p className="text-xl font-bold text-on-surface leading-none mb-1">
                  4.2<span className="text-xs text-on-surface-variant font-normal ml-1">x Flow</span>
                </p>
                <p className="text-xs text-on-surface-variant">Focus velocity</p>
              </div>
              {/* Sparkline Indicator SVG */}
              <div className="w-full h-7 mt-2">
                <svg className="w-full h-full" fill="none" viewBox="0 0 100 28">
                  <path
                    className="text-primary"
                    d="M0 22 C 20 22, 25 14, 45 15 C 65 16, 75 5, 100 2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <path
                    className="text-primary/10"
                    d="M0 22 C 20 22, 25 14, 45 15 C 65 16, 75 5, 100 2 L 100 28 L 0 28 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Intelligent Scheduling Preview */}
            <div className="rounded-2xl bg-surface-container-high/90 backdrop-blur-md p-3.5 flex flex-col justify-between shadow-md border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-base">nest_clock_farsight_analog</span>
                </span>
                <span className="text-xs text-on-surface-variant font-medium">11:00 AM</span>
              </div>
              <div className="bg-surface-container-lowest/80 rounded-xl p-2 mb-1 shadow-inner">
                <p className="text-xs font-semibold text-on-surface truncate">Strategic Audit</p>
                <p className="text-[10px] text-primary flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Tier 1 Deep Work
                </p>
              </div>
              <div className="w-full bg-surface-container-lowest rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-primary via-primary-container to-secondary h-full rounded-full w-3/4" />
              </div>
            </div>
          </div>

          {/* Bento Micro Task Stream item */}
          <div className="rounded-2xl bg-surface-container-low/95 p-3 flex items-center justify-between shadow-sm border border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-primary-container flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </div>
              <span className="text-xs font-medium text-on-surface">Cap-table allocation refined</span>
            </div>
            <span className="text-[10px] text-on-surface-variant font-semibold px-2 py-0.5 rounded-md bg-surface-container-high">
              Done
            </span>
          </div>
        </div>
      </div>

      {/* Carousel Pagination Dots */}
      <div className="flex items-center justify-center gap-2 my-2">
        {[1, 2, 3].map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => setCurrentStep(step)}
            aria-label={`Go to step ${step}`}
            className={`transition-all duration-300 ${
              step === currentStep
                ? 'h-2 w-8 rounded-full bg-primary shadow-sm shadow-primary/40'
                : 'h-2 w-2 rounded-full bg-surface-container-highest hover:bg-surface-container-high'
            }`}
          />
        ))}
      </div>

      {/* Headings & Narrative */}
      <div className="text-center px-2 my-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-semibold mb-3 border border-white/5">
          <span className="material-symbols-outlined text-xs">auto_awesome</span>
          <span>{currentData.badge}</span>
        </div>
        <h2 className="font-syne text-2xl font-bold text-on-surface tracking-tight mb-2.5 leading-snug">
          {currentData.title}
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-xs mx-auto leading-relaxed">
          {currentData.body}
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="mt-4 flex flex-col items-center gap-3 w-full">
        <button
          type="button"
          onClick={handleNext}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary via-primary-container to-surface-tint text-on-primary font-bold text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:brightness-105"
        >
          <span>{currentStep === totalSteps ? 'Enter Executive Workspace' : 'Get Started'}</span>
          <span className="material-symbols-outlined text-lg">
            {currentStep === totalSteps ? 'check_circle' : 'arrow_forward'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('signin')}
          className="py-2 px-4 rounded-xl text-on-surface/80 hover:text-on-surface text-xs font-medium active:bg-surface-container-low transition-colors"
        >
          Already have an account?{' '}
          <span className="text-primary font-semibold ml-1 underline decoration-primary/40">
            Sign In
          </span>
        </button>
      </div>
    </div>
  );
};
