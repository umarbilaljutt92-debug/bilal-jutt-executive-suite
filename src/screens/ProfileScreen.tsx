import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { ScreenType, UserProfile } from '../types';
import { LinkedDevicesModal, ExportVaultModal, ModalWrapper } from '../components/ExecutiveModals';

interface ProfileScreenProps {
  profile: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onSignOut: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onNavigate,
  onSignOut,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showLinkedDevices, setShowLinkedDevices] = useState(false);
  const [showExportVault, setShowExportVault] = useState(false);
  const [showTimezonesModal, setShowTimezonesModal] = useState(false);
  const [showFocusModal, setShowFocusModal] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profile.corporateEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto select-none space-y-4">
      {/* Sub-Header & Settings Bar */}
      <div className="flex items-center justify-between py-1 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-primary uppercase tracking-widest font-bold">
            Executive Dossier
          </span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('settings')}
          aria-label="Settings"
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:text-primary transition-all duration-300 shadow-sm active:scale-95 border border-white/5"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </div>

      {/* Bento Hero Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-surface-container-low shadow-xl p-5 flex flex-col items-center text-center border border-white/5">
        {/* Ambient Radial Luminous Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        {/* Avatar with Double Rim & Status Badge */}
        <div className="relative mb-3.5">
          <div className="p-1 rounded-full bg-gradient-to-tr from-primary-container via-surface-container-high to-primary shadow-[0_0_24px_rgba(229,184,105,0.25)]">
            <div className="p-1 rounded-full bg-surface-container-lowest">
              <img
                src={profile.avatarUrl || ASSETS.bilalAvatar}
                alt="Bilal Jutt Executive Portrait"
                className="w-24 h-24 rounded-full object-cover object-top shadow-md"
              />
            </div>
          </div>

          {/* Verified Badge */}
          {profile.publicVerification && (
            <div
              className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg border border-black"
              title="Verified Sovereign Principal"
            >
              <span
                className="material-symbols-outlined text-[16px] text-on-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
          )}
        </div>

        {/* Identity & Title */}
        <h2 className="font-syne text-2xl text-on-surface tracking-tight font-bold mb-1">
          {profile.fullName}
        </h2>
        <p className="text-xs text-on-surface-variant max-w-[280px] leading-relaxed mb-3">
          {profile.executiveTitle} <span className="text-primary font-bold">•</span> Architect of High-Impact Systems
        </p>

        {/* Location & Status Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high mb-4 shadow-sm border border-white/5">
          <span className="material-symbols-outlined text-secondary text-[14px]">public</span>
          <span className="text-xs text-on-surface font-medium">{profile.location}</span>
          <span className="text-outline text-[10px]">•</span>
          <span className="text-xs text-primary flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Available for Advisory
          </span>
        </div>

        {/* Edit Profile Action Button */}
        <button
          type="button"
          onClick={() => onNavigate('edit_profile')}
          className="w-full max-w-[240px] h-11 px-4 rounded-full bg-surface-container-highest/80 hover:bg-surface-bright active:scale-95 transition-all flex items-center justify-center gap-2 text-on-surface shadow-md backdrop-blur-md border border-white/5"
        >
          <span className="material-symbols-outlined text-[18px] text-primary">edit</span>
          <span className="text-xs font-bold tracking-wide">Edit Profile</span>
        </button>
      </div>

      {/* Key Metrics Bento Tiles (3-Column Grid) */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Stat 1: Completed Tasks */}
        <button
          type="button"
          onClick={() => onNavigate('tasks')}
          className="rounded-2xl bg-surface-container-low p-3 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden border border-white/5 hover:bg-surface-container active:scale-95 transition-all"
        >
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center mb-1 text-primary">
            <span className="material-symbols-outlined text-[16px]">task_alt</span>
          </div>
          <span className="font-syne text-xl font-bold text-on-surface leading-tight tabular-nums">
            {profile.tasksDoneCount}
          </span>
          <span className="text-[10px] text-on-surface-variant tracking-tight mt-0.5 font-medium">
            Tasks Done
          </span>
        </button>

        {/* Stat 2: Focus Velocity */}
        <button
          type="button"
          onClick={() => setShowFocusModal(true)}
          className="rounded-2xl bg-surface-container-low p-3 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden border border-white/5 hover:bg-surface-container active:scale-95 transition-all"
        >
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
          <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center mb-1 text-secondary">
            <span className="material-symbols-outlined text-[16px]">speed</span>
          </div>
          <span className="font-syne text-xl font-bold text-on-surface leading-tight tabular-nums">
            {profile.focusIndex}
            <span className="text-xs font-semibold text-secondary">%</span>
          </span>
          <span className="text-[10px] text-on-surface-variant tracking-tight mt-0.5 font-medium">
            Focus Index
          </span>
        </button>

        {/* Stat 3: Executive Notes */}
        <button
          type="button"
          onClick={() => onNavigate('notes')}
          className="rounded-2xl bg-surface-container-low p-3 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden border border-white/5 hover:bg-surface-container active:scale-95 transition-all"
        >
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-tertiary-container/50 to-transparent" />
          <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center mb-1 text-tertiary">
            <span className="material-symbols-outlined text-[16px]">history_edu</span>
          </div>
          <span className="font-syne text-xl font-bold text-on-surface leading-tight tabular-nums">
            {profile.execNotesCount}
          </span>
          <span className="text-[10px] text-on-surface-variant tracking-tight mt-0.5 font-medium">
            Exec Notes
          </span>
        </button>
      </div>

      {/* Credentials & Comms */}
      <div className="rounded-3xl bg-surface-container-low p-4 shadow-lg flex flex-col gap-3 border border-white/5">
        <div className="flex items-center justify-between pb-1 px-1">
          <h3 className="text-sm font-semibold text-on-surface tracking-tight">
            Credentials &amp; Comms
          </h3>
          <span className="text-[10px] text-primary uppercase tracking-wider font-bold">
            Verified
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {/* Membership Tier */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-high/60 backdrop-blur-sm shadow-sm border border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-primary-container/20 flex items-center justify-center shrink-0 text-primary">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">
                  Membership Level
                </span>
                <span className="text-xs text-primary font-semibold truncate">
                  {profile.membershipLevel}
                </span>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold">
              Lifetime
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-high/40 backdrop-blur-sm shadow-sm border border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">alternate_email</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">
                  Direct Email
                </span>
                <span className="text-xs text-on-surface font-medium truncate">
                  {profile.corporateEmail}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy Email"
              className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors border border-white/5 active:scale-90"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedEmail ? 'check' : 'content_copy'}
              </span>
            </button>
          </div>

          {/* Direct Line */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-high/40 backdrop-blur-sm shadow-sm border border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">lock</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">
                  Encrypted Line
                </span>
                <span className="text-xs text-on-surface font-medium truncate">
                  {profile.dialCode} {profile.phone}
                </span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-semibold">
              Secured
            </span>
          </div>

          {/* Timezone */}
          <button
            type="button"
            onClick={() => setShowTimezonesModal(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container-high/40 backdrop-blur-sm shadow-sm border border-white/5 hover:bg-surface-container-high transition-colors text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">
                  Active Timezones
                </span>
                <span className="text-xs text-on-surface font-medium truncate">
                  {profile.timezones}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[16px]">sync_alt</span>
          </button>
        </div>
      </div>

      {/* System Controls */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest px-2 font-bold">
          System Controls
        </span>
        <div className="grid grid-cols-1 gap-2">
          {/* Security & Biometrics */}
          <button
            type="button"
            onClick={() => onNavigate('settings')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all text-left shadow-sm active:scale-[0.99] border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">fingerprint</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-on-surface">Security &amp; Biometrics</span>
                <span className="text-[11px] text-on-surface-variant">
                  Hardware Token + Face Unlock Active
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
              chevron_right
            </span>
          </button>

          {/* Linked Devices */}
          <button
            type="button"
            onClick={() => setShowLinkedDevices(true)}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all text-left shadow-sm active:scale-[0.99] border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">devices</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-on-surface">Linked Devices</span>
                <span className="text-[11px] text-on-surface-variant">
                  3 Active Workstations &amp; Handsets
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                chevron_right
              </span>
            </div>
          </button>

          {/* Export Data Vault */}
          <button
            type="button"
            onClick={() => setShowExportVault(true)}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all text-left shadow-sm active:scale-[0.99] border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[18px]">cloud_download</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-on-surface">Export Data Vault</span>
                <span className="text-[11px] text-on-surface-variant">
                  Generate PGP Encrypted Archive
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-2 flex justify-center pb-4">
        <button
          type="button"
          onClick={onSignOut}
          className="px-5 py-2.5 rounded-full bg-surface-container-low text-error hover:bg-surface-container-high transition-colors text-xs font-semibold flex items-center gap-2 border border-white/5 active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Terminate Active Session</span>
        </button>
      </div>

      {/* Linked Devices Modal */}
      <LinkedDevicesModal
        isOpen={showLinkedDevices}
        onClose={() => setShowLinkedDevices(false)}
      />

      {/* Export Vault Modal */}
      <ExportVaultModal
        isOpen={showExportVault}
        onClose={() => setShowExportVault(false)}
      />

      {/* Global Timezones Modal */}
      {showTimezonesModal && (
        <ModalWrapper
          isOpen={showTimezonesModal}
          onClose={() => setShowTimezonesModal(false)}
          title="Global Operational Hubs"
          subtitle="Real-time Financial Market Timezones"
          icon="schedule"
        >
          <div className="space-y-2 text-xs">
            {[
              { city: 'Dubai (DIFC)', tz: 'GST (UTC+4)', status: 'HQ Base' },
              { city: 'Lahore (Executive)', tz: 'PKT (UTC+5)', status: 'Family Office' },
              { city: 'London (Mayfair)', tz: 'BST (UTC+1)', status: 'Syndicate Desk' },
              { city: 'Zurich (Paradeplatz)', tz: 'CEST (UTC+2)', status: 'Custody Enclave' },
              { city: 'New York (Hudson Yards)', tz: 'EDT (UTC-4)', status: 'Venture Relay' },
            ].map((hub, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-surface-container flex items-center justify-between border border-white/5"
              >
                <div>
                  <span className="font-bold text-on-surface block">{hub.city}</span>
                  <span className="text-[10px] text-outline">{hub.status}</span>
                </div>
                <span className="text-primary font-mono font-semibold">{hub.tz}</span>
              </div>
            ))}
          </div>
        </ModalWrapper>
      )}

      {/* Focus Breakdown Modal */}
      {showFocusModal && (
        <ModalWrapper
          isOpen={showFocusModal}
          onClose={() => setShowFocusModal(false)}
          title="Executive Focus Index"
          subtitle="Algorithmic Velocity Score • 98.4%"
          icon="speed"
          iconColor="text-secondary"
        >
          <div className="space-y-3 text-xs text-on-surface-variant">
            <div className="p-3 rounded-2xl bg-surface-container space-y-1">
              <span className="text-[10px] uppercase font-bold text-secondary">
                Weekly Efficiency Metric
              </span>
              <p className="text-on-surface leading-relaxed">
                Focus velocity incorporates deep work duration, low interruptions, and high-impact milestone completion speed.
              </p>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Strategic Allocation</span>
                <span className="text-primary font-bold">96%</span>
              </div>
              <div className="flex justify-between">
                <span>Distraction Attenuation</span>
                <span className="text-secondary font-bold">99.2%</span>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};
