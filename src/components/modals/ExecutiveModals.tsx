import React, { useState, useEffect } from 'react';
import { ASSETS } from '../../data/initialData';

// 1. Directive Dossier Modal (Q4 Sovereign Expansion)
export const DirectiveDossierModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest">
              Signature Directive
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-inner border border-white/5">
          <img
            src={ASSETS.singaporeSkyline}
            alt="Singapore Expansion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="font-syne text-xl font-bold text-on-surface">
              Q4 Sovereign Expansion
            </h2>
            <p className="text-xs text-primary font-medium">
              Multi-Jurisdiction Liquidity &amp; Governance Architecture
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-surface-container border border-white/5 text-center">
            <span className="text-[10px] text-outline uppercase font-semibold block">
              Capital Target
            </span>
            <span className="font-syne text-lg font-bold text-primary">$45.0M</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container border border-white/5 text-center">
            <span className="text-[10px] text-outline uppercase font-semibold block">
              Milestones
            </span>
            <span className="font-syne text-lg font-bold text-on-surface">6 of 8</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container border border-white/5 text-center">
            <span className="text-[10px] text-outline uppercase font-semibold block">Hubs</span>
            <span className="font-syne text-lg font-bold text-secondary">DXB • SIN</span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed p-3.5 rounded-2xl bg-surface-container/60 border border-white/5">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">
            Strategic Thesis Overview
          </h4>
          <p>
            Establishing an air-gapped liquidity reserve network across the UAE, Singapore, and Switzerland. Sovereign family assets are shielded under Tier-1 multi-signature custody protocols with zero-counterparty risk.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-surface-container-high">
          <button
            type="button"
            onClick={() => {
              alert('Encrypted directive dossier downloaded.');
              onClose();
            }}
            className="px-4 py-2.5 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-bright"
          >
            Export Dossier
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Syndicate board alignment dispatch sent to partners.');
              onClose();
            }}
            className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105"
          >
            Brief Partners
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Productivity Metrics Modal
export const ProductivityMetricsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
            <h3 className="font-semibold text-base text-on-surface">Productivity Velocity</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-outline uppercase font-bold tracking-wider">
              Focus Score
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-syne text-3xl font-extrabold text-on-surface">94</span>
              <span className="text-xs font-bold text-primary">+6% vs last week</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">Top 2% velocity across peer executives</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">trending_up</span>
          </div>
        </div>

        {/* Weekly Bar Distribution */}
        <div className="p-4 rounded-2xl bg-surface-container border border-white/5 space-y-3">
          <span className="text-xs font-bold text-on-surface block">Daily Deep Work Hours</span>
          <div className="flex items-end justify-between gap-2 h-28 pt-4">
            {[
              { day: 'Mon', hrs: '6.5', pct: 65 },
              { day: 'Tue', hrs: '7.8', pct: 78 },
              { day: 'Wed', hrs: '8.4', pct: 84 },
              { day: 'Thu', hrs: '9.2', pct: 92, active: true },
              { day: 'Fri', hrs: '6.0', pct: 60 },
              { day: 'Sat', hrs: '3.5', pct: 35 },
              { day: 'Sun', hrs: '4.0', pct: 40 },
            ].map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[9px] text-outline tabular-nums font-semibold">{d.hrs}h</span>
                <div className="w-full bg-surface-container-highest rounded-t-lg h-full max-h-[70px] flex items-end">
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      d.active ? 'bg-primary shadow-[0_0_10px_rgba(229,184,105,0.6)]' : 'bg-primary-container/40'
                    }`}
                    style={{ height: `${d.pct}%` }}
                  />
                </div>
                <span className={`text-[10px] font-bold ${d.active ? 'text-primary' : 'text-outline'}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105"
          >
            Acknowledge Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Meeting Briefing Modal (CEO Advisory)
