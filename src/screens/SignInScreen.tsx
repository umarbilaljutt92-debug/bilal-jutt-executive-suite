import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { ScreenType } from '../types';
import { ModalWrapper } from '../components/ExecutiveModals';

interface SignInScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSuccessLogin: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onNavigate,
  onSuccessLogin,
}) => {
  const [identifier, setIdentifier] = useState('bilal@executive.com');
  const [password, setPassword] = useState('OnyxTitanium#2025');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('executive@bilaljutt.com');
  const [recoverySent, setRecoverySent] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('Authenticating session token & hardware enclave...');

    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage('Biometric Handshake Confirmed');
      setTimeout(() => {
        onSuccessLogin();
      }, 500);
    }, 900);
  };

  const handleBiometricLogin = () => {
    setIsLoading(true);
    setStatusMessage('Scanning Face ID / Biometric sensor...');

    setTimeout(() => {
      setStatusMessage('Biometric match verified: 99.8% confidence');
      setTimeout(() => {
        setIsLoading(false);
        onSuccessLogin();
      }, 700);
    }, 1000);
  };

  const handleSendRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverySent(true);
    setTimeout(() => {
      setShowRecoveryModal(false);
      setRecoverySent(false);
    }, 1600);
  };

  return (
    <div className="min-h-screen w-full bg-surface text-on-surface flex flex-col justify-between p-5 select-none relative overflow-hidden pt-safe pb-safe max-w-md mx-auto">
      {/* Dynamic Luminous Background Glows */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/10 blur-[96px]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-60 h-60 rounded-full bg-secondary-container/10 blur-[80px]" />

      {/* Header Bar with Back navigation and Branding */}
      <div className="w-full flex items-center justify-between relative z-10 pt-1">
        <button
          type="button"
          onClick={() => onNavigate('onboarding')}
          aria-label="Back to Onboarding"
          className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all shadow-sm border border-white/5"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="text-xs text-on-surface-variant hover:text-primary font-semibold py-1 px-3 rounded-full bg-surface-container-low"
        >
          Skip to Suite →
        </button>
      </div>

      <header className="flex flex-col items-center text-center mt-2 mb-4 relative z-10">
        <button
          type="button"
          onClick={() => onNavigate('splash')}
          className="relative group cursor-pointer mb-3"
          title="Return to Splash"
        >
          <div className="w-20 h-20 rounded-2xl bg-surface-container-high shadow-xl shadow-black/40 flex items-center justify-center p-2.5 transition-transform duration-300 active:scale-95 border border-primary/20">
            <img
              src={ASSETS.logo}
              alt="Bilal Jutt Monogram"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-md -z-10 group-hover:bg-primary/30 transition-all duration-300" />
        </button>

        <div className="space-y-1.5">
          <h1 className="font-syne text-3xl font-bold text-on-surface tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-[280px] mx-auto leading-relaxed">
            Sign in to access your personal executive dashboard.
          </p>
        </div>
      </header>

      {/* Login Form Container */}
      <div className="w-full bg-surface-container-lowest/80 backdrop-blur-2xl rounded-3xl p-5 space-y-4 shadow-2xl shadow-black/60 relative z-10 border border-surface-container-high">
        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Account Credential Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="identifier"
              className="block text-xs font-semibold text-on-surface-variant px-1"
            >
              Account Credential
            </label>
            <div className="relative flex items-center group transition-all duration-200">
              <div className="absolute left-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">alternate_email</span>
              </div>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                placeholder="bilal@executive.com or +1..."
                className="w-full h-12 pl-12 pr-10 bg-surface-container rounded-2xl text-on-surface text-sm placeholder:text-outline/60 focus:outline-none focus:bg-surface-container-high transition-all shadow-inner border border-white/5"
                required
              />
              <div className="absolute right-3 flex items-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
            </div>
          </div>

          {/* Security Key Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-on-surface-variant px-1"
            >
              Security Key
            </label>
            <div className="relative flex items-center group transition-all duration-200">
              <div className="absolute left-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full h-12 pl-12 pr-12 bg-surface-container rounded-2xl text-on-surface text-sm tracking-wider placeholder:tracking-normal placeholder:text-outline/60 focus:outline-none focus:bg-surface-container-high transition-all shadow-inner border border-white/5"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="absolute right-3.5 w-8 h-8 rounded-xl flex items-center justify-center text-outline hover:text-on-surface active:scale-90 transition-all focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Options Row: Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1 px-1">
            <label className="flex items-center gap-2 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded-lg bg-surface-container-high flex items-center justify-center text-on-primary transition-all duration-200 peer-checked:bg-primary-container peer-checked:shadow-sm">
                {rememberMe && (
                  <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                )}
              </div>
              <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors font-medium">
                Remember me
              </span>
            </label>

            <button
              type="button"
              onClick={() => setShowRecoveryModal(true)}
              className="text-xs text-primary hover:underline transition-colors py-1 focus:outline-none font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full h-13 rounded-full bg-gradient-to-r from-primary-fixed-dim via-primary-container to-surface-tint text-on-primary font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary-container/30 transition-all duration-200 active:scale-[0.98] hover:shadow-primary-container/50 focus:outline-none overflow-hidden group disabled:opacity-75"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </span>
            </button>
          </div>
        </form>

        {/* Visual Divider */}
        <div className="relative flex items-center justify-center py-1">
          <div className="w-full h-px bg-surface-container-highest" />
          <span className="absolute px-3 bg-surface-container-lowest text-outline text-[10px] uppercase tracking-wider font-semibold">
            or continue with
          </span>
        </div>

        {/* Biometric Button */}
        <button
          type="button"
          onClick={handleBiometricLogin}
          disabled={isLoading}
          className="w-full h-12 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] shadow-md shadow-black/40 group border border-white/5"
        >
          <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[18px]">fingerprint</span>
          </div>
          <span className="text-xs font-semibold text-on-surface">Face ID / Biometric Login</span>
        </button>

        {/* Status Toast */}
        {statusMessage && (
          <div className="text-center py-2 px-3 rounded-xl bg-surface-container-high text-xs text-primary transition-all animate-pulse border border-primary/20">
            {statusMessage}
          </div>
        )}
      </div>

      {/* Auxiliary Footer */}
      <footer className="mt-6 text-center relative z-10 pb-4">
        <p className="text-xs text-on-surface-variant">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('signup')}
            className="text-xs text-primary font-bold hover:underline transition-colors ml-1"
          >
            Sign Up
          </button>
        </p>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-outline/60 text-[10px] uppercase tracking-widest font-semibold">
          <span className="material-symbols-outlined text-[14px]">lock_clock</span>
          <span>End-to-End Encrypted Node</span>
        </div>
      </footer>

      {/* Password Recovery Modal */}
      {showRecoveryModal && (
        <ModalWrapper
          isOpen={showRecoveryModal}
          onClose={() => setShowRecoveryModal(false)}
          title="Security Key Recovery"
          subtitle="Encrypted Recovery Dispatch"
          icon="lock_reset"
        >
          <form onSubmit={handleSendRecovery} className="space-y-3 text-xs">
            <p className="text-on-surface-variant leading-relaxed">
              Enter your corporate email. A one-time cryptographic authorization cipher will be routed to your hardware key.
            </p>
            <input
              type="email"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              className="w-full h-11 px-3 bg-surface text-on-surface rounded-xl outline-none border border-white/5 focus:border-primary/40 text-xs"
              required
            />
            {recoverySent ? (
              <div className="p-3 rounded-xl bg-primary/10 text-primary text-center font-semibold">
                Authorization cipher dispatched to inbox.
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs shadow-md"
              >
                Send Recovery Cipher
              </button>
            )}
          </form>
        </ModalWrapper>
      )}
    </div>
  );
};
