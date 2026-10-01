import React, { useState, useEffect } from 'react';
import { Task, TaskCategory } from '../types';
import { CalendarSheetModal } from '../components/ExecutiveModals';
import { showExecutiveToast } from '../utils/toast';

interface TasksScreenProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onToggleStar: (taskId: string) => void;
  onAddTask: (newTask: Omit<Task, 'id'>) => void;
  onDeleteTask?: (taskId: string) => void;
  onEditTask?: (taskId: string, updates: Partial<Task>) => void;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({
  tasks,
  onToggleTask,
  onToggleStar,
  onAddTask,
  onDeleteTask,
  onEditTask,
}) => {
  const [selectedDay, setSelectedDay] = useState(24);
  const [selectedFilter, setSelectedFilter] = useState<TaskCategory>('All');
  const [isCompletedOpen, setIsCompletedOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedTaskDetail, setSelectedTaskDetail] = useState<Task | null>(null);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskTime, setEditTaskTime] = useState('');
  const [editTaskCategory, setEditTaskCategory] = useState<Task['category']>('Executive');
  const [editTaskPriority, setEditTaskPriority] = useState<Task['priority']>('High');

  useEffect(() => {
    if (selectedTaskDetail) {
      setEditTaskTitle(selectedTaskDetail.title);
      setEditTaskTime(selectedTaskDetail.time);
      setEditTaskCategory(selectedTaskDetail.category);
      setEditTaskPriority(selectedTaskDetail.priority || 'High');
      setIsEditingTask(false);
    }
  }, [selectedTaskDetail]);

  // New task form fields
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Executive' | 'Ventures' | 'Personal'>('Executive');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const days = [
    { label: 'Mon', num: 21 },
    { label: 'Tue', num: 22 },
    { label: 'Wed', num: 23 },
    { label: 'Thu', num: 24 },
    { label: 'Fri', num: 25 },
    { label: 'Sat', num: 26 },
    { label: 'Sun', num: 27 },
  ];

  const completedTasks = tasks.filter((t) => t.completed);
  const uncompletedTasks = tasks.filter((t) => !t.completed);

  const filteredTasks = uncompletedTasks.filter((task) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Completed') return false;
    return task.category === selectedFilter;
  });

  const categoryCounts = {
    All: tasks.length,
    Executive: tasks.filter((t) => t.category === 'Executive').length,
    Personal: tasks.filter((t) => t.category === 'Personal').length,
    Ventures: tasks.filter((t) => t.category === 'Ventures').length,
    Completed: completedTasks.length,
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      category: newCategory,
      time: newTime,
      completed: false,
      priority: newPriority,
      starred: false,
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  const velocityPercent = Math.round((completedTasks.length / (tasks.length || 1)) * 100);

  return (
    <div className="flex flex-col w-full pb-28 pt-20 px-4 max-w-md mx-auto select-none">
      {/* Date Selector & Subhead Strip */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg text-on-surface">Tasks &amp; Milestones</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] uppercase tracking-wider font-bold">
              Q2 Horizon
            </span>
          </div>
          <button
            type="button"
            aria-label="Calendar view"
            onClick={() => setShowCalendarModal(true)}
            className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors border border-white/5 active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          </button>
        </div>

        {/* Horizontal Scrollable Date Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {days.map((day) => {
            const isSelected = selectedDay === day.num;
            return (
              <button
                key={day.num}
                type="button"
                onClick={() => setSelectedDay(day.num)}
                className={`flex flex-col items-center justify-center min-w-[54px] h-[68px] rounded-2xl transition-all active:scale-95 ${
                  isSelected
                    ? 'min-w-[58px] h-[72px] bg-gradient-to-b from-primary-fixed to-primary-container text-on-primary-fixed shadow-[0_8px_20px_-4px_rgba(229,184,105,0.4)] relative font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-white/5'
                }`}
              >
                <span
                  className={`text-[10px] tracking-wider uppercase ${
                    isSelected ? 'text-on-primary-fixed-variant' : 'opacity-70'
                  }`}
                >
                  {day.label}
                </span>
                <span className="text-base mt-0.5 font-bold leading-tight">{day.num}</span>
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-on-primary-fixed mt-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Card: Velocity & Progress Metric */}
      <div className="w-full bg-surface-container-high rounded-3xl p-4 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.6)] mb-4 relative overflow-hidden border border-white/5">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                Executive Flow
              </span>
              <span className="text-sm text-on-surface font-semibold tracking-tight">
                Today's Velocity
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-syne text-xl font-bold text-primary tabular-nums">
              {velocityPercent}%
            </span>
            <span className="text-[11px] text-on-surface-variant block">
              {completedTasks.length} of {tasks.length} completed
            </span>
          </div>
        </div>

        {/* Gold Gradient Linear Bar */}
        <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden p-0.5 mt-2">
          <div
            className="h-full bg-gradient-to-r from-primary-fixed-dim via-primary-container to-primary rounded-full shadow-[0_0_12px_rgba(229,184,105,0.6)] transition-all duration-700"
            style={{ width: `${velocityPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2.5 text-on-surface-variant text-xs">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span>{uncompletedTasks.length} High Leverage Remaining</span>
          </span>
          <span className="text-primary font-medium">Estimated Pace: On Track</span>
        </div>
      </div>

      {/* Filter Chips Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4 -mx-4 px-4">
        {(['All', 'Executive', 'Personal', 'Ventures', 'Completed'] as TaskCategory[]).map((cat) => {
          const isActive = selectedFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all active:scale-95 ${
                isActive
                  ? 'bg-surface-container-highest text-primary shadow-sm border border-primary/30'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-white/5'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-primary/20 text-primary' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {categoryCounts[cat]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Priority Task Stack */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
            Focus Stream
          </span>
          <span className="text-xs text-secondary flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[14px]">tune</span> Prioritized by Impact
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-surface-container-low border border-white/5">
            <span className="material-symbols-outlined text-outline text-3xl mb-1">done_all</span>
            <p className="text-sm font-semibold text-on-surface">No pending tasks in this category</p>
            <p className="text-xs text-on-surface-variant mt-1">Tap + Add Task to create a new milestone</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="group relative w-full bg-surface-container-low rounded-2xl p-4 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-surface-container border border-white/5"
            >
              {task.priority === 'High' && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-primary to-primary-container rounded-r-full" />
              )}

              <div className="flex items-start gap-3 pl-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTask(task.id);
                  }}
                  aria-label="Mark task done"
                  className="mt-0.5 w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container transition-all hover:scale-105 active:scale-90 shadow-inner border border-white/10"
                >
                  <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-70 transition-opacity">
                    check
                  </span>
                </button>

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => setSelectedTaskDetail(task)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-on-surface tracking-tight leading-snug line-clamp-2">
                      {task.title}
                    </h3>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(task.id);
                      }}
                      aria-label="Star task"
                      className={`shrink-0 transition-transform hover:scale-110 active:scale-90 ${
                        task.starred ? 'text-primary' : 'text-on-surface-variant/50 hover:text-primary'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={task.starred ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        star
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                        task.category === 'Ventures'
                          ? 'bg-primary-container/20 text-primary'
                          : task.category === 'Personal'
                          ? 'bg-tertiary-container/20 text-tertiary-fixed'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}
                    >
                      {task.category}
                    </span>

                    <span className="flex items-center gap-1 text-on-surface-variant text-[11px]">
                      <span className="material-symbols-outlined text-[13px]">schedule</span> {task.time}
                    </span>

                    {task.subtasksTotal && (
                      <span className="flex items-center gap-1 text-secondary font-medium text-[11px]">
                        <span className="material-symbols-outlined text-[13px]">checklist</span>{' '}
                        {task.subtasksDone}/{task.subtasksTotal} done
                      </span>
                    )}

                    {task.attachments && (
                      <span className="flex items-center gap-1 text-on-surface-variant text-[11px]">
                        <span className="material-symbols-outlined text-[13px]">description</span>{' '}
                        {task.attachments} Attachments
                      </span>
                    )}

                    {task.tagDetail && (
                      <span className="text-on-surface-variant text-[11px] truncate">
                        {task.tagDetail}
                      </span>
                    )}
                  </div>

                  {task.subtasksTotal && (
                    <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-2.5 overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full"
                        style={{
                          width: `${((task.subtasksDone || 0) / task.subtasksTotal) * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Collapsible Section: Completed Today */}
      <div className="w-full mb-6">
        <button
          type="button"
          aria-expanded={isCompletedOpen}
          onClick={() => setIsCompletedOpen(!isCompletedOpen)}
          className="w-full flex items-center justify-between py-2 px-1 text-on-surface-variant hover:text-on-surface transition-colors active:scale-98"
        >
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[18px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              task_alt
            </span>
            <span className="text-sm text-on-surface font-semibold tracking-tight">
              Completed Today
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold">
              {completedTasks.length}
            </span>
          </div>
          <span
            className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
              isCompletedOpen ? '' : 'rotate-180'
            }`}
          >
            expand_less
          </span>
        </button>

        {isCompletedOpen && (
          <div className="flex flex-col gap-2 mt-2">
            {completedTasks.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest/60 border border-white/5 opacity-70 hover:opacity-100 transition-opacity"
              >
                <button
                  type="button"
                  onClick={() => onToggleTask(item.id)}
                  aria-label="Reopen task"
                  className="w-5 h-5 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0 shadow-sm active:scale-90"
                >
                  <span className="material-symbols-outlined text-[13px] font-bold">check</span>
                </button>
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => setSelectedTaskDetail(item)}
                >
                  <p className="text-xs text-on-surface-variant line-through truncate font-medium">
                    {item.title}
                  </p>
                  <span className="text-[10px] text-outline">
                    Completed at {item.completedTime || item.time} · {item.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onDeleteTask) onDeleteTask(item.id);
                  }}
                  title="Archive milestone"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">archive</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button (+ Add Task) pinned at bottom right */}
      <div className="fixed right-5 bottom-24 z-30">
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 pl-4 pr-5 h-13 rounded-full bg-gradient-to-tr from-primary-fixed via-primary-container to-primary text-on-primary-fixed text-xs font-bold shadow-[0_12px_28px_-4px_rgba(229,184,105,0.55),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          <div className="w-7 h-7 rounded-full bg-on-primary-fixed/15 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
            <span className="material-symbols-outlined text-[18px] font-bold">add</span>
          </div>
          <span className="tracking-tight uppercase">Add Task</span>
        </button>
      </div>

      {/* Calendar View Sheet Modal */}
      <CalendarSheetModal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      />

      {/* Task Detail Modal */}
      {selectedTaskDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-surface-container-low rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <span className="text-[10px] uppercase font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                {selectedTaskDetail.category}
              </span>
              <div className="flex items-center gap-1">
                {onEditTask && !isEditingTask && (
                  <button
                    type="button"
                    onClick={() => setIsEditingTask(true)}
                    className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-all"
                    title="Edit Task"
                  >
                    <span className="material-symbols-outlined text-[15px]">edit</span>
                  </button>
                )}
                {onDeleteTask && (
                  <button
                    type="button"
                    onClick={() => {
                      onDeleteTask(selectedTaskDetail.id);
                      setSelectedTaskDetail(null);
                      showExecutiveToast('Milestone removed from horizon.', 'error');
                    }}
                    className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-error active:scale-90 transition-all"
                    title="Delete Task"
                  >
                    <span className="material-symbols-outlined text-[15px]">delete</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedTaskDetail(null)}
                  className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            </div>

            {!isEditingTask ? (
              <>
                <h3 className="text-sm font-bold text-on-surface leading-snug">
                  {selectedTaskDetail.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>Scheduled: {selectedTaskDetail.time}</span>
                  {selectedTaskDetail.priority && (
                    <span className="ml-auto text-[10px] text-primary font-bold">
                      {selectedTaskDetail.priority} Priority
                    </span>
                  )}
                </div>

                {selectedTaskDetail.subtasksTotal && (
                  <div className="p-3 rounded-xl bg-surface-container space-y-1.5 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span>Subtasks</span>
                      <span className="text-secondary">
                        {selectedTaskDetail.subtasksDone} / {selectedTaskDetail.subtasksTotal}
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full"
                        style={{
                          width: `${((selectedTaskDetail.subtasksDone || 0) / selectedTaskDetail.subtasksTotal) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onToggleTask(selectedTaskDetail.id);
                      setSelectedTaskDetail(null);
                    }}
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all ${
                      selectedTaskDetail.completed
                        ? 'bg-surface-container-high text-on-surface'
                        : 'bg-primary text-on-primary shadow-md'
                    }`}
                  >
                    {selectedTaskDetail.completed ? 'Reopen Task' : 'Mark Complete'}
                  </button>
                </div>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!editTaskTitle.trim()) return;
                  if (onEditTask) {
                    onEditTask(selectedTaskDetail.id, {
                      title: editTaskTitle.trim(),
                      time: editTaskTime.trim() || 'Scheduled',
                      category: editTaskCategory,
                      priority: editTaskPriority,
                    });
                  }
                  setIsEditingTask(false);
                  setSelectedTaskDetail((prev) =>
                    prev
                      ? {
                          ...prev,
                          title: editTaskTitle.trim(),
                          time: editTaskTime.trim() || 'Scheduled',
                          category: editTaskCategory,
                          priority: editTaskPriority,
                        }
                      : null
                  );
                  showExecutiveToast('Task updated successfully.', 'success');
                }}
                className="space-y-3"
              >
                <div>
                  <label className="text-[10px] text-on-surface-variant font-semibold block mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    className="w-full h-10 px-3 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/5 focus:border-primary/40"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-on-surface-variant font-semibold block mb-1">
                      Time
                    </label>
                    <input
                      type="text"
                      value={editTaskTime}
                      onChange={(e) => setEditTaskTime(e.target.value)}
                      className="w-full h-9 px-2.5 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-on-surface-variant font-semibold block mb-1">
                      Category
                    </label>
                    <select
                      value={editTaskCategory}
                      onChange={(e) => setEditTaskCategory(e.target.value as any)}
                      className="w-full h-9 px-2 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/5"
                    >
                      <option value="Executive">Executive</option>
                      <option value="Ventures">Ventures</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-on-surface-variant font-semibold block mb-1">
                    Priority
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['High', 'Medium', 'Low'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setEditTaskPriority(p)}
                        className={`h-7 rounded-lg text-[10px] font-bold transition-all ${
                          editTaskPriority === p
                            ? 'bg-primary-container text-on-primary-container'
                            : 'bg-surface text-on-surface-variant border border-white/5'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingTask(false)}
                    className="px-3 py-1.5 text-xs text-on-surface-variant hover:text-on-surface"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="w-full max-w-md bg-surface-container-low rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-surface-container-highest flex flex-col gap-4 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <h3 className="font-semibold text-base text-on-surface">New Executive Milestone</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5">
              <div>
                <label className="text-xs text-on-surface-variant font-semibold block mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sovereign Wealth Termsheet Sign-off"
                  className="w-full h-11 px-3.5 bg-surface text-on-surface rounded-xl text-sm outline-none border border-white/5 focus:border-primary/40"
                  required
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-on-surface-variant font-semibold block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full h-11 px-3 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/5 focus:border-primary/40"
                  >
                    <option value="Executive">Executive</option>
                    <option value="Ventures">Ventures</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-on-surface-variant font-semibold block mb-1">
                    Scheduled Time
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="11:00 AM"
                    className="w-full h-11 px-3 bg-surface text-on-surface rounded-xl text-xs outline-none border border-white/5 focus:border-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-on-surface-variant font-semibold block mb-1">
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['High', 'Medium', 'Low'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNewPriority(p)}
                      className={`h-9 rounded-xl text-xs font-semibold transition-all ${
                        newPriority === p
                          ? 'bg-primary-container text-on-primary-container shadow-sm'
                          : 'bg-surface text-on-surface-variant hover:text-on-surface border border-white/5'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-full text-xs text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
