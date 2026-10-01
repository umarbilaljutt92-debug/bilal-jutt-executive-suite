import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { Note, NoteCategory } from '../types';
import { NoteDetailModal, ExportVaultModal } from '../components/ExecutiveModals';
import { showExecutiveToast } from '../utils/toast';

interface NotesScreenProps {
  notes: Note[];
  onAddNote: (newNote: Omit<Note, 'id'>) => void;
  onUpdateNote?: (noteId: string, updates: Partial<Note>) => void;
  onDeleteNote?: (noteId: string) => void;
  onToggleStar?: (noteId: string) => void;
  onToggleBookmark?: (noteId: string) => void;
  onToggleLike?: (noteId: string) => void;
  isNewNoteModalOpen?: boolean;
  onCloseNewNoteModal?: () => void;
}

export const NotesScreen: React.FC<NotesScreenProps> = ({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onToggleStar,
  onToggleBookmark,
  onToggleLike,
  isNewNoteModalOpen = false,
  onCloseNewNoteModal,
}) => {
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory>('all');
  const [localModalOpen, setLocalModalOpen] = useState(false);
  const [selectedNoteDetail, setSelectedNoteDetail] = useState<Note | null>(null);
  const [showVaultModal, setShowVaultModal] = useState(false);

  // New Note Modal state
  const [memoTitle, setMemoTitle] = useState('');
  const [memoCategory, setMemoCategory] = useState<'strategic' | 'ventures' | 'personal' | 'ideas'>('strategic');
  const [memoBody, setMemoBody] = useState('');

  const showModal = isNewNoteModalOpen || localModalOpen;
  const closeModal = () => {
    setLocalModalOpen(false);
    if (onCloseNewNoteModal) onCloseNewNoteModal();
  };

  const handleToggleStar = (id: string) => {
    if (onToggleStar) onToggleStar(id);
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleBookmark) onToggleBookmark(id);
  };

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleLike) onToggleLike(id);
  };

  const handleSaveMemo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!memoTitle.trim()) return;

    const newNoteObj: Omit<Note, 'id'> = {
      title: memoTitle.trim(),
      category: memoCategory,
      body: memoBody.trim() || 'Executive memorandum logged in sovereign ledger.',
      timestamp: 'Just now',
      readTime: '1 min read',
      isStarred: false,
    };

    onAddNote(newNoteObj);
    setMemoTitle('');
    setMemoBody('');
    closeModal();
    showExecutiveToast('New memo saved to sovereign ledger.', 'success');
  };

  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      selectedCategory === 'all' ? true : note.category === selectedCategory;
    const matchesQuery =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categoryCounts = {
    all: notes.length,
    strategic: notes.filter((n) => n.category === 'strategic').length,
    ventures: notes.filter((n) => n.category === 'ventures').length,
    personal: notes.filter((n) => n.category === 'personal').length,
    ideas: notes.filter((n) => n.category === 'ideas').length,
  };

  const priorityNote = notes.find((n) => n.isPriority) || notes[0];

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto select-none gap-y-4">
      {/* Header Utility Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            description
          </span>
          <span className="font-semibold text-lg text-on-surface tracking-tight">
            Executive Notes
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-full shadow-inner border border-white/5">
          <button
            type="button"
            onClick={() => setLayoutMode('grid')}
            title="Grid View"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              layoutMode === 'grid'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode('list')}
            title="List View"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              layoutMode === 'list'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">view_agenda</span>
          </button>
        </div>
      </div>

      {/* Glassmorphic Search Bar */}
      <div className="relative w-full flex items-center">
        <div className="absolute left-3.5 flex items-center pointer-events-none text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px]">search</span>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search memos, ideas & dossiers..."
          className="w-full h-11 pl-10 pr-9 bg-surface-container-low text-on-surface placeholder:text-outline text-xs rounded-2xl outline-none focus:bg-surface-container transition-all shadow-sm border border-white/5"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 text-outline hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">cancel</span>
          </button>
        )}
      </div>

      {/* Category Chips (Horizontal Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
        {(['all', 'strategic', 'ventures', 'personal', 'ideas'] as NoteCategory[]).map((cat) => {
          const isActive = selectedCategory === cat;
          const displayLabel = cat.charAt(0).toUpperCase() + cat.slice(1);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 h-8 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 ${
                isActive
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border border-white/5'
              }`}
            >
              <span>{cat === 'all' ? 'All Notes' : displayLabel}</span>
              <span className="text-[10px] opacity-80">({categoryCounts[cat]})</span>
            </button>
          );
        })}
      </div>

      {/* Hero Card: Pinned / Starred Priority Thesis Note */}
      {priorityNote && (
        <div
          onClick={() => setSelectedNoteDetail(priorityNote)}
          className="relative w-full rounded-3xl bg-surface-container-low p-4 shadow-lg overflow-hidden flex flex-col gap-2.5 group transition-transform active:scale-[0.99] border border-white/5 cursor-pointer"
        >
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary-container/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                push_pin
              </span>
              <span>Priority Thesis</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary-fixed-dim text-[10px] font-bold">
                {priorityNote.category}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleStar(priorityNote.id);
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-primary"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={priorityNote.isStarred ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  star
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 z-10">
            <h2 className="text-base font-bold text-on-surface tracking-tight">
              {priorityNote.title}
            </h2>
            <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
              {priorityNote.body}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest/30 text-xs text-on-surface-variant z-10 mt-1">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              <span>{priorityNote.timestamp}</span>
              <span>•</span>
              <span>{priorityNote.readTime}</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNoteDetail(priorityNote);
              }}
              className="flex items-center gap-1 text-primary font-semibold text-xs hover:underline"
            >
              <span>Review</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Visual Asset: Vault Dossier Aesthetic Break */}
      <div
        onClick={() => setShowVaultModal(true)}
        className="relative w-full h-24 rounded-2xl overflow-hidden shadow-md flex items-center px-4 border border-white/5 cursor-pointer active:scale-98 transition-transform group"
      >
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.4] group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${ASSETS.vaultLedger})` }}
        />
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
              Vault Dossier
            </span>
            <span className="font-syne text-base text-on-surface font-bold">
              Bilal's Sovereign Ledger
            </span>
            <span className="text-[10px] text-on-surface-variant">Encrypted synchrony active</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container-low/80 backdrop-blur-md flex items-center justify-center text-primary shadow-sm border border-white/10 group-hover:bg-primary group-hover:text-on-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </div>
        </div>
      </div>

      {/* Recent Notes Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base text-on-surface">Recent Notes</span>
          <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] flex items-center justify-center font-bold">
            {filteredNotes.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
        >
          <span>View Archive</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {/* Notes Grid / List Container */}
      <div
        className={
          layoutMode === 'list'
            ? 'flex flex-col gap-2.5 transition-all'
            : 'grid grid-cols-2 gap-3 transition-all'
        }
      >
        {filteredNotes.map((note, index) => {
          const isLarge = layoutMode === 'grid' && (index === 2 || note.image);
          return (
            <div
              key={note.id}
              onClick={() => setSelectedNoteDetail(note)}
              className={`bg-surface-container-low rounded-2xl p-3.5 flex flex-col justify-between gap-2.5 shadow-sm hover:bg-surface-container transition-all cursor-pointer border border-white/5 active:scale-[0.99] ${
                isLarge ? 'col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        note.category === 'strategic'
                          ? 'bg-surface-container-high text-secondary'
                          : note.category === 'personal'
                          ? 'bg-surface-container-high text-tertiary'
                          : note.category === 'ideas'
                          ? 'bg-surface-container-high text-primary'
                          : 'bg-surface-container-high text-primary-fixed'
                      }`}
                    >
                      {note.category}
                    </span>
                    <span className="text-[10px] text-outline">{note.timestamp}</span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-semibold text-on-surface line-clamp-1 leading-snug">
                    {note.title}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                    {note.body}
                  </p>
                </div>

                {note.image && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-inner border border-white/5">
                    <img
                      src={note.image}
                      alt={note.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-surface-container-highest/20 text-[10px] text-outline">
                <div className="flex items-center gap-2">
                  {note.blueprints && (
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px]">attachment</span>
                      {note.blueprints} Blueprints
                    </span>
                  )}
                  {note.itemsCount && (
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px]">checklist</span>
                      {note.itemsCount} Items
                    </span>
                  )}
                  {!note.blueprints && !note.itemsCount && <span>{note.readTime}</span>}
                </div>

                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <button
                    type="button"
                    onClick={(e) => handleToggleBookmark(note.id, e)}
                    className="hover:text-primary transition-colors"
                  >
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={note.isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      bookmark
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleToggleLike(note.id, e)}
                    className="hover:text-primary transition-colors"
                  >
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={note.isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      favorite
                    </span>
                  </button>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button (FAB) for New Note */}
      <div className="fixed bottom-24 right-5 z-30">
        <button
          type="button"
          onClick={() => setLocalModalOpen(true)}
          className="flex items-center gap-2 pl-4 pr-5 h-12 rounded-full bg-primary-container text-on-primary-container text-xs font-bold shadow-[0_8px_24px_-4px_rgba(229,184,105,0.45)] hover:scale-105 active:scale-95 transition-all"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            edit_square
          </span>
          <span>+ New Note</span>
        </button>
      </div>

      {/* Note Detail Reader Modal */}
      <NoteDetailModal
        isOpen={Boolean(selectedNoteDetail)}
        onClose={() => setSelectedNoteDetail(null)}
        note={selectedNoteDetail}
        onToggleStar={handleToggleStar}
        onEditNote={(id, updates) => {
          if (onUpdateNote) onUpdateNote(id, updates);
          setSelectedNoteDetail((prev) => (prev ? { ...prev, ...updates } : null));
        }}
        onDeleteNote={(id) => {
          if (onDeleteNote) onDeleteNote(id);
          setSelectedNoteDetail(null);
        }}
      />

      {/* Sovereign Ledger Vault Modal */}
      <ExportVaultModal
        isOpen={showVaultModal}
        onClose={() => setShowVaultModal(false)}
      />

      {/* Quick Note Slide-up Modal Drawer */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 flex flex-col gap-4 shadow-2xl border border-surface-container-highest animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="font-semibold text-base text-on-surface">New Executive Memo</span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveMemo} className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                  Subject Title
                </label>
                <input
                  type="text"
                  value={memoTitle}
                  onChange={(e) => setMemoTitle(e.target.value)}
                  placeholder="e.g. Sovereign Liquidity Allocation"
                  className="w-full h-11 px-3.5 bg-surface text-on-surface rounded-xl text-sm outline-none border border-white/5 focus:border-primary/40"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                  Category
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['strategic', 'ventures', 'personal', 'ideas'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setMemoCategory(cat)}
                      className={`h-8 rounded-lg text-[10px] uppercase font-bold transition-all ${
                        memoCategory === cat
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface text-on-surface-variant border border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                  Strategic Content
                </label>
                <textarea
                  value={memoBody}
                  onChange={(e) => setMemoBody(e.target.value)}
                  placeholder="Synthesize strategic insight or voice dictation..."
                  rows={4}
                  className="w-full p-3.5 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/5 focus:border-primary/40 resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <button
                    type="button"
                    onClick={() => showExecutiveToast('Dictation mode active. Recording voice memo...', 'gold')}
                    className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:text-primary transition-colors border border-white/5"
                  >
                    <span className="material-symbols-outlined text-[16px]">mic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showExecutiveToast('Confidential asset attached to memo.', 'success')}
                    className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:text-primary transition-colors border border-white/5"
                  >
                    <span className="material-symbols-outlined text-[16px]">attach_file</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="px-5 h-9 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all"
                  >
                    Save Memo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
