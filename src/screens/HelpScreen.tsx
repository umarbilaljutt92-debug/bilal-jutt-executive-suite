import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { ScreenType } from '../types';
import { ModalWrapper } from '../components/ExecutiveModals';
import { showExecutiveToast } from '../utils/toast';

interface HelpScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenLiveChat: () => void;
  onBack: () => void;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({
  onOpenLiveChat,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [showWhitepaperModal, setShowWhitepaperModal] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [scriptDetails, setScriptDetails] = useState('');

  const faqs = [
    {
      id: 0,
      icon: 'sync_lock',
      iconColor: 'text-primary',
      question: 'How do I synchronize my encrypted notes across devices?',
      content: (
        <div className="space-y-2.5 text-xs text-on-surface-variant leading-relaxed">
          <p className="text-on-surface">
            All notes within your executive vault use zero-knowledge hardware-anchored AES-GCM 256 encryption. To establish immediate continuous synchronization:
          </p>
          <ul className="space-y-1.5 pl-1">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[15px] text-primary mt-0.5 shrink-0">
                check_circle
              </span>
              <span>
                Open <strong>Settings &gt; Private Cloud Mesh</strong> and confirm the secondary device is authorized.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[15px] text-primary mt-0.5 shrink-0">
                check_circle
              </span>
              <span>
                Scan the ephemeral hardware authentication QR code using your secondary paired tablet or phone.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[15px] text-primary mt-0.5 shrink-0">
                check_circle
              </span>
              <span>
                Verify that your Secure Enclave passkey handshake finishes without network proxy interruptions.
              </span>
            </li>
          </ul>
          <div className="pt-1 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setShowWhitepaperModal(true)}
              className="text-[11px] text-primary hover:underline font-semibold"
            >
              Read Secure Mesh Whitepaper →
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      icon: 'face',
      iconColor: 'text-secondary',
      question: 'Configuring biometric Face ID and security key fallback',
      content: (
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Navigate to <strong>Account Security &gt; Biometric Enforcement</strong>. Toggle Face ID validation for promptless access. If biometric match falls below certainty thresholds, the app falls back to your FIDO2 physical NFC security token or 12-word master passphrase.
        </p>
      ),
    },
    {
      id: 2,
      icon: 'ios_share',
      iconColor: 'text-primary',
      question: 'Exporting daily productivity telemetry to PDF or CSV',
      content: (
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Access your Executive Dashboard, select the target calendar window, and tap the <strong>Report Export</strong> icon. You can choose an executive PDF summary formatted for board reviews or an encrypted raw CSV dataset for corporate analytics.
        </p>
      ),
    },
    {
      id: 3,
      icon: 'lock_clock',
      iconColor: 'text-secondary',
      question: 'Managing private storage limits and vault encryption',
      content: (
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Your account tier offers unmetered text notes and up to 50 GB of air-gapped binary asset storage. High-resolution document archives are automatically rotated using zero-knowledge compression algorithms to preserve vault read/write velocity.
        </p>
      ),
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto select-none space-y-4">
      {/* Sub Header */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all shadow-sm border border-white/5"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
          </button>
          <span className="font-semibold text-base text-on-surface tracking-tight">Help &amp; Concierge</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <div className="relative flex items-center bg-surface-container-low rounded-xl px-3.5 h-12 shadow-sm border border-white/5 focus-within:ring-2 focus-within:ring-primary/40 transition-all">
          <span className="material-symbols-outlined text-outline text-[18px] mr-2.5">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search executive protocols, guides, FAQs..."
            className="w-full bg-transparent text-on-surface text-xs placeholder:text-outline focus:outline-none"
          />
          <button
            type="button"
            aria-label="Voice Query"
            onClick={() => {
              setSearchQuery('encrypted notes sync');
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-primary transition-colors active:scale-95 ml-1"
          >
            <span className="material-symbols-outlined text-[16px]">mic</span>
          </button>
        </div>
      </div>

      {/* Executive Concierge & VIP Support Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-surface-container p-4 shadow-xl border border-white/5">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 bg-surface-container-highest/60 rounded-full px-2.5 py-1 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] text-primary uppercase tracking-widest font-bold">
                Priority Tier Active
              </span>
            </div>
            <div className="flex items-center space-x-1 text-on-surface-variant text-[10px] font-medium">
              <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
              <span>Encrypted Tunnel</span>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="font-syne text-lg text-on-surface font-bold tracking-tight">
              Executive Concierge &amp; VIP Support
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Direct 24/7 private channel for bespoke technical assistance, device sync, and protocol diagnostics.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenLiveChat}
              className="w-full h-12 rounded-full bg-gradient-to-r from-primary-fixed via-primary-container to-surface-tint text-on-primary font-bold text-xs flex items-center justify-center space-x-2 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span>Start Live Concierge Chat</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Live Agent Pulse */}
          <div className="flex items-center justify-between pt-1 text-on-surface-variant text-xs">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1.5 overflow-hidden">
                <img
                  src={ASSETS.supportOfficer1}
                  alt="Concierge Officer"
                  className="inline-block h-5 w-5 rounded-full object-cover ring-2 ring-surface-container"
                />
                <img
                  src={ASSETS.supportOfficer2}
                  alt="Senior Specialist"
                  className="inline-block h-5 w-5 rounded-full object-cover ring-2 ring-surface-container"
                />
              </div>
              <span className="text-[11px]">
                Avg. Response: <strong className="text-on-surface font-bold">&lt; 45s</strong>
              </span>
            </div>
            <span className="text-primary font-bold text-[11px]">Direct Routing</span>
          </div>
        </div>
      </div>

      {/* Quick Action Bento Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Direct Line Call */}
        <a
          href="tel:+18005550199"
          className="group relative overflow-hidden rounded-2xl bg-surface-container-low p-3.5 flex flex-col justify-between space-y-3 hover:bg-surface-container transition-all active:scale-[0.98] border border-white/5"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
              <span className="material-symbols-outlined text-[18px]">call</span>
            </div>
            <span className="text-[10px] text-primary uppercase tracking-wider font-bold">
              Voice Line
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
              Direct VIP Call
            </h3>
            <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
              Direct satellite patch
            </p>
          </div>
        </a>

        {/* Report an Issue */}
        <button
          type="button"
          onClick={() => setShowDiagnosticModal(true)}
          className="group relative overflow-hidden rounded-2xl bg-surface-container-low p-3.5 text-left flex flex-col justify-between space-y-3 hover:bg-surface-container transition-all active:scale-[0.98] border border-white/5"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
              <span className="material-symbols-outlined text-[18px]">report_problem</span>
            </div>
            <span className="text-[10px] text-on-surface-variant font-medium">Diagnostics</span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-on-surface group-hover:text-secondary transition-colors">
              Report Issue
            </h3>
            <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
              Automated telemetry log
            </p>
          </div>
        </button>
      </div>

      {/* Operational Telemetry Bar */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-3.5 flex items-center justify-between shadow-inner border border-white/5">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping absolute opacity-60" />
            <span className="w-2 h-2 rounded-full bg-secondary relative" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-on-surface font-semibold tracking-tight">
              System Status: Operational
            </span>
            <span className="text-[10px] text-on-surface-variant">Zero degradation • Nodes active</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-primary font-bold tabular-nums">99.99%</span>
          <p className="text-[10px] text-on-surface-variant">Uptime 30d</p>
        </div>
      </div>

      {/* Frequently Asked Questions Section */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-semibold text-base text-on-surface tracking-tight">
            Knowledge Base
          </h3>
          <span className="text-[11px] text-on-surface-variant">Curated for Executives</span>
        </div>

        <div className="space-y-2">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-surface-container-low transition-all duration-200 overflow-hidden border border-white/5"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-3.5 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-2.5 pr-2">
                    <div
                      className={`w-7 h-7 rounded-full bg-surface-container-high shrink-0 flex items-center justify-center ${faq.iconColor}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{faq.icon}</span>
                    </div>
                    <span className="text-xs text-on-surface font-semibold">{faq.question}</span>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[18px] text-outline transform transition-transform duration-200 shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isExpanded && <div className="px-3.5 pb-3.5 pt-0">{faq.content}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom System Integration Card */}
      <div className="rounded-3xl bg-surface-container p-4 flex flex-col space-y-2.5 relative overflow-hidden border border-white/5">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-on-surface">Need custom system integration?</h4>
            <p className="text-[11px] text-on-surface-variant">Our engineering desk can configure tailored workflows.</p>
          </div>
        </div>

        <div className="pt-1 flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setShowScriptModal(true)}
            className="h-9 px-4 rounded-full bg-surface-container-highest text-on-surface text-xs font-semibold hover:bg-surface-bright transition-all active:scale-95 border border-white/5"
          >
            Request Custom Script
          </button>
          <span className="text-[10px] text-outline font-medium">SLA: 2 Business Hours</span>
        </div>
      </div>

      {/* Diagnostic Modal */}
      {showDiagnosticModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-surface-container-low rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  report_problem
                </span>
                <h3 className="font-semibold text-sm text-on-surface">Telemetry Diagnostic</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDiagnosticModal(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              System will bundle encrypted device logs, network traces, and memory allocations into a zero-knowledge diagnostic payload.
            </p>
            <div className="bg-surface-container-lowest p-2.5 rounded-xl font-mono text-[10px] text-outline space-y-1">
              <div>DEVICE: iPad Pro / M4 (Architecture ARM64)</div>
              <div>OS_VERSION: Bilal Jutt OS v2.4.0 (Build 8904)</div>
              <div>ENCLAVE_STATUS: Hardware Anchored AES-256 OK</div>
              <div>LATENCY: 14ms (Zurich Edge Route)</div>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDiagnosticModal(false)}
                className="px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDiagnosticModal(false);
                  showExecutiveToast('Diagnostic packet submitted to Tier-1 Engineering.', 'success');
                }}
                className="px-4 py-2 rounded-full bg-secondary text-on-secondary text-xs font-bold"
              >
                Submit Packet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Whitepaper Modal */}
      {showWhitepaperModal && (
        <ModalWrapper
          isOpen={showWhitepaperModal}
          onClose={() => setShowWhitepaperModal(false)}
          title="Secure Mesh Architecture"
          subtitle="Whitepaper v3.2 • Technical Specification"
          icon="menu_book"
        >
          <div className="space-y-3 text-xs text-on-surface-variant leading-relaxed">
            <p className="text-on-surface font-semibold">
              Zero-knowledge synchronization protocol across executive handheld and terminal nodes.
            </p>
            <p>
              By leveraging asymmetric curve cryptography (ed25519) combined with ephemeral Diffie-Hellman ratcheting, updates are propagated across peer nodes with end-to-end forward secrecy.
            </p>
            <button
              type="button"
              onClick={() => setShowWhitepaperModal(false)}
              className="w-full py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs"
            >
              Done Reading
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* Custom Script Request Modal */}
      {showScriptModal && (
        <ModalWrapper
          isOpen={showScriptModal}
          onClose={() => setShowScriptModal(false)}
          title="Request Custom Workflow Script"
          subtitle="Tier-1 Engineering Desk Dispatch"
          icon="terminal"
        >
          <div className="space-y-3 text-xs">
            <p className="text-on-surface-variant">
              Specify your custom API integration or workflow automation directive for immediate development.
            </p>
            <textarea
              rows={3}
              value={scriptDetails}
              onChange={(e) => setScriptDetails(e.target.value)}
              placeholder="e.g. Automate Swiss banking custody webhook notification to Telegram private bot..."
              className="w-full p-3 bg-surface text-on-surface rounded-xl outline-none border border-white/5 resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowScriptModal(false)}
                className="px-4 py-2 text-on-surface-variant"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showExecutiveToast('Custom script request dispatched. SLA timer activated: 2 hours.', 'gold');
                  setShowScriptModal(false);
                  setScriptDetails('');
                }}
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-bold"
              >
                Dispatch Request
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};
