import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { ScreenType, UserProfile, UserSettings } from '../types';
import { TermsModal, ModalWrapper } from '../components/ExecutiveModals';
import { showExecutiveToast } from '../utils/toast';

interface SettingsScreenProps {
  profile: UserProfile;
  settings: UserSettings;
  onUpdateSettings: (updates: Partial<UserSettings>) => void;
  onNavigate: (screen: ScreenType) => void;
  onSignOut: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  profile,
  settings,
  onUpdateSettings,
  onNavigate,
  onSignOut,
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showEncryptionModal, setShowEncryptionModal] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      onSignOut();
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto select-none space-y-4">
      {/* Contextual Sub-bar */}
      <div className="flex items-center justify-between py-1 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-primary-fixed-dim font-bold">
            Suite Calibration
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-medium border border-white/5">
          <span className="material-symbols-outlined text-[13px] text-secondary">verified_user</span>
          <span>Encrypted Session</span>
        </div>
      </div>

      {/* Account Overview Snippet Bento Card */}
      <section
        onClick={() => onNavigate('edit_profile')}
        className="relative w-full rounded-3xl bg-surface-container-low p-4 shadow-xl overflow-hidden cursor-pointer active:scale-[0.99] transition-transform border border-white/5"
      >
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={profile.avatarUrl || ASSETS.bilalAvatar}
                alt="Bilal Jutt portrait"
                className="w-14 h-14 rounded-2xl object-cover shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-surface-container-lowest flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-on-surface truncate">{profile.fullName}</h2>
                <span
                  className="material-symbols-outlined text-[15px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
              </div>
              <p className="text-xs text-on-surface-variant truncate">{profile.corporateEmail}</p>
              <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-surface-container text-primary text-[10px] font-semibold border border-white/5">
                <span>Executive Tier</span>
                <span className="text-on-surface-variant font-normal">• Primary</span>
              </div>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </div>
        </div>
      </section>

      {/* Group 1: Preferences & App Experience */}
      <section>
        <div className="flex items-center justify-between px-1 mb-1.5">
          <h3 className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
            Preferences &amp; App Experience
          </h3>
          <span className="text-[10px] text-primary font-semibold">3 settings</span>
        </div>

        <div className="flex flex-col gap-1.5 rounded-3xl bg-surface-container-low p-2 shadow-lg border border-white/5">
          {/* Appearance */}
          <div
            onClick={() => showExecutiveToast('Appearance calibrated to Executive Dark (Onyx Gold). OLED battery optimized.', 'gold')}
            className="flex items-center justify-between p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-on-surface truncate">Appearance</div>
                <div className="text-[11px] text-on-surface-variant truncate">
                  Executive Dark (Active)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest border border-white/5">
                <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-primary to-primary-container shadow-[0_0_8px_rgba(229,184,105,0.6)]" />
                <span className="text-[11px] text-primary font-bold">Onyx Gold</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                tune
              </span>
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-on-surface truncate">Notifications</div>
                <div className="text-[11px] text-on-surface-variant truncate">
                  Push, VIP Alerts &amp; Briefings
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !settings.notificationsEnabled;
                onUpdateSettings({ notificationsEnabled: next });
                showExecutiveToast(next ? 'Notifications enabled' : 'Notifications muted', 'info');
              }}
              className="relative inline-flex items-center cursor-pointer shrink-0"
            >
              <div
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.notificationsEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-on-primary-fixed shadow-sm transition-transform ${
                    settings.notificationsEnabled ? 'translate-x-5' : 'translate-x-0 bg-outline'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Language */}
          <button
            type="button"
            onClick={() => setShowLanguageModal(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[18px]">translate</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-on-surface truncate">Language</div>
                <div className="text-[11px] text-on-surface-variant truncate">
                  Regional localization &amp; dialects
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant shrink-0">
              <span className="text-xs text-on-surface font-medium">{settings.selectedLanguage}</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </div>
          </button>
        </div>
      </section>

      {/* Group 2: Privacy & Security */}
      <section>
        <div className="flex items-center justify-between px-1 mb-1.5">
          <h3 className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
            Privacy &amp; Security
          </h3>
          <span className="material-symbols-outlined text-[14px] text-primary">lock</span>
        </div>

        <div className="flex flex-col gap-1.5 rounded-3xl bg-surface-container-low p-2 shadow-lg border border-white/5">
          {/* Biometric Access Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">face</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-on-surface truncate">
                  Biometric Access (Face ID)
                </div>
                <div className="text-[11px] text-on-surface-variant truncate">
                  Instant unlock for executive dashboard
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !settings.biometricsEnabled;
                onUpdateSettings({ biometricsEnabled: next });
                showExecutiveToast(next ? 'Biometric access enforced' : 'Biometric access disabled', 'info');
              }}
              className="relative inline-flex items-center cursor-pointer shrink-0"
            >
              <div
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.biometricsEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-on-primary-fixed shadow-sm transition-transform ${
                    settings.biometricsEnabled ? 'translate-x-5' : 'translate-x-0 bg-outline'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <button
            type="button"
            onClick={() => setShowTwoFactorModal(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[18px]">key</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-on-surface truncate">
                  Two-Factor Authentication
                </div>
                <div className="text-[11px] text-on-surface-variant truncate">
                  Enabled • Hardware Token
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant shrink-0">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </div>
          </button>

          {/* Data Encryption */}
          <button
            type="button"
            onClick={() => setShowEncryptionModal(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">shield</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-on-surface truncate">Data Encryption</div>
                <div className="text-[11px] text-on-surface-variant truncate">
                  AES-256 Cloud Vault
                </div>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary text-[10px] font-bold flex items-center gap-1 shrink-0 border border-white/5">
              <span className="material-symbols-outlined text-[13px]">lock_clock</span>
              <span>Zero-Knowledge</span>
            </div>
          </button>
        </div>
      </section>

      {/* Group 3: Support & Sovereign Terms */}
      <section>
        <div className="flex items-center justify-between px-1 mb-1.5">
          <h3 className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
            Support &amp; Sovereign Terms
          </h3>
          <span className="text-[10px] text-on-surface-variant font-medium">Concierge Desk</span>
        </div>

        <div className="flex flex-col gap-1.5 rounded-3xl bg-surface-container-low p-2 shadow-lg border border-white/5">
          {/* Help & Support */}
          <button
            type="button"
            onClick={() => onNavigate('help')}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[18px]">contact_support</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-on-surface truncate">
                  Help &amp; Support Center
                </div>
                <div className="text-[11px] text-on-surface-variant truncate">
                  FAQs, concierge desk &amp; 24/7 priority line
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
              open_in_new
            </span>
          </button>

          {/* Terms & Policy */}
          <button
            type="button"
            onClick={() => setShowTermsModal(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined text-[18px]">gavel</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-on-surface truncate">
                  Terms &amp; Sovereign Privacy Policy
                </div>
                <div className="text-[11px] text-on-surface-variant truncate">
                  Constitutional data sovereignty commitments
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
              chevron_right
            </span>
          </button>
        </div>
      </section>

      {/* Logout & OS Version Stamp */}
      <section className="mt-2 flex flex-col items-center gap-3 pb-6">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full h-12 py-3 px-4 rounded-2xl bg-error-container/20 hover:bg-error-container/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-error shadow-lg font-bold text-xs border border-error-container/30"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isLoggingOut ? 'sync' : 'logout'}
          </span>
          <span>{isLoggingOut ? 'Safely Securing Vault...' : 'Log Out of Executive Suite'}</span>
        </button>

        <div className="flex items-center gap-2 text-on-surface-variant text-[10px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-outline" />
          <span>Bilal Jutt OS v2.4.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline" />
          <span className="text-primary-fixed-dim font-bold">Build 8904</span>
        </div>
      </section>

      {/* Executive Terms Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <ModalWrapper
          isOpen={showLanguageModal}
          onClose={() => setShowLanguageModal(false)}
          title="Executive Localization"
          subtitle="Select Primary Operating Dialect"
          icon="translate"
          iconColor="text-tertiary"
        >
          <div className="space-y-1.5 text-xs">
            {['English (US)', 'English (UK)', 'Arabic (Gulf / UAE)', 'French (Geneva)', 'German (Zurich)'].map(
              (lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    onUpdateSettings({ selectedLanguage: lang });
                    setShowLanguageModal(false);
                    showExecutiveToast(`Language set to ${lang}`, 'success');
                  }}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all ${
                    settings.selectedLanguage === lang
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span>{lang}</span>
                  {settings.selectedLanguage === lang && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              )
            )}
          </div>
        </ModalWrapper>
      )}

      {/* Two-Factor Authentication Modal */}
      {showTwoFactorModal && (
        <ModalWrapper
          isOpen={showTwoFactorModal}
          onClose={() => setShowTwoFactorModal(false)}
          title="Hardware Enclave 2FA"
          subtitle="FIDO2 / WebAuthn Hardware Tokens"
          icon="key"
          iconColor="text-secondary"
        >
          <div className="space-y-3 text-xs text-on-surface-variant">
            <div className="p-3 rounded-2xl bg-surface-container space-y-1">
              <span className="text-on-surface font-bold">Active Token: YubiKey 5C NFC</span>
              <p className="text-[11px]">Enrolled on Oct 14, 2026 · Bound to Secure Enclave</p>
            </div>
            <button
              type="button"
              onClick={() => showExecutiveToast('New physical security token NFC enrollment initiated.', 'gold')}
              className="w-full py-2.5 rounded-full bg-secondary text-on-secondary font-bold text-xs"
            >
              + Register Backup Security Key
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* Encryption Details Modal */}
      {showEncryptionModal && (
        <ModalWrapper
          isOpen={showEncryptionModal}
          onClose={() => setShowEncryptionModal(false)}
          title="AES-256 Vault Architecture"
          subtitle="Zero-Knowledge Cipher Protocol"
          icon="shield"
          iconColor="text-primary"
        >
          <div className="space-y-2.5 text-xs text-on-surface-variant leading-relaxed">
            <div className="p-3 rounded-2xl bg-surface-container space-y-1 font-mono text-[10px]">
              <div className="text-primary font-bold">CIPHER SUITE: AES-256-GCM</div>
              <div>KEY DERIVATION: Argon2id (M=64MB, T=4, P=4)</div>
              <div>HARDWARE SECURITY: Apple T2 / Secure Enclave Gen 4</div>
              <div>ESCROW BACKUP: None (User-held recovery shard only)</div>
            </div>
            <p className="text-[11px]">
              All database records and file attachments are encrypted client-side prior to memory allocation.
            </p>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};
