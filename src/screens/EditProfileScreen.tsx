import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { UserProfile } from '../types';

interface EditProfileScreenProps {
  profile: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
  onBack: () => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  profile,
  onSave,
  onBack,
}) => {
  const [fullName, setFullName] = useState(profile.fullName);
  const [executiveTitle, setExecutiveTitle] = useState(profile.executiveTitle);
  const [bio, setBio] = useState(profile.bio);
  const [corporateEmail, setCorporateEmail] = useState(profile.corporateEmail);
  const [phone, setPhone] = useState(profile.phone);
  const [location, setLocation] = useState(profile.location);
  const [publicVerification, setPublicVerification] = useState(profile.publicVerification);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [showToast, setShowToast] = useState(false);

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setAvatarUrl(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    onSave({
      fullName,
      executiveTitle,
      bio,
      corporateEmail,
      phone,
      location,
      publicVerification,
      avatarUrl,
    });

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onBack();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto select-none space-y-4">
      {/* Sub Header Bar */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all shadow-sm border border-white/5"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back_ios_new</span>
          </button>
          <span className="font-semibold text-base text-on-surface tracking-tight">Edit Profile</span>
        </div>

        <button
          type="button"
          onClick={() => handleSave()}
          className="text-primary hover:text-primary-fixed text-xs font-bold transition-colors px-2 py-1 active:scale-95 flex items-center gap-1"
        >
          <span>Save</span>
          <span className="material-symbols-outlined text-[16px]">done</span>
        </button>
      </div>

      {/* Avatar Section */}
      <section className="flex flex-col items-center justify-center py-2 relative">
        <div onClick={handlePhotoUpload} className="relative group cursor-pointer">
          <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-primary-container via-surface-bright to-secondary-container shadow-xl relative overflow-hidden flex items-center justify-center">
            <img
              src={avatarUrl || ASSETS.bilalAvatar}
              alt="Bilal Jutt Executive Portrait"
              className="w-full h-full rounded-full object-cover shadow-inner group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <button
            type="button"
            aria-label="Upload New Photo"
            className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary-fixed via-primary-container to-inverse-primary text-on-primary-fixed flex items-center justify-center shadow-lg active:scale-90 transition-transform border border-black"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              photo_camera
            </span>
          </button>
        </div>

        <div className="mt-2.5 flex flex-col items-center gap-1 text-center">
          <button
            type="button"
            onClick={handlePhotoUpload}
            className="text-xs text-primary font-bold hover:underline py-0.5 px-3 rounded-full bg-surface-container-high/60 active:scale-95 transition-all border border-white/5"
          >
            Change Profile Photo
          </button>
          <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-secondary">verified_user</span>
            Biometric Tier: Certified Identity
          </span>
        </div>
      </section>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="flex flex-col gap-3">
        {/* Full Legal Name */}
        <div className="bg-surface-container-low rounded-xl p-3.5 shadow-md flex flex-col gap-1 border border-white/5 focus-within:bg-surface-container transition-all">
          <div className="flex items-center justify-between">
            <label
              htmlFor="fullName"
              className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold"
            >
              Full Legal Name
            </label>
            <span className="material-symbols-outlined text-[15px] text-primary">edit</span>
          </div>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-transparent text-on-surface text-sm font-semibold focus:outline-none"
            required
          />
        </div>

        {/* Executive Title */}
        <div className="bg-surface-container-low rounded-xl p-3.5 shadow-md flex flex-col gap-1 border border-white/5 focus-within:bg-surface-container transition-all">
          <div className="flex items-center justify-between">
            <label
              htmlFor="executiveTitle"
              className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold"
            >
              Executive Title
            </label>
            <span className="material-symbols-outlined text-[15px] text-primary">badge</span>
          </div>
          <input
            id="executiveTitle"
            type="text"
            value={executiveTitle}
            onChange={(e) => setExecutiveTitle(e.target.value)}
            className="w-full bg-transparent text-on-surface text-sm focus:outline-none"
            required
          />
        </div>

        {/* Bio with Char Counter */}
        <div className="bg-surface-container-low rounded-xl p-3.5 shadow-md flex flex-col gap-1 border border-white/5 focus-within:bg-surface-container transition-all">
          <div className="flex items-center justify-between">
            <label
              htmlFor="bio"
              className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold"
            >
              Professional Headline / Bio
            </label>
            <span className="text-[10px] text-on-surface-variant tabular-nums font-semibold">
              {bio.length}/240
            </span>
          </div>
          <textarea
            id="bio"
            rows={3}
            maxLength={240}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-transparent text-on-surface text-xs focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Corporate Email */}
        <div className="bg-surface-container-low rounded-xl p-3.5 shadow-md flex flex-col gap-1 border border-white/5 focus-within:bg-surface-container transition-all">
          <div className="flex items-center justify-between">
            <label
              htmlFor="corporateEmail"
              className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold"
            >
              Primary Corporate Email
            </label>
            <span className="inline-flex items-center gap-1 text-[10px] text-secondary bg-surface-container px-2 py-0.5 rounded-full font-bold">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              Verified
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">mail</span>
            <input
              id="corporateEmail"
              type="email"
              value={corporateEmail}
              onChange={(e) => setCorporateEmail(e.target.value)}
              className="w-full bg-transparent text-on-surface text-sm focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Direct Phone */}
        <div className="bg-surface-container-low rounded-xl p-3.5 shadow-md flex flex-col gap-1 border border-white/5 focus-within:bg-surface-container transition-all">
          <div className="flex items-center justify-between">
            <label
              htmlFor="phone"
              className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold"
            >
              Direct Phone Number
            </label>
            <span className="material-symbols-outlined text-[15px] text-primary">call</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">lock</span>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent text-on-surface text-sm focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div className="bg-surface-container-low rounded-xl p-3.5 shadow-md flex flex-col gap-1 border border-white/5 focus-within:bg-surface-container transition-all">
          <div className="flex items-center justify-between">
            <label
              htmlFor="location"
              className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold"
            >
              City / Base of Operations
            </label>
            <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">public</span>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-on-surface text-sm focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Public Verification Toggle */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest flex items-center justify-between shadow-inner border border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-on-surface">Public Verification Badge</span>
              <span className="text-[10px] text-on-surface-variant">
                Visible to syndicate board members
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPublicVerification(!publicVerification)}
            className="w-11 h-6 rounded-full bg-surface-container-high transition-colors p-0.5 flex items-center cursor-pointer"
          >
            <div
              className={`w-5 h-5 rounded-full transition-transform ${
                publicVerification ? 'translate-x-5 bg-primary' : 'translate-x-0 bg-outline'
              } shadow-sm`}
            />
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-col items-center gap-2.5">
          <button
            type="submit"
            className="w-full h-13 rounded-full bg-gradient-to-r from-primary-fixed via-primary-container to-inverse-primary text-on-primary-fixed text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.99] transition-all"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span>Save Changes</span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface text-center transition-colors active:scale-95"
          >
            Cancel &amp; Discard
          </button>
        </div>
      </form>

      {/* Floating Save Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface text-xs font-semibold px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-primary/30 z-50 animate-in fade-in duration-200">
          <span
            className="material-symbols-outlined text-[18px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span>Executive profile updated successfully</span>
        </div>
      )}
    </div>
  );
};
