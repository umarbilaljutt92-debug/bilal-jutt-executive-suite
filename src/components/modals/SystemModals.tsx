import React, { useState } from 'react';

// 1. Linked Devices Modal
export const LinkedDevicesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [devices, setDevices] = useState([
    {
      id: 'd-1',
      name: 'iPhone 16 Pro Max',
      type: 'Primary Handset',
      icon: 'phone_iphone',
      lastActive: 'Active now',
      ip: '194.230.145.22 (Zurich)',
      isCurrent: false,
    },
    {
      id: 'd-2',
      name: 'iPad Pro M4 13"',
      type: 'Executive Console',
      icon: 'tablet_mac',
      lastActive: 'Active now (This Device)',
      ip: '194.230.145.22 (Zurich)',
      isCurrent: true,
    },
    {
      id: 'd-3',
      name: 'MacBook Pro M3 Max',
      type: 'Secure Workstation',
      icon: 'laptop_mac',
      lastActive: '2 hours ago',
      ip: '86.98.112.45 (Dubai)',
      isCurrent: false,
    },
  ]);

  const handleDisconnect = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
    alert('Device cryptographic session revoked.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">devices</span>
            <h3 className="font-semibold text-base text-on-surface">Linked Devices (Mesh)</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant">
          Hardware-anchored zero-knowledge peer sync active across all authorized executive nodes.
        </p>

        <div className="space-y-2">
          {devices.map((device) => (
            <div
              key={device.id}
              className="p-3.5 rounded-2xl bg-surface-container border border-white/5 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{device.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-on-surface truncate">{device.name}</h4>
                    {device.isCurrent && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-primary/20 text-primary font-bold">
                        Current
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-on-surface-variant block">{device.type}</span>
                  <span className="text-[10px] text-outline font-mono">{device.ip}</span>
                </div>
              </div>

              {!device.isCurrent ? (
                <button
                  type="button"
                  onClick={() => handleDisconnect(device.id)}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-error-container/20 text-error text-[10px] font-bold shrink-0 transition-colors"
                >
                  Revoke
                </button>
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shrink-0" />
              )}
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-surface-container-high">
          <button
            type="button"
            onClick={() => {
              alert('Force mesh resynchronization complete.');
            }}
            className="px-4 py-2.5 rounded-full bg-surface-container-high text-xs text-on-surface font-semibold hover:bg-surface-bright"
          >
            Force Sync
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Custom Script Request Modal
export const CustomScriptModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [workflowType, setWorkflowType] = useState('Automated Cap-Table Sync');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Engineering request dispatched to VIP Ops desk. SLA clock started: 2 business hours.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">terminal</span>
            <h3 className="font-semibold text-base text-on-surface">Custom System Integration</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
              Integration Workflow Type
            </label>
            <select
              value={workflowType}
              onChange={(e) => setWorkflowType(e.target.value)}
              className="w-full h-11 px-3 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/10"
            >
              <option value="Automated Cap-Table Sync">Automated Cap-Table Sync</option>
              <option value="Private Banking API Webhook">Private Banking API Webhook</option>
              <option value="Air-gapped Cold Key Rotator">Air-gapped Cold Key Rotator</option>
              <option value="Executive Calendar Auto-Gatekeeper">Executive Calendar Auto-Gatekeeper</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
              Technical Specifications &amp; Requirements
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Outline specific data formats, authentication parameters, or custom cron triggers..."
              rows={4}
              className="w-full p-3.5 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/10 resize-none leading-relaxed"
              required
            />
          </div>

          <div className="p-3 rounded-xl bg-surface-container border border-white/5 flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Guaranteed Executive SLA</span>
            <span className="text-primary font-bold">2 Business Hours</span>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-surface-container-high">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Calendar View Modal
export const CalendarViewModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedDay: number;
  onSelectDay: (day: number) => void;
}> = ({ isOpen, onClose, selectedDay, onSelectDay }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
            <h3 className="font-semibold text-base text-on-surface">October 2026 Calendar</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-[10px] text-outline uppercase font-bold">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
            const isSelected = selectedDay === d;
            const hasMilestones = [21, 22, 23, 24, 25, 26, 27].includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => {
                  onSelectDay(d);
                  onClose();
                }}
                className={`h-10 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-primary text-on-primary font-bold shadow-md'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span>{d}</span>
                {hasMilestones && (
                  <span
                    className={`w-1 h-1 rounded-full mt-0.5 ${
                      isSelected ? 'bg-on-primary' : 'bg-primary'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-primary text-on-primary text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
