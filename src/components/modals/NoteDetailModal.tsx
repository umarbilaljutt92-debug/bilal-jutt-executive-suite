import React, { useState } from 'react';
import { Note } from '../../types';

interface NoteDetailModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateNote: (updatedNote: Note) => void;
  onDeleteNote: (noteId: string) => void;
}

export const NoteDetailModal: React.FC<NoteDetailModalProps> = ({
  note,
  isOpen,
  onClose,
  onUpdateNote,
  onDeleteNote,
}) => {
  if (!isOpen || !note) return null;

  const [title, setTitle] = useState(note.title);
  const [category, setCategory] = useState(note.category);
  const [body, setBody] = useState(note.body);
  const [isEditing, setIsEditing] = useState(false);

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateNote({
      ...note,
      title: title.trim(),
      category,
      body: body.trim(),
    });
    setIsEditing(false);
  };

  const handleToggleStar = () => {
    onUpdateNote({
      ...note,
      isStarred: !note.isStarred,
    });
  };

  const handleToggleBookmark = () => {
    onUpdateNote({
      ...note,
      isBookmarked: !note.isBookmarked,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                category === 'strategic'
                  ? 'bg-surface-container-high text-secondary'
                  : category === 'personal'
                  ? 'bg-surface-container-high text-tertiary'
                  : category === 'ideas'
                  ? 'bg-surface-container-high text-primary'
                  : 'bg-primary-container/20 text-primary'
              }`}
            >
              {category}
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium">
              • {note.timestamp} • {note.readTime}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleToggleBookmark}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                note.isBookmarked ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              title="Bookmark Note"
            >
              <span className="material-symbols-outlined text-[18px]">
                {note.isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleToggleStar}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                note.isStarred ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              title="Star Note"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={note.isStarred ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                star
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Content View / Edit Mode */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                Memo Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 px-3.5 bg-surface text-on-surface rounded-xl text-sm outline-none border border-white/10 focus:border-primary/40"
                required
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                Category
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['strategic', 'ventures', 'personal', 'ideas'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`h-8 rounded-lg text-xs font-semibold capitalize transition-all ${
                      category === cat
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface text-on-surface-variant border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant">
                  Content Body
                </label>
                <span className="text-[10px] text-outline">{wordCount} words</span>
              </div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                className="w-full p-3.5 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/10 focus:border-primary/40 leading-relaxed resize-none"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-full text-xs text-on-surface-variant hover:text-on-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105 active:scale-95"
              >
                Save Memo
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface tracking-tight leading-snug">
                {note.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-1">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>Hardware Enclave Encrypted</span>
              </div>
            </div>

            {note.image && (
              <div className="w-full h-44 rounded-2xl overflow-hidden shadow-inner border border-white/5">
                <img
                  src={note.image}
                  alt={note.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-4 rounded-2xl bg-surface-container/60 border border-white/5 text-xs text-on-surface leading-relaxed whitespace-pre-line">
              {note.body}
            </div>

            {/* Blueprints / Items metadata if available */}
            {(note.blueprints || note.itemsCount) && (
              <div className="flex items-center gap-3 text-xs text-outline pt-1">
                {note.blueprints && (
                  <span className="flex items-center gap-1 font-semibold text-secondary">
                    <span className="material-symbols-outlined text-[15px]">attachment</span>
                    {note.blueprints} Blueprint Schematics
                  </span>
                )}
                {note.itemsCount && (
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <span className="material-symbols-outlined text-[15px]">checklist</span>
                    {note.itemsCount} Actionable Items
                  </span>
                )}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-surface-container-high">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit Memo</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(`${note.title}\n\n${note.body}`);
                    alert('Note content copied to clipboard.');
                  }}
                  className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary"
                  title="Copy Content"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Permanently purge this memo from executive archive?')) {
                      onDeleteNote(note.id);
                      onClose();
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-error hover:bg-error-container/20"
                  title="Delete Note"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
