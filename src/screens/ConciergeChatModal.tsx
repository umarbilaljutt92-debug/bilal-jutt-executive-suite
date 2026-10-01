import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';

interface ConciergeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  timestamp: string;
}

export const ConciergeChatModal: React.FC<ConciergeChatModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'concierge',
      text: 'Good day, Mr. Jutt. Tier-1 Sovereign Concierge standing by. How may we orchestrate your directives today?',
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Confirm private flight to Zurich',
    'Sync vault across iPad & MacBook',
    'Review Q4 syndicate LP terms',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = 'Directive acknowledged. Execution protocol initiated with priority clearance.';
      const lower = text.toLowerCase();

      if (lower.includes('zurich') || lower.includes('flight')) {
        reply = 'Private Gulfstream G650ER clearance confirmed for Zurich Kloten (ZRH). VIP customs manifest encrypted and routed to local handlers.';
      } else if (lower.includes('sync') || lower.includes('ipad') || lower.includes('macbook')) {
        reply = 'Zero-knowledge peer handshake initiated between iPad Pro and MacBook Pro M3. Ledger hashes synchronized at 100% integrity.';
      } else if (lower.includes('syndicate') || lower.includes('lp') || lower.includes('thesis')) {
        reply = 'Capital Allocation thesis dossier reviewed. LP allocation distribution locked at $45M target with secondary liquidity buffer.';
      }

      const botMsg: ChatMessage = {
        id: `c-${Date.now()}`,
        sender: 'concierge',
        text: reply,
        timestamp: 'Now',
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl h-[85vh] flex flex-col shadow-2xl border border-surface-container-highest overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-surface-container flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={ASSETS.supportOfficer1}
                alt="Concierge Officer"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-sm text-on-surface">Tier-1 Concierge Desk</h3>
                <span
                  className="material-symbols-outlined text-primary text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <p className="text-[10px] text-primary font-bold tracking-wider uppercase">
                Encrypted Tunnel • &lt; 45s SLA
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-primary-container text-on-primary-container rounded-tr-none font-medium'
                    : 'bg-surface-container-high text-on-surface rounded-tl-none border border-white/5'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-outline mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-surface-container-high text-on-surface-variant w-fit text-xs border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-t border-surface-container-high/60 bg-surface-container-lowest/50">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(p)}
              className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-primary text-[11px] whitespace-nowrap border border-white/5 transition-colors shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-surface-container border-t border-surface-container-high">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Transmit executive directive..."
              className="flex-1 h-11 px-3.5 rounded-xl bg-surface text-on-surface text-xs outline-none border border-white/5 focus:border-primary/40"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 disabled:opacity-40 transition-all hover:brightness-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
