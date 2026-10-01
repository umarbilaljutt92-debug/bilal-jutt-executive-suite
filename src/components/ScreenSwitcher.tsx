import React, { useState } from 'react';
import { ScreenType } from '../types';

interface ScreenSwitcherProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenType; label: string; group: string; icon: string }[] = [
    { id: 'splash', label: 'Splash Screen', group: 'Auth & Entry', icon: 'lock_open' },
    { id: 'onboarding', label: 'Onboarding Flow', group: 'Auth & Entry', icon: 'auto_awesome' },
    { id: 'signin', label: 'Sign In Screen', group: 'Auth & Entry', icon: 'login' },
    { id: 'signup', label: 'Create Account', group: 'Auth & Entry', icon: 'person_add' },
    { id: 'home', label: 'Home Dashboard', group: 'Core Suite', icon: 'home' },
    { id: 'tasks', label: 'Tasks & Milestones', group: 'Core Suite', icon: 'check_box' },
    { id: 'notes', label: 'Executive Notes', group: 'Core Suite', icon: 'edit_note' },
    { id: 'alerts', label: 'Alerts & Briefings', group: 'Core Suite', icon: 'notifications' },
    { id: 'profile', label: 'Executive Dossier', group: 'Management', icon: 'badge' },
    { id: 'edit_profile', label: 'Edit Profile', group: 'Management', icon: 'edit' },
    { id: 'settings', label: 'Suite Settings', group: 'Management', icon: 'settings' },
    { id: 'search', label: 'Asset Search', group: 'Tools & VIP', icon: 'search' },
    { id: 'help', label: 'Concierge & VIP Help', group: 'Tools & VIP', icon: 'support_agent' },
    { id: 'concierge_chat', label: 'Live Concierge Chat', group: 'Tools & VIP', icon: 'chat' },
  ];

  const currentLabel = screens.find((s) => s.id === currentScreen)?.label || currentScreen;

  return (
    <>
      {/* Floating Pill Trigger */}
      <div className="fixed top-1.5 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface-container-highest/90 border border-primary/30 text-on-surface hover:text-primary text-[11px] font-medium backdrop-blur-md shadow-lg shadow-black/50 active:scale-95 transition-all"
          title="Switch Screen View"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-primary font-semibold truncate max-w-[130px]">{currentLabel}</span>
          <span className="material-symbols-outlined text-[13px] text-outline">unfold_more</span>
        </button>
      </div>

      {/* Screen Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  dashboard_customize
                </span>
                <div>
                  <h3 className="font-semibold text-base text-on-surface">Screen Navigator</h3>
                  <p className="text-xs text-on-surface-variant">Switch between all 14 screens from the brief</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar py-3 space-y-4">
              {['Auth & Entry', 'Core Suite', 'Management', 'Tools & VIP'].map((group) => (
                <div key={group}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-outline px-2 block mb-1.5">
                    {group}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {screens
                      .filter((s) => s.group === group)
                      .map((screen) => {
                        const isCurrent = screen.id === currentScreen;
                        return (
                          <button
                            key={screen.id}
                            type="button"
                            onClick={() => {
                              onSelectScreen(screen.id);
                              setIsOpen(false);
                            }}
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all ${
                              isCurrent
                                ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
                                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                            }`}
                          >
                            <span
                              className={`material-symbols-outlined text-[18px] ${
                                isCurrent ? 'text-on-primary-container' : 'text-primary'
                              }`}
                            >
                              {screen.icon}
                            </span>
                            <span className="text-xs truncate">{screen.label}</span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-surface-container-high text-center">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-bright transition-colors"
              >
                Close Navigator
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
