import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  unreadCount = 2,
}) => {
  const tabs: { id: ScreenType; label: string; icon: string; hasBadge?: boolean }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'tasks', label: 'Tasks', icon: 'check_box' },
    { id: 'notes', label: 'Notes', icon: 'edit_note' },
    { id: 'alerts', label: 'Alerts', icon: 'notifications', hasBadge: unreadCount > 0 },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe pointer-events-none">
      <div className="px-4 pb-3 max-w-md mx-auto pointer-events-auto">
        <div className="h-16 px-2 bg-surface-container-low/95 backdrop-blur-2xl rounded-full shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] border border-surface-container-highest/40 flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = currentScreen === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center min-w-[48px] min-h-[44px] w-14 h-12 transition-all duration-200 gap-0.5 active:scale-90 ${
                  isActive
                    ? 'text-primary-container drop-shadow-[0_0_12px_rgba(229,184,105,0.5)] font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className={`material-symbols-outlined text-[22px] transition-transform ${
                      isActive ? 'scale-110' : ''
                    }`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {tab.icon}
                  </span>
                  {tab.hasBadge && unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface-container-low shadow-[0_0_6px_rgba(229,184,105,0.8)]" />
                  )}
                </div>
                <span className="text-[10px] tracking-tight font-medium leading-none">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-4 h-0.5 rounded-full bg-primary-container" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
