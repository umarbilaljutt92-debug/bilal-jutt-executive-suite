import React, { useState } from 'react';
import { Task } from '../../types';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  onUpdateTask,
  onDeleteTask,
}) => {
  if (!isOpen || !task) return null;

  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category);
  const [priority, setPriority] = useState(task.priority || 'Medium');
  const [time, setTime] = useState(task.time);
  const [tagDetail, setTagDetail] = useState(task.tagDetail || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTask({
      ...task,
      title: title.trim(),
      category,
      priority,
      time,
      tagDetail: tagDetail.trim() || undefined,
    });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdateTask({
      ...task,
      completed: !task.completed,
      completedTime: !task.completed ? 'Just now' : undefined,
    });
  };

  const handleToggleStar = () => {
    onUpdateTask({
      ...task,
      starred: !task.starred,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                category === 'Ventures'
                  ? 'bg-primary-container/20 text-primary'
                  : category === 'Personal'
                  ? 'bg-tertiary-container/20 text-tertiary-fixed'
                  : 'bg-surface-container-highest text-on-surface'
              }`}
            >
              {category}
            </span>
            <span className="text-xs text-on-surface-variant font-medium">• {time}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleToggleStar}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                task.starred ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              title="Toggle Star"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={task.starred ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                star
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Content View / Edit Mode */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                Milestone Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 px-3.5 bg-surface text-on-surface rounded-xl text-sm outline-none border border-white/10 focus:border-primary/40"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full h-11 px-3 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/10"
                >
                  <option value="Executive">Executive</option>
                  <option value="Ventures">Ventures</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                  Scheduled Time
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-11 px-3 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/10"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['High', 'Medium', 'Low'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`h-9 rounded-xl text-xs font-semibold transition-all ${
                      priority === p
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface text-on-surface-variant border border-white/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-on-surface-variant block mb-1">
                Contextual Tag / Notes
              </label>
              <input
                type="text"
                value={tagDetail}
                onChange={(e) => setTagDetail(e.target.value)}
                placeholder="e.g. Tier-1 Funds · 8 Files"
                className="w-full h-11 px-3.5 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/10"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-full text-xs text-on-surface-variant hover:text-on-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105 active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h2
                className={`text-lg font-bold tracking-tight ${
                  task.completed ? 'line-through text-on-surface-variant' : 'text-on-surface'
                }`}
              >
                {task.title}
              </h2>
              {task.tagDetail && (
                <p className="text-xs text-on-surface-variant mt-1">{task.tagDetail}</p>
              )}
            </div>

            {/* Task Info Pill Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-surface-container flex flex-col gap-0.5 border border-white/5">
                <span className="text-[10px] text-outline uppercase font-semibold">Priority</span>
                <span className="text-xs text-on-surface font-bold flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      task.priority === 'High'
                        ? 'bg-secondary'
                        : task.priority === 'Medium'
                        ? 'bg-primary'
                        : 'bg-outline'
                    }`}
                  />
                  {task.priority || 'Standard'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container flex flex-col gap-0.5 border border-white/5">
                <span className="text-[10px] text-outline uppercase font-semibold">Status</span>
                <span className="text-xs text-on-surface font-bold flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      task.completed ? 'bg-primary' : 'bg-secondary animate-pulse'
                    }`}
                  />
                  {task.completed ? 'Completed' : 'Pending Action'}
                </span>
              </div>
            </div>

            {/* Subtasks Progress */}
            {task.subtasksTotal && (
              <div className="p-3.5 rounded-xl bg-surface-container border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-on-surface">Subtasks Completed</span>
                  <span className="text-secondary">
                    {task.subtasksDone} of {task.subtasksTotal}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-300"
                    style={{
                      width: `${((task.subtasksDone || 0) / task.subtasksTotal) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-surface-container-high">
              <button
                type="button"
                onClick={handleToggleComplete}
                className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  task.completed
                    ? 'bg-surface-container-high text-on-surface hover:text-primary'
                    : 'bg-primary-container text-on-primary-container shadow-sm'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {task.completed ? 'undo' : 'check'}
                </span>
                <span>{task.completed ? 'Mark as Incomplete' : 'Complete Task'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary"
                  title="Edit Task"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Permanently remove this task from sovereign schedule?')) {
                      onDeleteTask(task.id);
                      onClose();
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-error hover:bg-error-container/20"
                  title="Delete Task"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
