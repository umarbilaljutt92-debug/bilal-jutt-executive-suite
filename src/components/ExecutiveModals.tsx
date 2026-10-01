import React from 'react';
import { ASSETS } from '../data/initialData';
import { Task, Note } from '../types';
import { showExecutiveToast } from '../utils/toast';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: string;
  iconColor?: string;
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon = 'shield',
  iconColor = 'text-primary',
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center">
              <span
                className={`material-symbols-outlined text-[18px] ${iconColor}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {icon}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-on-surface leading-tight">{title}</h3>
              {subtitle && <p className="text-[10px] text-on-surface-variant">{subtitle}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="overflow-y-auto no-scrollbar py-3.5 space-y-3.5 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

// 1. Executive Terms & Privacy Protocol Modal
export const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalWrapper
    isOpen={isOpen}
    onClose={onClose}
    title="Executive Terms & Sovereignty"
    subtitle="Constitutional Data Protection Protocol"
    icon="gavel"
  >
    <div className="space-y-3 text-xs text-on-surface-variant leading-relaxed">
      <div className="p-3 rounded-2xl bg-surface-container border border-primary/20 flex items-center gap-2.5">
        <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
        <div>
          <span className="text-xs font-bold text-on-surface block">Tier-1 Sovereign Guarantee</span>
          <span className="text-[10px] text-primary">Zero-Knowledge Hardware-Anchored Isolation</span>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-semibold text-on-surface">1. Private Enclave Keys</h4>
        <p>
          Master cipher keys are generated inside device-native Secure Enclaves using FIDO2 standards. No telemetry or unencrypted payloads ever transit public endpoints.
        </p>
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-semibold text-on-surface">2. Synchronous Node Verification</h4>
        <p>
          Air-gapped sync mesh allows instantaneous cross-device replication across authorized iOS, iPadOS, and macOS terminals without third-party escrow.
        </p>
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-semibold text-on-surface">3. Sovereign Ownership</h4>
        <p>
          All intellectual dossiers, cap-table models, and personal voice memos remain your constitutional property with immediate revocation rights.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105 transition-all"
        >
          Acknowledge Protocol
        </button>
      </div>
    </div>
  </ModalWrapper>
);

// 2. Executive Boardroom Video Modal
export const MeetingRoomModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalWrapper
    isOpen={isOpen}
    onClose={onClose}
    title="CEO Advisory • Boardroom Briefing"
    subtitle="Encrypted Video Mesh • Zurich & London Relay"
    icon="videocam"
    iconColor="text-secondary"
  >
    <div className="space-y-3">
      {/* Video Simulation Box */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-black border border-surface-container-highest shadow-inner flex items-center justify-center">
        <img
          src={ASSETS.singaporeSkyline}
          alt="Boardroom"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-secondary font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span>LIVE • 00:14:22</span>
        </div>
        <div className="absolute top-3 right-3 text-white text-xs font-mono">
          256-bit GCM
        </div>

        {/* Floating participant tiles */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={ASSETS.femalePartnerAvatar}
              alt="Partner"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary"
            />
            <div>
              <span className="text-xs font-bold text-white block leading-tight">Sarah Chen</span>
              <span className="text-[10px] text-white/70">London Partner</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={ASSETS.seniorPartnerAvatar}
              alt="Director"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-secondary"
            />
            <div>
              <span className="text-xs font-bold text-white block leading-tight">Lord Sterling</span>
              <span className="text-[10px] text-white/70">Advisory Chair</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conference Controls */}
      <div className="flex items-center justify-around p-2 rounded-2xl bg-surface-container border border-white/5">
        <button
          type="button"
          onClick={() => showExecutiveToast('Microphone muted', 'info')}
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">mic</span>
        </button>
        <button
          type="button"
          onClick={() => showExecutiveToast('HD Camera feed refreshed', 'info')}
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:text-secondary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">videocam</span>
        </button>
        <button
          type="button"
          onClick={() => showExecutiveToast('Confidential slide deck presentation shared to stream.', 'gold')}
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:text-tertiary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">screen_share</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-error-container text-on-error flex items-center justify-center hover:brightness-110 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">call_end</span>
        </button>
      </div>

      <div className="text-center text-[10px] text-outline">
        Participants have cleared Tier-1 NDAs. Session record stored in cold vault.
      </div>
    </div>
  </ModalWrapper>
);

// 3. Document Scanner Modal
export const DocScannerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalWrapper
    isOpen={isOpen}
    onClose={onClose}
    title="Executive Document Scanner"
    subtitle="Hardware OCR & Neural Boundary Detection"
    icon="document_scanner"
    iconColor="text-secondary"
  >
    <div className="space-y-3">
      {/* Viewport Simulation */}
      <div className="relative w-full h-56 rounded-2xl bg-black border border-secondary/30 overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-4 border-2 border-dashed border-secondary/50 rounded-xl pointer-events-none flex flex-col items-center justify-center">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent animate-pulse absolute top-1/2" />
        </div>
        <span className="material-symbols-outlined text-4xl text-secondary/40 mb-2">
          crop_free
        </span>
        <span className="text-xs text-secondary/80 font-medium z-10 px-4 text-center">
          Align Document Within Boundaries
        </span>
        <span className="text-[10px] text-outline mt-1 z-10">Auto-detecting borders...</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => showExecutiveToast('Scanner torch light enabled', 'info')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface border border-white/5"
        >
          <span className="material-symbols-outlined text-[16px]">flash_on</span>
          <span>Torch</span>
        </button>

        <button
          type="button"
          onClick={() => {
            showExecutiveToast('Document captured: High-resolution PDF synthesized & encrypted.', 'success');
            onClose();
          }}
          className="flex-1 py-3 rounded-full bg-secondary text-on-secondary text-xs font-bold shadow-lg flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          <span>Capture & OCR</span>
        </button>
      </div>
    </div>
  </ModalWrapper>
);

// 4. Note Detail / Reader Modal
export const NoteDetailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onToggleStar?: (id: string) => void;
  onDeleteNote?: (id: string) => void;
  onEditNote?: (id: string, updates: Partial<Note>) => void;
}> = ({ isOpen, onClose, note, onToggleStar, onDeleteNote, onEditNote }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState('');
  const [editBody, setEditBody] = React.useState('');
  const [editCategory, setEditCategory] = React.useState<Note['category']>('strategic');

  React.useEffect(() => {
    if (note) {
      setEditTitle(note.title);
      setEditBody(note.body);
      setEditCategory(note.category);
      setIsEditing(false);
    }
  }, [note]);

  if (!note) return null;

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    if (onEditNote) {
      onEditNote(note.id, {
        title: editTitle.trim(),
        body: editBody.trim(),
        category: editCategory,
      });
    }
    setIsEditing(false);
    showExecutiveToast('Note updated successfully.', 'success');
  };

  const handleDelete = () => {
    if (onDeleteNote) {
      onDeleteNote(note.id);
      showExecutiveToast('Note deleted from ledger.', 'error');
      onClose();
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Executive Memo' : note.title}
      subtitle={isEditing ? 'Update ledger record' : `${note.timestamp} • ${note.readTime}`}
      icon="article"
    >
      <div className="space-y-3.5">
        {!isEditing ? (
          <>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-container-highest text-primary">
                {note.category}
              </span>
              <div className="flex items-center gap-1">
                {onToggleStar && (
                  <button
                    type="button"
                    onClick={() => onToggleStar(note.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-primary active:scale-90 transition-transform"
                    title={note.isStarred ? 'Unstar Note' : 'Star Note'}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={note.isStarred ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      star
                    </span>
                  </button>
                )}
                {onEditNote && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-all"
                    title="Edit Note"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                )}
                {onDeleteNote && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error active:scale-90 transition-all"
                    title="Delete Note"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(`${note.title}\n\n${note.body}`);
                    showExecutiveToast('Memo copied to clipboard.', 'success');
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90 transition-all"
                  title="Copy Memo"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>

            {note.image && (
              <div className="w-full h-40 rounded-2xl overflow-hidden border border-white/5 shadow-md">
                <img src={note.image} alt={note.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-surface-container text-xs text-on-surface leading-relaxed whitespace-pre-wrap font-sans">
              {note.body}
            </div>

            {note.blueprints && (
              <div className="p-3 rounded-xl bg-surface-container-highest/60 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-primary">attachment</span>
                  <span>{note.blueprints} Blueprint Schematics Attached</span>
                </span>
                <span className="text-[10px] text-primary font-bold">Unsealed</span>
              </div>
            )}

            <div className="pt-2 flex items-center gap-2">
              {onDeleteNote && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2.5 rounded-full bg-surface-container text-error text-xs font-semibold hover:bg-error-container/20 transition-colors"
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-bright transition-colors"
              >
                Close Memo
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSaveEdit} className="space-y-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                Note Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full h-11 px-3.5 bg-surface text-on-surface rounded-xl text-sm outline-none border border-white/5 focus:border-primary/40"
                required
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
                    onClick={() => setEditCategory(cat)}
                    className={`h-8 rounded-lg text-[10px] uppercase font-bold transition-all ${
                      editCategory === cat
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
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
                Content
              </label>
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                rows={4}
                className="w-full p-3.5 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/5 focus:border-primary/40 resize-none leading-relaxed"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </ModalWrapper>
  );
};

