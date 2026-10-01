import React from 'react';
import { ASSETS } from '../data/initialData';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  title?: string;
  subtitle?: string;
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  title = 'Home',
  subtitle = 'Executive Suite',
  onNavigate,
  onBack,
  showBack = false,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.45)] border-b border-surface-container-high/40">
      <div className="pt-safe">
        {/* iOS-style Status Bar indicator */}
        <div className="h-6 px-4 flex items-center justify-between text-on-surface-variant font-medium text-xs select-none">
          <span className="text-on-surface font-semibold tracking-tight">9:41</span>
          <div className="flex items-center gap-1.5 opacity-90">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[16px]">battery_full</span>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="h-14 px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {showBack ? (
              <button
                type="button"
                onClick={onBack ? onBack : () => onNavigate('home')}
                aria-label="Go Back"
                className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-colors bg-surface-container-low/60 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group text-left min-w-0 active:scale-98 transition-transform"
            >
              <img
                src={ASSETS.logo}
                alt="Bilal Jutt Monogram"
                className="h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(229,184,105,0.3)] transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] tracking-widest uppercase text-primary/80 font-semibold leading-tight">
                  {subtitle}
                </span>
                <h1 className="font-semibold text-base text-on-surface truncate tracking-tight leading-tight">
                  {title}
                </h1>
              </div>
            </button>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {currentScreen !== 'search' && (
              <button
                type="button"
                onClick={() => onNavigate('search')}
                aria-label="Global Search"
                className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-all bg-surface-container-low/60 active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate('profile')}
              aria-label="Executive Profile"
              className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-primary-container/50 to-surface-container-high flex items-center justify-center hover:opacity-95 transition-all active:scale-95 shadow-sm"
            >
              <img
                src={ASSETS.bilalAvatar}
                alt="Bilal Jutt Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
