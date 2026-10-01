import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/initialData';
import { ScreenType } from '../types';

interface SplashScreenProps {
  onProceed: (target?: ScreenType) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onProceed }) => {
  const [progress, setProgress] = useState(68);
  const [statusText, setStatusText] = useState('Establishing Secure Session...');

  const stages = [
    { progress: 74, text: 'Synchronizing Encrypted Vault...' },
    { progress: 89, text: 'Verifying Biometric Handshake...' },
    { progress: 97, text: 'Unlocking Executive Workspace...' },
    { progress: 100, text: 'Welcome, Bilal' },
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < stages.length) {
        setProgress(stages[index].progress);
        setStatusText(stages[index].text);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-surface text-on-surface flex flex-col justify-between p-6 select-none overflow-hidden pt-safe pb-safe">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-container/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Starlight Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[18%] left-[15%] w-1 h-1 bg-primary rounded-full animate-ping opacity-60" />
        <div className="absolute top-[28%] right-[22%] w-1.5 h-1.5 bg-primary-fixed rounded-full blur-[0.5px] opacity-75" />
        <div className="absolute top-[48%] left-[12%] w-1 h-1 bg-primary-container rounded-full opacity-50" />
        <div className="absolute top-[62%] right-[16%] w-1.5 h-1.5 bg-secondary-fixed rounded-full blur-[0.5px] opacity-40" />
        <div className="absolute top-[75%] left-[28%] w-1 h-1 bg-primary rounded-full opacity-60" />
      </div>

      {/* Top Status Indicators */}
      <div className="relative z-10 w-full flex justify-between items-center px-2 pt-4 opacity-85">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/60 backdrop-blur-md border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] tracking-widest text-primary uppercase font-bold">Encrypted</span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant/80 text-[10px] tracking-wider uppercase font-semibold">
          <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
          <span>Tier 1 Sovereign</span>
        </div>
      </div>

      {/* Centerpiece: Monogram & Identity */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto px-4">
        {/* Monogram Box with Orbital Halo */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-36 h-36 rounded-3xl bg-primary/20 blur-2xl animate-pulse" />
          <div className="absolute w-28 h-28 rounded-2xl bg-primary-container/30 blur-md" />

          {/* Main Logo Glass Box */}
          <div className="relative z-10 w-[110px] h-[110px] rounded-2xl bg-surface-container-high/90 backdrop-blur-xl p-3 flex items-center justify-center shadow-2xl shadow-primary-container/20 border border-primary/20">
            <img
              src={ASSETS.logo}
              alt="Bilal Jutt Luxury Monogram Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(229,184,105,0.45)]"
            />
          </div>

          {/* Orbital Rotating Dashed Ring */}
          <div className="absolute -inset-3 rounded-full opacity-25 pointer-events-none">
            <svg className="w-full h-full animate-[spin_24s_linear_infinite]" fill="none" viewBox="0 0 140 140">
              <circle
                className="text-primary"
                cx="70"
                cy="70"
                r="66"
                stroke="currentColor"
                strokeDasharray="4 8"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* Identity Typography */}
        <div className="flex flex-col items-center space-y-3">
          <h1 className="font-syne text-3xl sm:text-4xl tracking-[0.22em] text-on-surface uppercase pl-1 drop-shadow-sm font-bold">
            Bilal Jutt
          </h1>
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-primary/60" />
            <p className="text-xs tracking-[0.28em] text-primary font-medium uppercase font-sans">
              Personal Executive Suite
            </p>
            <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-primary/60" />
          </div>
        </div>
      </div>

      {/* Bottom Progress & Access Controls */}
      <div className="relative z-10 w-full max-w-xs mx-auto flex flex-col items-center space-y-4 px-2 pb-6">
        {/* Progress Bar & Status */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center text-on-surface-variant text-xs tracking-wider">
            <span className="text-on-surface/90 font-medium truncate">{statusText}</span>
            <span className="text-primary font-semibold tabular-nums ml-2">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden p-0.5 backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-primary-container via-primary to-primary-fixed rounded-full shadow-[0_0_12px_rgba(229,184,105,0.6)] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Button after or during loading */}
        <button
          type="button"
          onClick={() => onProceed('onboarding')}
          className="w-full h-12 rounded-full bg-gradient-to-r from-primary-fixed-dim via-primary-container to-surface-tint text-on-primary font-semibold text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 hover:brightness-105 transition-all"
        >
          <span>{progress === 100 ? 'Enter Executive Workspace' : 'Continue to Suite'}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        {/* Version Footnote Badge */}
        <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-surface-container/70 border border-white/5 shadow-sm">
          <span
            className="material-symbols-outlined text-primary text-xs"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shield
          </span>
          <span className="text-[10px] tracking-wider text-on-surface-variant/80 font-medium">
            v2.4.0 • Executive Edition
          </span>
        </div>
      </div>
    </div>
  );
};
