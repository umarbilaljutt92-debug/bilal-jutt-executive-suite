import React, { useState } from 'react';

// 1. Theme Selector Modal
export const ThemeSelectorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [currentTheme, setCurrentTheme] = useState('Onyx Gold');

  const themes = [
    {
      name: 'Onyx Gold',
      desc: 'Haute Horlogerie dark minimal with Champagne radiance',
      colors: ['#121318', '#ffd58d', '#e5b869'],
    },
    {
      name: 'Obsidian Slate',
      desc: 'Ultra-low luminance matte obsidian with Electric Cyan telemetry',
      colors: ['#0d0e13', '#7bd0ff', '#00a6e0'],
    },
    {
      name: 'Royal Platinum',
      desc: 'Deep titanium luster with polished silver-grey accents',
      colors: ['#141724', '#e1e0ff', '#b7b9ff'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">palette</span>
            <h3 className="font-semibold text-base text-on-surface">Suite Appearance</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {themes.map((t) => {
            const isSelected = currentTheme === t.name;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setCurrentTheme(t.name)}
                className={`w-full p-3.5 rounded-2xl text-left transition-all border flex items-center justify-between ${
                  isSelected
                    ? 'bg-surface-container border-primary shadow-sm'
                    : 'bg-surface-container-low border-white/5 hover:bg-surface-container'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-on-surface">{t.name}</h4>
                    {isSelected && (
                      <span className="text-[9px] px-2 py-0.2 rounded-full bg-primary/20 text-primary font-bold">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{t.desc}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {t.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-black/40"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold"
          >
            Apply Palette
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Language Selector Modal
export const LanguageSelectorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedLang, setSelectedLang] = useState('English (US)');

  const languages = [
    { code: 'en-US', name: 'English (US)', sub: 'Primary Executive Standard' },
    { code: 'en-GB', name: 'English (UK)', sub: 'Commonwealth Standard' },
    { code: 'ar-AE', name: 'العربية (GCC)', sub: 'Dubai & Abu Dhabi Commercial' },
    { code: 'ur-PK', name: 'اردو (PK)', sub: 'Lahore & Islamabad Node' },
    { code: 'fr-CH', name: 'Français (CH)', sub: 'Geneva & Zurich Enclave' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">translate</span>
            <h3 className="font-semibold text-base text-on-surface">Regional Dialect &amp; Locale</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2">
          {languages.map((l) => {
            const isSelected = selectedLang === l.name;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => setSelectedLang(l.name)}
                className={`w-full p-3 rounded-2xl text-left transition-all border flex items-center justify-between ${
                  isSelected
                    ? 'bg-surface-container border-primary shadow-sm'
                    : 'bg-surface-container-low border-white/5 hover:bg-surface-container'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-on-surface">{l.name}</h4>
                  <span className="text-[10px] text-on-surface-variant">{l.sub}</span>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold"
          >
            Set Locale
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Two-Factor Authentication Modal
export const TwoFactorModal: React.FC<{
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
            <span className="material-symbols-outlined text-secondary text-[20px]">key</span>
            <h3 className="font-semibold text-base text-on-surface">Hardware 2FA Security</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface">FIDO2 Physical Security Key</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-bold">
              Active Primary
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            YubiKey 5C NFC cryptographic token paired via hardware Secure Enclave.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container/60 border border-white/5 space-y-2">
          <span className="text-xs font-bold text-on-surface block">Emergency Backup Passphrases</span>
          <p className="text-[11px] text-on-surface-variant">
            12-word cryptographic seed phrase securely stored in air-gapped safe deposit box.
          </p>
          <button
            type="button"
            onClick={() => alert('Biometric handshake required to unseal emergency backup seed.')}
            className="text-xs text-primary font-bold hover:underline"
          >
            View Encrypted Seed Key →
          </button>
        </div>

        <div className="pt-2 flex justify-end border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-primary text-on-primary text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Data Encryption Audit Modal
export const EncryptionAuditModal: React.FC<{
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
            <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
            <h3 className="font-semibold text-base text-on-surface">Zero-Knowledge Cryptography</h3>
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
          <span className="text-[10px] text-outline uppercase font-bold tracking-wider">
            Cipher Suite
          </span>
          <h4 className="text-xs font-mono font-bold text-primary">AES-GCM 256-bit + Curve25519</h4>
          <p className="text-[11px] text-on-surface-variant">
            Data in flight and at rest is secured via authenticated hardware enclave encryption.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-surface-container-lowest font-mono text-[10px] text-outline space-y-1 border border-white/5">
          <div>CHECKSUM: e3b0c44298fc1c149afbf4c8996fb92427ae41e4</div>
          <div>ENCLAVE_NODE: Zurich_Cold_Vault_01</div>
          <div>KEY_ROTATION: Automated 30-day epoch cycle</div>
        </div>

        <div className="pt-2 flex justify-end border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-primary text-on-primary text-xs font-bold"
          >
            Verified OK
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. Boardroom Video Meeting Simulation Modal
export const BoardroomVideoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-surface-container-low rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <h3 className="font-semibold text-sm text-on-surface">
              Encrypted Executive Boardroom (Zurich Bridge)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Video Feeds Grid */}
        <div className="grid grid-cols-2 gap-2.5 h-64">
          <div className="relative rounded-2xl bg-surface-container overflow-hidden border border-white/5 flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE8vRsLWcPy2DYrdxBViI2vsOChssz5K7WnXfQtlAtFQr3KvFw8DwsNBdEcBMOJ1-RE6XMmrpoC4kBomgOvORs_f4dlm3R7Gukh4m-vdFwN90SuL7XsjP28Ix9iHV0avvwwLVOXumHTXCENWBbbr6yOO0_68n77d1QKvHQQTrMJJw3V00ywt2xp0MtsHKJo1mAZVPX1p8FtKTXix5WOraW7i6Fyzm_R82vi6AvBsvS9aXxighHoGx5"
              alt="Bilal Jutt (Host)"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded text-white backdrop-blur-sm">
              Bilal Jutt (Host)
            </span>
          </div>

          <div className="relative rounded-2xl bg-surface-container overflow-hidden border border-white/5 flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt7vOCG7iIUFJwTiye-S7GF3lLR9oEiGHaoZYsnj9MmGUpYvMZhn2Ugh0ElHR0PO88W2KWOk2w5fB_EzBsKWDrOn3mSW0opPLdaMLIpp4MufjgvFnU4B20NexzqWO1msU7JPifq9IRriOKixY7bEhtdBTwRRzOPVWLVb1FP0iO-eRNhQ_iGwqDVNgj4_r4nku0hiFxPYcHHdUsUEPqBVXPFymrW3kakQyOTdYZG_EvT3P6sWRz-7hL"
              alt="Elena Rostova"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded text-white backdrop-blur-sm">
              Elena Rostova (Legal)
            </span>
          </div>
        </div>

        {/* Video Room Controls */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">videocam</span>
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">screen_share</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-10 rounded-full bg-error text-white font-bold text-xs"
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
};