// 5. Interactive Calendar Sheet Modal
export const CalendarSheetModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalWrapper
    isOpen={isOpen}
    onClose={onClose}
    title="Executive Horizon Calendar"
    subtitle="Enterprise CalDAV & Private Relay Synchronized"
    icon="calendar_month"
    iconColor="text-primary"
  >
    <div className="space-y-3">
      {/* Month Header */}
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-bold text-on-surface">October 2026</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-6 h-6 rounded flex items-center justify-center text-outline hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
          <button
            type="button"
            className="w-6 h-6 rounded flex items-center justify-center text-outline hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Mini Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-outline">
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          const isToday = day === 24;
          const hasEvent = day === 22 || day === 24 || day === 25 || day === 28;
          return (
            <button
              key={i}
              type="button"
              onClick={() => showExecutiveToast(`Scheduled agenda for Oct ${day} locked.`, 'gold')}
              className={`h-8 rounded-xl flex flex-col items-center justify-center relative transition-all ${
                isToday
                  ? 'bg-primary text-on-primary font-bold shadow-md'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <span>{day}</span>
              {hasEvent && !isToday && (
                <span className="w-1 h-1 rounded-full bg-primary absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Scheduled Items for Selected Day */}
      <div className="p-3 rounded-2xl bg-surface-container space-y-2 border border-white/5">
        <span className="text-[10px] uppercase font-bold text-primary block">
          Thursday, Oct 24 • Selected
        </span>
        <div className="flex items-center justify-between text-xs">
          <span className="text-on-surface font-semibold">10:00 AM · Venture Syndicate Deck</span>
          <span className="text-[10px] text-secondary font-bold">Ventures</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-on-surface font-semibold">02:30 PM · CEO Advisory Global</span>
          <span className="text-[10px] text-primary font-bold">High Priority</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold"
      >
        Done
      </button>
    </div>
  </ModalWrapper>
);

// 6. Linked Devices Modal
export const LinkedDevicesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalWrapper
    isOpen={isOpen}
    onClose={onClose}
    title="Linked Devices"
    subtitle="Hardware Tokens & Authorized Terminals"
    icon="devices"
    iconColor="text-secondary"
  >
    <div className="space-y-2.5">
      {[
        { name: 'iPhone 16 Pro Max', status: 'Active Terminal • Now', location: 'Dubai, UAE', primary: true },
        { name: 'iPad Pro M4 (13-inch)', status: 'Last sync: 10m ago', location: 'Dubai, UAE', primary: false },
        { name: 'MacBook Pro M3 Max', status: 'Last sync: 2h ago', location: 'Lahore, PK', primary: false },
      ].map((dev, idx) => (
        <div
          key={idx}
          className="p-3 rounded-2xl bg-surface-container flex items-center justify-between border border-white/5"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[16px]">
                {dev.name.includes('iPhone') ? 'phone_iphone' : dev.name.includes('iPad') ? 'tablet_mac' : 'laptop_mac'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-on-surface">{dev.name}</span>
                {dev.primary && (
                  <span className="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary text-[9px] font-bold">
                    This Device
                  </span>
                )}
              </div>
              <span className="text-[10px] text-on-surface-variant block">{dev.status} · {dev.location}</span>
            </div>
          </div>
          {!dev.primary && (
            <button
              type="button"
              onClick={() => showExecutiveToast(`Device session ${dev.name} revoked.`, 'error')}
              className="text-[10px] text-error hover:underline font-semibold"
            >
              Revoke
            </button>
          )}
        </div>
      ))}

      <div className="pt-2">
        <button
          type="button"
          onClick={() => showExecutiveToast('Ephemeral QR pairing token generated. Ready for secondary scanning.', 'gold')}
          className="w-full py-2.5 rounded-full bg-surface-container-high text-primary text-xs font-bold border border-primary/20 hover:bg-surface-bright transition-colors"
        >
          + Pair New Authorized Hardware
        </button>
      </div>
    </div>
  </ModalWrapper>
);

// 7. PGP Export Vault Modal
export const ExportVaultModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalWrapper
    isOpen={isOpen}
    onClose={onClose}
    title="Export Data Vault"
    subtitle="PGP Zero-Knowledge Encrypted Archive"
    icon="cloud_download"
    iconColor="text-tertiary"
  >
    <div className="space-y-3 text-xs text-on-surface-variant">
      <p>
        Generates an uncorrupted, air-gapped cryptographic archive of all executive dossiers, milestones, and encrypted memos.
      </p>

      <div className="p-3 rounded-2xl bg-surface-container space-y-1.5 font-mono text-[10px] border border-white/5">
        <div className="text-on-surface font-semibold">CIPHER: AES-GCM-256 + RSA-4096</div>
        <div>SHA-256 FINGERPRINT: 8a4f91b2c3d04e...</div>
        <div>PAYLOAD: 14 Memos · 8 Milestones · 3 Blueprints</div>
      </div>

      <button
        type="button"
        onClick={() => {
          showExecutiveToast('PGP payload compiled. Secure download started.', 'success');
          onClose();
        }}
        className="w-full py-3 rounded-full bg-tertiary text-on-tertiary text-xs font-bold shadow-md hover:brightness-105 transition-all"
      >
        Generate &amp; Download Archive
      </button>
    </div>
  </ModalWrapper>
);

// 8. Contact Dossier Modal (for Tariq Mansoor & collaborators)
export const ContactDossierModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <ModalWrapper
    isOpen={isOpen}
    onClose={onClose}
    title="Tariq Mansoor"
    subtitle="Lead Partner • London & Dubai Syndicate"
    icon="person"
    iconColor="text-primary"
  >
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container border border-white/5">
        <img
          src={ASSETS.tariqMansoorAvatar}
          alt="Tariq Mansoor"
          className="w-14 h-14 rounded-full object-cover ring-2 ring-primary"
        />
        <div>
          <h4 className="text-sm font-bold text-on-surface">Tariq Mansoor</h4>
          <p className="text-xs text-on-surface-variant">Global Venture Syndicate Lead</p>
          <span className="text-[10px] text-primary font-semibold">Active Clearance Level: Alpha</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <a
          href="tel:+971501234567"
          className="py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>Direct VIP Call</span>
        </a>
        <a
          href="mailto:tariq@bilaljutt.com"
          className="py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">mail</span>
          <span>Secure Dispatch</span>
        </a>
      </div>

      <div className="p-3 rounded-2xl bg-surface-container text-xs text-on-surface-variant space-y-1">
        <span className="text-[10px] uppercase font-bold text-outline block">Co-Managed Assets</span>
        <p className="text-on-surface font-medium">Q4 Sovereign Expansion Syndicate ($45M allocation)</p>
        <p>Venture Deck finalized. Awaiting final LP signature round in London.</p>
      </div>
    </div>
  </ModalWrapper>
);
