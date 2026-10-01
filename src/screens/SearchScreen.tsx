import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/initialData';
import { ScreenType } from '../types';
import { ContactDossierModal } from '../components/ExecutiveModals';
import { getStoredItem, setStoredItem, STORAGE_KEYS } from '../utils/storage';

interface SearchScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onBack: () => void;
}

const DEFAULT_RECENT_SEARCHES = [
  'Venture syndicate deck',
  'Real estate acquisition terms',
  'Quarterly portfolio performance',
];

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const [query, setQuery] = useState('Venture syndicate deck');
  const [activeTab, setActiveTab] = useState<'All' | 'Tasks' | 'Notes' | 'Documents' | 'Calendar' | 'Contacts'>('All');
  const [showContactModal, setShowContactModal] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    getStoredItem<string[]>(STORAGE_KEYS.RECENT_SEARCHES, DEFAULT_RECENT_SEARCHES)
  );

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.RECENT_SEARCHES, recentSearches);
  }, [recentSearches]);

  const handleRemoveRecent = (index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllRecent = () => {
    setRecentSearches([]);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto select-none space-y-4">
      {/* Search Header Input Section */}
      <div className="flex items-center gap-2 w-full py-1">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all shadow-sm border border-white/5"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
        </button>

        <div className="relative flex-1 flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, notes, files, contacts..."
            className="w-full h-12 pl-10 pr-9 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-xs outline-none focus:bg-surface-container transition-all border border-white/5"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear text"
              className="absolute right-3 w-5 h-5 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="px-2 h-12 flex items-center justify-center text-xs font-semibold text-primary hover:text-primary-container active:scale-95 transition-all"
        >
          Cancel
        </button>
      </div>

      {/* Filter Chips Horizontal Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 -mx-4 px-4 no-scrollbar">
        {(['All', 'Tasks', 'Notes', 'Documents', 'Calendar', 'Contacts'] as const).map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`h-8 px-3.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 ${
                isSelected
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border border-white/5'
              }`}
            >
              {tab === 'All' && (
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
              )}
              {tab === 'Tasks' && <span className="material-symbols-outlined text-[15px]">check_circle</span>}
              {tab === 'Notes' && <span className="material-symbols-outlined text-[15px]">article</span>}
              {tab === 'Documents' && <span className="material-symbols-outlined text-[15px]">folder_open</span>}
              {tab === 'Calendar' && <span className="material-symbols-outlined text-[15px]">calendar_today</span>}
              {tab === 'Contacts' && <span className="material-symbols-outlined text-[15px]">person</span>}
              <span>{tab}</span>
            </button>
          );
        })}
      </div>

      {/* Top Matching Assets Section */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
            <h2 className="text-xs uppercase font-bold text-on-surface tracking-wider">
              Top Matching Assets
            </h2>
          </div>
          <span className="text-[10px] text-primary px-2 py-0.5 rounded-full bg-primary-container/20 font-bold">
            3 Live Hits
          </span>
        </div>

        {/* Results Cluster */}
        <div className="flex flex-col gap-2.5">
          {/* Match 1: Task */}
          {(activeTab === 'All' || activeTab === 'Tasks') && (
            <div
              onClick={() => onNavigate('tasks')}
              className="group p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm border border-white/5 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                      High Priority Task
                    </span>
                    <h3 className="text-xs font-semibold text-on-surface mt-0.5 truncate">
                      Finalize{' '}
                      <span className="bg-primary/20 text-primary px-1 rounded font-bold">
                        Venture Syndicate
                      </span>{' '}
                      Deck
                    </h3>
                    <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-1">
                      Align LP terms and capital deployment model prior to global partner sign-off.
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-primary text-on-primary text-[10px] font-bold shrink-0 flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[12px]">alarm</span>
                  <span>Due 10:00 AM</span>
                </span>
              </div>
            </div>
          )}

          {/* Match 2: Note */}
          {(activeTab === 'All' || activeTab === 'Notes') && (
            <div
              onClick={() => onNavigate('notes')}
              className="group p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer shadow-sm border border-white/5 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">description</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-secondary uppercase font-bold tracking-wider">
                      Executive Note
                    </span>
                    <h3 className="text-xs font-semibold text-on-surface mt-0.5 truncate">
                      Q4 Capital Allocation{' '}
                      <span className="bg-primary/25 text-primary px-1.5 py-0.2 rounded font-bold">
                        Thesis
                      </span>
                    </h3>
                    <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                      Macro interest trajectory and synthetic credit hedges across primary European real estate holdings.
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-1">
                  chevron_right
                </span>
              </div>
              <div className="mt-2.5 pt-1 flex items-center gap-2 text-on-surface-variant text-[10px] border-t border-surface-container-highest/20">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">edit_note</span> Updated 2h ago
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">lock</span> Confidential
                </span>
              </div>
            </div>
          )}

          {/* Match 3: Contact */}
          {(activeTab === 'All' || activeTab === 'Contacts') && (
            <div
              onClick={() => setShowContactModal(true)}
              className="p-3.5 rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-2.5 border border-white/5 cursor-pointer hover:bg-surface-container transition-all active:scale-[0.99]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-11 h-11 shrink-0">
                    <img
                      src={ASSETS.tariqMansoorAvatar}
                      alt="Tariq Mansoor Portrait"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary-container ring-2 ring-surface-container-low" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-on-surface truncate">Tariq Mansoor</h3>
                      <span
                        className="material-symbols-outlined text-primary text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant truncate">
                      Lead Partner • London &amp; Dubai
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <a
                    href="tel:+971501234567"
                    aria-label="Call Tariq Mansoor"
                    className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface flex items-center justify-center transition-colors active:scale-95 border border-white/5"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                  </a>
                  <a
                    href="mailto:tariq@bilaljutt.com"
                    aria-label="Email Tariq Mansoor"
                    className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface flex items-center justify-center transition-colors active:scale-95 border border-white/5"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recent Searches Section */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-outline text-[16px]">history</span>
            <h2 className="text-xs uppercase font-bold text-on-surface tracking-wider">
              Recent Searches
            </h2>
          </div>
          {recentSearches.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllRecent}
              className="text-[10px] text-primary hover:underline transition-colors font-medium"
            >
              Clear recent searches
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          {recentSearches.length === 0 ? (
            <div className="py-4 text-center text-outline text-xs">No recent searches</div>
          ) : (
            recentSearches.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors border border-white/5"
              >
                <button
                  type="button"
                  onClick={() => setQuery(item)}
                  className="flex items-center gap-2.5 text-left flex-1 min-w-0"
                >
                  <span className="material-symbols-outlined text-outline text-[16px] shrink-0">
                    history
                  </span>
                  <span className="text-xs text-on-surface truncate">{item}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveRecent(index)}
                  aria-label="Remove search history entry"
                  className="w-6 h-6 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Ambient Neural Query Micro-Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-surface-container-low to-surface-container-lowest flex items-center justify-between gap-3 border border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface">Neural Query Active</p>
            <p className="text-[10px] text-outline">Indexing 1,420 private ledger nodes &amp; archives</p>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
      </div>

      {/* Contact Dossier Modal */}
      <ContactDossierModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  );
};
