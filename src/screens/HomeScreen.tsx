import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { ScreenType, Task, UserProfile } from '../types';
import { MeetingRoomModal, DocScannerModal } from '../components/ExecutiveModals';

interface HomeScreenProps {
  tasks: Task[];
  profile?: UserProfile;
  onToggleTask: (taskId: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenNewTaskModal: () => void;
  onOpenNewNoteModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  tasks,
  profile,
  onToggleTask,
  onNavigate,
  onOpenNewTaskModal,
  onOpenNewNoteModal,
}) => {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);

  // Focus metrics calculation
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length || 9;
  const focusPercentage = Math.round((completedCount / totalCount) * 100) || 78;

  return (
    <div className="flex flex-col w-full space-y-4 pb-28 pt-20 px-4 max-w-md mx-auto select-none">
      {/* Executive Header Suite Greeting */}
      <section className="relative w-full rounded-3xl bg-surface-container p-4 shadow-xl overflow-hidden border border-white/5">
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Executive Avatar with glowing golden aura */}
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              aria-label="View Profile"
              className="relative shrink-0 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-primary via-primary-container to-secondary-fixed shadow-[0_0_16px_rgba(229,184,105,0.35)] flex items-center justify-center">
                <img
                  src={profile?.avatarUrl || ASSETS.bilalAvatar}
                  alt={profile?.fullName || 'Bilal Jutt portrait'}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* Verified Executive Badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                <span
                  className="material-symbols-outlined text-[12px] font-bold"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </button>

            {/* Typography Stack */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] text-primary uppercase tracking-widest truncate font-bold">
                  Thursday, Oct 24 • Premium Tier
                </span>
              </div>
              <h2 className="font-syne text-xl text-on-surface font-bold tracking-tight truncate">
                Welcome, {profile?.fullName ? profile.fullName.split(' ')[0] : 'Bilal'}
              </h2>
              <span className="text-xs text-on-surface-variant truncate">
                Command desk ready • 2 urgent actions
              </span>
            </div>
          </div>

          {/* Quick Action Utility Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('search')}
              aria-label="Global Search"
              className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-primary transition-all active:scale-95 shadow-sm border border-white/5"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('alerts')}
              aria-label="Alerts"
              className="relative w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-primary transition-all active:scale-95 shadow-sm border border-white/5"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(229,184,105,0.8)]" />
            </button>
          </div>
        </div>
      </section>

      {/* Daily Overview Bento Cluster */}
      <section className="w-full grid grid-cols-2 gap-3">
        {/* Bento 1: Executive Focus Progress (Spans 2 columns) */}
        <div
          onClick={() => onNavigate('tasks')}
          className="col-span-2 relative rounded-3xl bg-surface-container p-4 overflow-hidden shadow-lg flex items-center justify-between border border-white/5 cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="relative z-10 flex flex-col justify-between h-full max-w-[62%]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">target</span>
              <span className="text-xs text-on-surface-variant tracking-wide font-medium">
                Executive Focus
              </span>
            </div>
            <div className="my-1.5">
              <div className="font-syne text-3xl text-on-surface font-extrabold tracking-tight">
                {focusPercentage}%
              </div>
              <p className="text-xs text-on-surface-variant leading-snug">
                Daily targets fulfilled. {completedCount} of {totalCount} critical milestones locked.
              </p>
            </div>
            <div className="inline-flex items-center gap-1 py-1 px-2.5 rounded-full bg-surface-container-highest text-primary text-[11px] font-semibold w-fit border border-white/5">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>Pacing 1.4x above avg</span>
            </div>
          </div>

          {/* Tactile Circular Ring SVG */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-surface-container-highest"
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="currentColor"
                strokeWidth="8"
              />
              <circle
                className="text-primary transition-all duration-1000 ease-out"
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="currentColor"
                strokeDasharray="238.7"
                strokeDashoffset={238.7 - (238.7 * focusPercentage) / 100}
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="material-symbols-outlined text-primary text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-[11px] text-on-surface-variant font-bold mt-0.5">
                {completedCount}/{totalCount}
              </span>
            </div>
          </div>
        </div>

        {/* Bento 2: Productivity Score Tile */}
        <div
          onClick={() => onNavigate('tasks')}
          className="col-span-1 rounded-3xl bg-surface-container p-4 flex flex-col justify-between shadow-md relative overflow-hidden border border-white/5 cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-medium">Productivity</span>
            <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-syne text-2xl text-on-surface font-bold">94</span>
              <span className="text-xs text-primary font-semibold">+6%</span>
            </div>
            <span className="text-xs text-on-surface-variant">Top 2% velocity</span>
          </div>
          {/* Mini Sparkline SVG */}
          <div className="w-full h-7 pt-1">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path
                className="text-primary"
                d="M0,24 Q20,22 35,16 T70,12 T100,4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <circle className="text-primary" cx="100" cy="4" fill="currentColor" r="3" />
            </svg>
          </div>
        </div>

        {/* Bento 3: Upcoming Meeting Tile */}
        <div
          onClick={() => setShowMeetingModal(true)}
          className="col-span-1 rounded-3xl bg-surface-container p-4 flex flex-col justify-between shadow-md relative overflow-hidden border border-white/5 cursor-pointer active:scale-[0.98] transition-transform group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary font-semibold">In 1h 45m</span>
            <span className="material-symbols-outlined text-secondary text-[18px] group-hover:scale-110 transition-transform">
              videocam
            </span>
          </div>
          <div className="my-1">
            <div className="text-xs font-bold text-on-surface leading-tight truncate">CEO Advisory</div>
            <p className="text-[11px] text-on-surface-variant truncate">Global Expansion Q4</p>
          </div>
          <div className="flex items-center gap-1.5 pt-1 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span>
            <span className="text-on-surface font-medium">2:30 PM</span>
          </div>
        </div>
      </section>

      {/* Quick Command Pills */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
            Executive Commands
          </h3>
          <span className="text-[11px] text-on-surface-variant">Instant tools</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {/* New Task Trigger */}
          <button
            type="button"
            onClick={onOpenNewTaskModal}
            className="shrink-0 h-10 px-4 rounded-full bg-primary-container text-on-primary-container text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(229,184,105,0.3)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Task</span>
          </button>

          {/* Quick Note Trigger */}
          <button
            type="button"
            onClick={onOpenNewNoteModal}
            className="shrink-0 h-10 px-3.5 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 hover:text-primary transition-all active:scale-95 border border-white/5"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">edit_note</span>
            <span>Quick Note</span>
          </button>

          {/* Scan Doc Trigger */}
          <button
            type="button"
            onClick={() => setShowScannerModal(true)}
            className="shrink-0 h-10 px-3.5 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 hover:text-secondary transition-all active:scale-95 border border-white/5"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">document_scanner</span>
            <span>Scan Doc</span>
          </button>

          {/* Priority Call Trigger */}
          <button
            type="button"
            onClick={() => onNavigate('help')}
            className="shrink-0 h-10 px-3.5 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 hover:text-primary transition-all active:scale-95 border border-white/5"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">phone_in_talk</span>
            <span>Priority Call</span>
          </button>
        </div>
      </section>

      {/* Signature Directive Feature Capsule */}
      <section
        onClick={() => onNavigate('notes')}
        className="w-full relative rounded-3xl overflow-hidden bg-surface-container shadow-xl cursor-pointer group border border-white/5 active:scale-98 transition-transform"
      >
        <div className="relative w-full h-36 bg-surface-container-lowest">
          <img
            src={ASSETS.singaporeSkyline}
            alt="Singapore Skyline Architecture"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-primary tracking-widest uppercase font-bold">
                Signature Directive
              </span>
              <span className="font-syne text-lg text-on-surface font-bold">
                Q4 Sovereign Expansion
              </span>
            </div>
            <div className="p-2 rounded-full bg-surface-container-high/80 backdrop-blur-md text-primary flex items-center justify-center border border-white/5 shadow-md">
              <span className="material-symbols-outlined text-[20px]">north_east</span>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Agenda Tasks */}
      <section className="w-full space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base text-on-surface tracking-tight">Priority Agenda</h3>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-[10px] font-bold text-primary border border-white/5">
              3 Critical
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('tasks')}
            className="text-xs text-primary hover:underline font-semibold"
          >
            View All
          </button>
        </div>

        {/* Task Cards */}
        <div className="flex flex-col space-y-2.5">
          {tasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="w-full rounded-2xl bg-surface-container p-3.5 shadow-md flex items-start gap-3 transition-all duration-300 border border-white/5 hover:bg-surface-container-high/80"
            >
              <button
                type="button"
                onClick={() => onToggleTask(task.id)}
                aria-label={`Toggle ${task.title}`}
                className={`shrink-0 w-6 h-6 mt-0.5 rounded-lg flex items-center justify-center transition-all active:scale-90 ${
                  task.completed
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'bg-surface-container-highest text-transparent hover:bg-primary-container/30'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
              </button>

              <div
                onClick={() => onNavigate('tasks')}
                className="flex-1 min-w-0 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-sm font-semibold truncate ${
                      task.completed ? 'line-through text-on-surface-variant' : 'text-on-surface'
                    }`}
                  >
                    {task.title}
                  </h4>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      task.completed
                        ? 'bg-primary/20 text-primary'
                        : task.priority === 'High'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}
                  >
                    {task.completed ? 'Done' : task.priority || 'Active'}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-1 text-on-surface-variant text-xs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    {task.time}
                  </span>
                  {task.tagDetail && (
                    <span className="flex items-center gap-1 truncate text-outline">
                      <span>•</span>
                      <span>{task.tagDetail}</span>
                    </span>
                  )}
                  {task.completed && (
                    <span className="flex items-center gap-1 text-primary ml-auto font-medium">
                      <span className="material-symbols-outlined text-[13px]">verified</span> Complete
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Executive Activity Feed */}
      <section className="w-full space-y-2 pb-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-semibold text-base text-on-surface tracking-tight">Recent Activity</h3>
          <span className="text-xs text-on-surface-variant">Live audit</span>
        </div>

        <div className="w-full rounded-2xl bg-surface-container p-3.5 space-y-3 shadow-md border border-white/5">
          {/* Activity Item 1 */}
          <button
            type="button"
            onClick={() => onNavigate('notes')}
            className="w-full flex items-start gap-3 text-left hover:bg-surface-container-high p-1 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">mic</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-on-surface truncate">
                Noted voice memo: Investment Thesis
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-on-surface-variant">15m ago</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant" />
                <span className="text-[10px] text-primary font-semibold">AI Transcribed</span>
              </div>
            </div>
          </button>

          {/* Activity Item 2 */}
          <button
            type="button"
            onClick={() => onNavigate('settings')}
            className="w-full flex items-start gap-3 text-left hover:bg-surface-container-high p-1 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">cloud_done</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-on-surface truncate">
                System backup synced to Private Cloud
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-on-surface-variant">1h ago</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant" />
                <span className="text-[10px] text-secondary font-semibold">
                  Zero-Knowledge Encrypted
                </span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Boardroom Video Conference Modal */}
      <MeetingRoomModal
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
      />

      {/* Document Scanner Simulation Modal */}
      <DocScannerModal
        isOpen={showScannerModal}
        onClose={() => setShowScannerModal(false)}
      />
    </div>
  );
};
