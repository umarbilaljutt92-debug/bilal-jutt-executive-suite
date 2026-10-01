import React, { useState } from 'react';
import { NotificationItem } from '../types';
import { MeetingRoomModal, ModalWrapper } from '../components/ExecutiveModals';
import { showExecutiveToast } from '../utils/toast';

interface AlertsScreenProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onMarkItemRead?: (id: string) => void;
  onDismissNotification?: (id: string) => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  notifications,
  onMarkAllAsRead,
  onMarkItemRead,
  onDismissNotification,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'system' | 'vip'>('all');
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState<string | null>(null);
  const [showMetricsModal, setShowMetricsModal] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    onMarkAllAsRead();
    showExecutiveToast('All alerts marked as read.', 'success');
  };

  const handleItemClick = (id: string) => {
    if (onMarkItemRead) {
      onMarkItemRead(id);
    }
  };

  const handleDismiss = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onDismissNotification) {
      onDismissNotification(id);
      showExecutiveToast('Alert dismissed.', 'info');
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return n.unread;
    if (activeFilter === 'system') return n.category === 'system';
    if (activeFilter === 'vip') return n.category === 'vip';
    return true;
  });

  const todayItems = filteredNotifications.filter((n) => n.period === 'today');
  const earlierItems = filteredNotifications.filter((n) => n.period === 'earlier');

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto select-none space-y-4">
      {/* Status & Quick Action Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs uppercase tracking-wider text-primary font-bold">
            {unreadCount} Active {unreadCount === 1 ? 'Alert' : 'Alerts'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/60 text-primary hover:bg-surface-container-highest transition-all duration-200 active:scale-95 shadow-sm border border-primary/20 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="material-symbols-outlined text-[15px] text-primary">
            {unreadCount === 0 ? 'done' : 'done_all'}
          </span>
          <span className="text-xs font-semibold">
            {unreadCount === 0 ? 'All caught up' : 'Mark all as read'}
          </span>
        </button>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`flex items-center gap-1.5 px-3.5 h-8 rounded-full text-xs font-semibold transition-all active:scale-95 ${
            activeFilter === 'all'
              ? 'bg-primary text-on-primary shadow-[0_2px_12px_rgba(229,184,105,0.25)]'
              : 'bg-surface-container-high/80 text-on-surface-variant hover:text-on-surface border border-white/5'
          }`}
        >
          <span>All</span>
          <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">
            {notifications.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('unread')}
          className={`flex items-center gap-1.5 px-3.5 h-8 rounded-full text-xs font-semibold transition-all active:scale-95 ${
            activeFilter === 'unread'
              ? 'bg-primary text-on-primary shadow-[0_2px_12px_rgba(229,184,105,0.25)]'
              : 'bg-surface-container-high/80 text-on-surface-variant hover:text-on-surface border border-white/5'
          }`}
        >
          <span>Unread</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              unreadCount > 0 ? 'bg-primary/20 text-primary font-bold' : 'bg-surface-container-highest'
            }`}
          >
            {unreadCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('system')}
          className={`flex items-center px-3.5 h-8 rounded-full text-xs font-semibold transition-all active:scale-95 ${
            activeFilter === 'system'
              ? 'bg-primary text-on-primary shadow-[0_2px_12px_rgba(229,184,105,0.25)]'
              : 'bg-surface-container-high/80 text-on-surface-variant hover:text-on-surface border border-white/5'
          }`}
        >
          System
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('vip')}
          className={`flex items-center gap-1.5 px-3.5 h-8 rounded-full text-xs font-semibold transition-all active:scale-95 ${
            activeFilter === 'vip'
              ? 'bg-primary text-on-primary shadow-[0_2px_12px_rgba(229,184,105,0.25)]'
              : 'bg-surface-container-high/80 text-on-surface-variant hover:text-on-surface border border-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">hotel_class</span>
          <span>VIP Alerts</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col space-y-4">
        {/* Today Section */}
        {todayItems.length > 0 && (
          <div className="flex flex-col space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Today
                </span>
                <span className="h-1 w-1 rounded-full bg-outline-variant" />
                <span className="text-[10px] text-primary font-semibold">
                  Unread ({todayItems.filter((i) => i.unread).length})
                </span>
              </div>
              <span className="text-[10px] text-on-surface-variant/70">Real-time Priority</span>
            </div>

            {todayItems.map((item) => (
              <article
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="group relative flex flex-col p-4 rounded-2xl bg-surface-container transition-all duration-300 hover:bg-surface-container-high shadow-md overflow-hidden border border-white/5 cursor-pointer"
              >
                <div className="flex items-start gap-3 relative z-10">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        item.category === 'vip' ? 'text-secondary' : 'text-primary'
                      }`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.category === 'vip' ? 'calendar_clock' : 'notifications_active'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-sm font-semibold text-on-surface truncate leading-tight">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-on-surface-variant">{item.time}</span>
                        {item.unread && (
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(255,213,141,0.9)] animate-pulse" />
                        )}
                        {onDismissNotification && (
                          <button
                            type="button"
                            onClick={(e) => handleDismiss(e, item.id)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-outline hover:text-error opacity-60 hover:opacity-100 transition-opacity"
                            title="Dismiss notification"
                          >
                            <span className="material-symbols-outlined text-[13px]">close</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-on-surface-variant mt-1 leading-snug">{item.body}</p>

                    {item.tag && (
                      <div className="flex items-center gap-2 mt-2.5 pt-1.5 text-on-surface-variant/80 text-[11px]">
                        <span className="inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold">
                          <span className="material-symbols-outlined text-[12px]">shield</span>
                          {item.tag}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">{item.tagDetail}</span>
                      </div>
                    )}

                    {item.avatars && (
                      <div className="flex items-center justify-between mt-3 pt-2">
                        <div className="flex items-center -space-x-1.5">
                          {item.avatars.map((av, idx) => (
                            <img
                              key={idx}
                              src={av}
                              alt="Board member"
                              className="w-6 h-6 rounded-full object-cover ring-2 ring-surface-container shadow-sm"
                            />
                          ))}
                          {item.extraAvatarsCount && (
                            <div className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center text-[10px] font-bold ring-2 ring-surface-container">
                              +{item.extraAvatarsCount}
                            </div>
                          )}
                        </div>

                        {item.actionText && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowMeetingModal(true);
                            }}
                            className="px-3 py-1 rounded-lg bg-secondary/15 text-secondary hover:bg-secondary/25 transition-colors text-xs font-bold flex items-center gap-1 active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[14px]">videocam</span>
                            <span>{item.actionText}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Earlier Section */}
        {earlierItems.length > 0 && (
          <div className="flex flex-col space-y-2.5">
            <div className="flex items-center justify-between px-1 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Earlier This Week
                </span>
                <span className="h-1 w-1 rounded-full bg-outline-variant" />
                <span className="text-[10px] text-on-surface-variant font-medium">Archive</span>
              </div>
              <span className="text-[10px] text-on-surface-variant/70">Completed</span>
            </div>

            {earlierItems.map((item) => (
              <article
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="group flex flex-col p-3.5 rounded-2xl bg-surface-container-low transition-all duration-200 hover:bg-surface-container shadow-sm opacity-90 hover:opacity-100 border border-white/5 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200">
                    <span
                      className="material-symbols-outlined text-[20px] text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.id === 'notif-3'
                        ? 'check_circle'
                        : item.id === 'notif-4'
                        ? 'cloud_done'
                        : 'hotel_class'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-xs sm:text-sm font-semibold text-on-surface truncate">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-on-surface-variant/70">
                          {item.time}
                        </span>
                        {onDismissNotification && (
                          <button
                            type="button"
                            onClick={(e) => handleDismiss(e, item.id)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-outline hover:text-error opacity-60 hover:opacity-100 transition-opacity"
                            title="Dismiss notification"
                          >
                            <span className="material-symbols-outlined text-[13px]">close</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-on-surface-variant mt-1 leading-snug">{item.body}</p>

                    {item.documentPath && (
                      <button
                        type="button"
                        onClick={() => setShowDocModal(item.documentPath || 'Confidential Document')}
                        className="flex items-center gap-1.5 mt-2 text-on-surface-variant text-[11px] hover:text-primary transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-[13px] text-primary">
                          folder_open
                        </span>
                        <span className="truncate underline decoration-primary/40">{item.documentPath}</span>
                      </button>
                    )}

                    {item.progressPercent && (
                      <div className="flex items-center gap-3 mt-2">
                        <div className="h-1.5 flex-1 max-w-[120px] bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-tertiary w-full rounded-full" />
                        </div>
                        <span className="text-[10px] text-tertiary font-bold">100% Secure</span>
                      </div>
                    )}

                    {item.growthMetric && (
                      <div className="flex items-center justify-between mt-2.5 pt-1">
                        <div className="flex items-center gap-1 text-[11px] text-primary font-semibold">
                          <span className="material-symbols-outlined text-[14px]">trending_up</span>
                          <span>{item.growthMetric}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowMetricsModal(true)}
                          className="text-[11px] text-on-surface hover:text-primary flex items-center gap-0.5 transition-colors font-medium active:scale-95"
                        >
                          <span>View Metrics</span>
                          <span className="material-symbols-outlined text-[13px]">chevron_right</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl bg-surface-container-low/50 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant mb-2">
              <span className="material-symbols-outlined text-[24px]">notifications_paused</span>
            </div>
            <h3 className="text-sm font-semibold text-on-surface">Quiet Horizon</h3>
            <p className="text-xs text-on-surface-variant max-w-[240px] mt-1">
              No notifications match your current executive filter.
            </p>
          </div>
        )}
      </div>

      {/* Boardroom Video Conference Modal */}
      <MeetingRoomModal
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
      />

      {/* Document Preview Modal */}
      {showDocModal && (
        <ModalWrapper
          isOpen={Boolean(showDocModal)}
          onClose={() => setShowDocModal(null)}
          title="Document Sealed"
          subtitle={showDocModal}
          icon="description"
        >
          <div className="space-y-3 text-xs text-on-surface-variant">
            <div className="p-4 rounded-2xl bg-surface-container border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface">Series B Capital Allocation</span>
                <span className="text-[10px] text-primary font-bold">LOCKED</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Hardware token signature confirmed. Syndicate commitments sealed across primary European and MENA institutions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                showExecutiveToast('Document downloaded via encrypted node.', 'success');
                setShowDocModal(null);
              }}
              className="w-full py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold"
            >
              Download PDF Copy
            </button>
          </div>
        </ModalWrapper>
      )}

      {/* Weekly Metrics Modal */}
      {showMetricsModal && (
        <ModalWrapper
          isOpen={showMetricsModal}
          onClose={() => setShowMetricsModal(false)}
          title="Productivity Telemetry"
          subtitle="Executive Velocity Index: 94%"
          icon="insights"
        >
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-surface-container">
                <span className="text-[10px] text-on-surface-variant block">Focus Velocity</span>
                <span className="font-syne text-lg font-bold text-primary">94% (+6%)</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container">
                <span className="text-[10px] text-on-surface-variant block">Deep Work</span>
                <span className="font-syne text-lg font-bold text-secondary">38.4 hrs</span>
              </div>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Your focus pacing ranked in the top 2% of private executive suite nodes this week with 100% milestone compliance on tier-1 deep work.
            </p>
            <button
              type="button"
              onClick={() => setShowMetricsModal(false)}
              className="w-full py-2.5 rounded-full bg-primary text-on-primary font-bold"
            >
              Dismiss
            </button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};
