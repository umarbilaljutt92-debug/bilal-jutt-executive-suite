import React, { useState } from 'react';
import { ScreenType } from '../types';
import { TermsModal } from '../components/ExecutiveModals';
import { showExecutiveToast } from '../utils/toast';

interface SignUpScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSuccessSignUp: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onNavigate,
  onSuccessSignUp,
}) => {
  const [fullName, setFullName] = useState('Bilal Jutt');
  const [email, setEmail] = useState('executive@bilaljutt.com');
  const [phone, setPhone] = useState('300 0000000');
  const [dialIndex, setDialIndex] = useState(0);
  const [password, setPassword] = useState('OnyxTitanium#2025');
  const [confirmPassword, setConfirmPassword] = useState('OnyxTitanium#2025');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const dialCodes = [
    { flag: '🇵🇰', code: '+92', country: 'PK' },
    { flag: '🇦🇪', code: '+971', country: 'AE' },
    { flag: '🇺🇸', code: '+1', country: 'US' },
    { flag: '🇬🇧', code: '+44', country: 'UK' },
  ];

  const handleCountryToggle = () => {
    setDialIndex((prev) => (prev + 1) % dialCodes.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      showExecutiveToast('Please agree to the Executive Terms.', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccessSignUp();
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-surface text-on-surface flex flex-col p-5 select-none relative overflow-hidden pt-safe pb-safe max-w-md mx-auto">
      {/* Top Ambient Glow Aura */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-44 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between py-2 mb-4 relative z-10">
        <button
          type="button"
          onClick={() => onNavigate('signin')}
          aria-label="Go Back"
          className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface shadow-sm active:scale-95 transition-transform border border-white/5"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high shadow-inner border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-primary tracking-wider uppercase font-bold">
            Privé Member Access
          </span>
        </div>
      </div>

      {/* Title & Brand Framing */}
      <div className="mb-5 relative z-10">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-syne font-bold text-lg text-primary">Bilal Jutt</span>
          <span
            className="material-symbols-outlined text-[16px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
        </div>
        <h1 className="font-syne text-2xl font-bold text-on-surface tracking-tight mb-1">
          Create Executive Account
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          Experience seamless personal productivity and high-tier lifestyle management.
        </p>
      </div>

      {/* Bento Registration Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 relative z-10">
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-on-surface-variant flex items-center justify-between">
            <span>Executive Name</span>
            <span className="text-[10px] text-primary/80 font-bold">Verified ID</span>
          </label>
          <div className="relative flex items-center bg-surface-container-low rounded-xl px-3.5 py-3 shadow-sm border border-white/5 focus-within:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-outline text-[20px] mr-2.5">person</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Bilal Jutt"
              className="w-full bg-transparent text-sm font-semibold text-on-surface placeholder:text-outline focus:outline-none"
              required
            />
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
          </div>
        </div>

        {/* Corporate Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-on-surface-variant">Corporate Email</label>
          <div className="relative flex items-center bg-surface-container-low rounded-xl px-3.5 py-3 shadow-sm border border-white/5 focus-within:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-outline text-[20px] mr-2.5">mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="executive@bilaljutt.com"
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Phone with Dial Selector */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-on-surface-variant">Encrypted Direct Line</label>
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <button
              type="button"
              onClick={handleCountryToggle}
              className="flex items-center justify-center gap-1.5 bg-surface-container-low rounded-xl px-2.5 py-3 shadow-sm active:bg-surface-container transition-colors text-left border border-white/5"
            >
              <span className="text-base leading-none">{dialCodes[dialIndex].flag}</span>
              <span className="text-xs text-on-surface font-bold">{dialCodes[dialIndex].code}</span>
              <span className="material-symbols-outlined text-[16px] text-outline ml-auto">expand_more</span>
            </button>
            <div className="relative flex items-center bg-surface-container-low rounded-xl px-3.5 py-3 shadow-sm border border-white/5 focus-within:bg-surface-container transition-colors">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="300 0000000"
                className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none tracking-wide"
                required
              />
              <span className="material-symbols-outlined text-outline text-[18px]">phone_iphone</span>
            </div>
          </div>
        </div>

        {/* Master Cipher Key & Strength */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-on-surface-variant">Master Cipher Key</label>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[14px]">shield</span>
              <span className="text-[10px] text-primary font-bold">Tier 4 Vault Grade</span>
            </div>
          </div>
          <div className="relative flex items-center bg-surface-container-low rounded-xl px-3.5 py-3 shadow-sm border border-white/5 focus-within:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-outline text-[20px] mr-2.5">lock</span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none tracking-wider"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-outline hover:text-on-surface transition-colors p-1"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>

          {/* Security Strength Bar */}
          <div className="bg-surface-container-lowest rounded-xl p-2.5 flex flex-col gap-1.5 mt-1 border border-white/5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-on-surface-variant font-medium">Complexity Assessment</span>
              <span className="text-primary font-bold flex items-center gap-1">
                Strong Password
                <span
                  className="material-symbols-outlined text-[12px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 w-full h-1.5">
              <div className="bg-primary rounded-full shadow-sm" />
              <div className="bg-primary rounded-full shadow-sm" />
              <div className="bg-primary rounded-full shadow-sm" />
              <div className="bg-primary-container rounded-full opacity-80" />
            </div>
          </div>
        </div>

        {/* Confirm Cipher Key */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-on-surface-variant">Confirm Cipher Key</label>
          <div className="relative flex items-center bg-surface-container-low rounded-xl px-3.5 py-3 shadow-sm border border-white/5 focus-within:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-outline text-[20px] mr-2.5">key</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter cipher"
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none tracking-wider"
              required
            />
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-[14px] font-bold">check</span>
            </div>
          </div>
        </div>

        {/* Visual Concierge Accent Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-high/60 shadow-sm border border-white/5">
          <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">
              workspace_premium
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-on-surface truncate">
              Concierge & Lifestyle Synchronized
            </span>
            <span className="text-[10px] text-on-surface-variant truncate">
              Ultra-low latency private cloud dedicated node
            </span>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2.5 select-none pt-1">
          <label className="flex items-center cursor-pointer mt-0.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-lg bg-surface-container-low peer-checked:bg-primary transition-all flex items-center justify-center shadow-inner shrink-0 border border-white/10">
              {agreed && (
                <span className="material-symbols-outlined text-[14px] text-on-primary font-bold">
                  check
                </span>
              )}
            </div>
          </label>
          <span className="text-xs text-on-surface-variant leading-snug">
            I agree to the{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-primary font-semibold underline decoration-primary/40 inline text-left"
            >
              Executive Terms
            </button>{' '}
            &{' '}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-primary font-semibold underline decoration-primary/40 inline text-left"
            >
              Privacy Protocol
            </button>
            .
          </span>
        </div>

        {/* CTAs */}
        <div className="pt-2 flex flex-col gap-2.5">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden bg-primary text-on-primary py-3.5 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:brightness-105"
          >
            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>

          <button
            type="button"
            onClick={onSuccessSignUp}
            className="w-full bg-surface-container-low text-on-surface py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm active:bg-surface-container transition-colors border border-white/5"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">fingerprint</span>
            <span>Register via Passkey / Face ID</span>
          </button>
        </div>
      </form>

      {/* Bottom Navigation Link */}
      <div className="mt-5 text-center flex items-center justify-center gap-1.5 pb-4">
        <span className="text-xs text-on-surface-variant">Already registered?</span>
        <button
          type="button"
          onClick={() => onNavigate('signin')}
          className="text-xs text-primary font-bold hover:underline transition-colors py-1 px-1"
        >
          Sign In
        </button>
      </div>

      {/* Terms Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </div>
  );
};