export const MeetingBriefingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <h3 className="font-semibold text-base text-on-surface">CEO Advisory Briefing</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">
              Today • 2:30 PM (In 1h 45m)
            </span>
            <span className="material-symbols-outlined text-secondary text-[18px]">videocam</span>
          </div>
          <h2 className="text-base font-bold text-on-surface">Global Expansion Q4 Advisory</h2>
          <p className="text-xs text-on-surface-variant">
            Quarterly strategy alignment with syndicate executive board and European counsel.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-on-surface block">Key Participants</span>
          <div className="space-y-1.5">
            {[
              {
                name: 'Tariq Mansoor',
                role: 'Lead Partner • London & Dubai',
                img: ASSETS.tariqMansoorAvatar,
              },
              {
                name: 'Elena Rostova',
                role: 'General Counsel • Zurich',
                img: ASSETS.femalePartnerAvatar,
              },
              {
                name: 'Arthur Vance',
                role: 'Senior Advisor • Singapore',
                img: ASSETS.seniorPartnerAvatar,
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container/60 border border-white/5"
              >
                <img src={p.img} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-on-surface truncate">{p.name}</h4>
                  <span className="text-[10px] text-on-surface-variant truncate block">{p.role}</span>
                </div>
                <span className="material-symbols-outlined text-[14px] text-secondary">
                  verified
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-full text-xs text-on-surface-variant hover:text-on-surface"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Connecting to encrypted video bridge with Zurich security enclave...');
              onClose();
            }}
            className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary text-xs font-bold shadow-md hover:brightness-105 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">videocam</span>
            <span>Join Encrypted Room</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Interactive Document Scanner Modal
export const DocScannerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSaveScannedNote: (note: { title: string; body: string }) => void;
}> = ({ isOpen, onClose, onSaveScannedNote }) => {
  if (!isOpen) return null;

  const [scanState, setScanState] = useState<'viewfinder' | 'scanning' | 'scanned'>('viewfinder');

  const handleCapture = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('scanned');
    }, 1500);
  };

  const handleSaveNote = () => {
    onSaveScannedNote({
      title: 'Scanned Syndicate Addendum · Termsheet #094',
      body: 'Optical recognition parsed: "Section 4.1 Liquidity Buffer - 25% mandatory allocation required in Swiss Francs or Gold Custody accounts prior to Q4 execution."',
    });
    alert('Scanned document converted to Executive Note!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-surface-container-low rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              document_scanner
            </span>
            <h3 className="font-semibold text-sm text-on-surface">Document Scanner</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Viewfinder Frame */}
        <div className="relative w-full h-56 rounded-2xl bg-surface-container-lowest overflow-hidden border-2 border-dashed border-secondary/40 flex items-center justify-center">
          {scanState === 'viewfinder' && (
            <div className="text-center p-4">
              <span className="material-symbols-outlined text-4xl text-secondary animate-pulse mb-2">
                crop_free
              </span>
              <p className="text-xs text-on-surface font-semibold">Align document in frame</p>
              <p className="text-[10px] text-outline mt-1">Automatic perspective &amp; OCR enabled</p>
            </div>
          )}

          {scanState === 'scanning' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <div className="absolute inset-x-0 h-1 bg-secondary shadow-[0_0_12px_#7bd0ff] animate-[bounce_1.5s_infinite]" />
              <span className="text-xs text-secondary font-bold">Extracting Neural OCR...</span>
            </div>
          )}

          {scanState === 'scanned' && (
            <div className="p-4 text-left space-y-1.5">
              <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                OCR Parsed Successfully
              </span>
              <p className="text-xs text-on-surface font-semibold">
                Syndicate Addendum #094 (Verified)
              </p>
              <p className="text-[11px] text-on-surface-variant line-clamp-3">
                "Section 4.1 Liquidity Buffer - 25% mandatory allocation required in Swiss Francs or Gold Custody accounts..."
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface"
          >
            Cancel
          </button>
          {scanState !== 'scanned' ? (
            <button
              type="button"
              onClick={handleCapture}
              disabled={scanState === 'scanning'}
              className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary text-xs font-bold shadow-md hover:brightness-105 active:scale-95 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">camera</span>
              <span>Capture &amp; OCR</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveNote}
              className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105 active:scale-95 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Save to Notes</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 5. Priority Satellite Call Modal
export const PriorityCallModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [callDuration, setCallDuration] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-xs bg-surface-container-low rounded-3xl p-6 shadow-2xl border border-surface-container-highest flex flex-col items-center text-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center p-1 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">phone_in_talk</span>
            </div>
          </div>
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-surface-container-low" />
        </div>

        <div>
          <h3 className="font-syne text-lg font-bold text-on-surface">VIP Satellite Voice Line</h3>
          <p className="text-xs text-primary font-semibold mt-0.5">Connected • Zurich Enclave</p>
          <span className="text-xs text-on-surface-variant font-mono tabular-nums block mt-1">
            {formatTime(callDuration)}
          </span>
        </div>

        {/* Audio Waveform Animation */}
        <div className="flex items-center gap-1 h-6">
          {[40, 70, 100, 60, 85, 30, 90, 50, 75, 45].map((h, i) => (
            <span
              key={i}
              className="w-1 bg-primary rounded-full animate-pulse"
              style={{
                height: `${h}%`,
                animationDelay: `${i * 120}ms`,
              }}
            />
          ))}
        </div>

        {/* Call Controls */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-error text-white' : 'bg-surface-container-high text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isSpeaker ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-error text-white flex items-center justify-center shadow-lg active:scale-95"
            title="End Call"
          >
            <span className="material-symbols-outlined text-[20px]">call_end</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 6. Voice Memo Modal
export const VoiceMemoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1.0x' | '1.5x' | '2.0x'>('1.0x');

  const speeds: ('1.0x' | '1.5x' | '2.0x')[] = ['1.0x', '1.5x', '2.0x'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">mic</span>
            <h3 className="font-semibold text-base text-on-surface">Voice Memo Audio</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-on-surface">Investment Thesis: Private Credit</h4>
              <span className="text-[10px] text-on-surface-variant">Recorded 15m ago • AI Transcribed</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const cur = speeds.indexOf(playbackSpeed);
                setPlaybackSpeed(speeds[(cur + 1) % speeds.length]);
              }}
              className="px-2 py-0.5 rounded-lg bg-surface-container-high text-[10px] text-primary font-bold"
            >
              {playbackSpeed}
            </button>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <div className="flex-1 flex items-center gap-1 h-6">
              {[20, 50, 80, 40, 90, 100, 60, 40, 70, 85, 30, 65, 45, 80, 35].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all ${
                    isPlaying ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <span className="text-[10px] text-outline font-mono">01:42</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container/60 border border-white/5 space-y-2">
          <span className="text-[10px] text-outline uppercase font-bold tracking-wider">
            Full AI Transcript
          </span>
          <p className="text-xs text-on-surface leading-relaxed">
            "Directives regarding the European opportunistic fund: maintain 25% dry powder for sovereign debt auctions. Coordinate with Tariq on the London SPV structure before Thursday 2:30 PM board advisory."
          </p>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-surface-container-high">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(
                'Directives regarding the European opportunistic fund: maintain 25% dry powder...'
              );
              alert('Transcript copied to clipboard.');
            }}
            className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold"
          >
            Copy Transcript
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-primary text-on-primary text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// 7. Sovereign Ledger Vault Modal
export const VaultLedgerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">account_balance</span>
            <h3 className="font-semibold text-base text-on-surface">Bilal's Sovereign Ledger</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container border border-white/5 space-y-1">
          <span className="text-[10px] text-outline uppercase font-bold tracking-wider">
            Total Audited Assets Under Command
          </span>
          <div className="font-syne text-3xl font-extrabold text-primary">$124,500,000</div>
          <span className="text-xs text-secondary font-semibold">
            Zero-Knowledge Hardware Encrypted • PKT/GST Node
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-on-surface block">Portfolio Allocations</span>
          <div className="space-y-2">
            {[
              { label: 'Private Credit & Debt Syndicates', val: '$48.2M', pct: '39%' },
              { label: 'Prime Real Estate (Dubai / London)', val: '$42.1M', pct: '34%' },
              { label: 'Tier-1 Cash & Gold Liquidity Buffer', val: '$22.0M', pct: '18%' },
              { label: 'Frontier Tech Venture Equity', val: '$12.2M', pct: '9%' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-container/60 border border-white/5 text-xs"
              >
                <div>
                  <h4 className="font-semibold text-on-surface">{item.label}</h4>
                  <span className="text-[10px] text-outline">{item.pct} Portfolio Share</span>
                </div>
                <span className="font-syne font-bold text-on-surface">{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-surface-container-high">
          <button
            type="button"
            onClick={() => {
              alert('Full cryptographic ledger report generated.');
              onClose();
            }}
            className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105"
          >
            Export Ledger
          </button>
        </div>
      </div>
    </div>
  );
};

// 8. Contact Dossier Modal (Tariq Mansoor)
export const ContactDossierModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col items-center text-center gap-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="relative">
          <img
            src={ASSETS.tariqMansoorAvatar}
            alt="Tariq Mansoor"
            className="w-20 h-20 rounded-full object-cover ring-2 ring-primary"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary-container ring-2 ring-surface-container-low" />
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="font-syne text-lg font-bold text-on-surface">Tariq Mansoor</h2>
            <span
              className="material-symbols-outlined text-primary text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </div>
          <p className="text-xs text-primary font-semibold mt-0.5">
            Lead Partner • London &amp; Dubai
          </p>
          <p className="text-[11px] text-on-surface-variant mt-1.5 max-w-[260px]">
            Managing venture syndicate capital allocations across Europe and GCC.
          </p>
        </div>

        <div className="w-full flex items-center justify-center gap-3 pt-2">
          <a
            href="tel:+971501234567"
            className="flex-1 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 border border-white/5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>Direct Call</span>
          </a>
          <a
            href="mailto:tariq@bilaljutt.com"
            className="flex-1 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 hover:brightness-105"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>Secure Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};
