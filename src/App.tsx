import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TasksScreen } from './screens/TasksScreen';
import { NotesScreen } from './screens/NotesScreen';
import { AlertsScreen } from './screens/AlertsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { SearchScreen } from './screens/SearchScreen';
import { EditProfileScreen } from './screens/EditProfileScreen';
import { HelpScreen } from './screens/HelpScreen';
import { ConciergeChatModal } from './screens/ConciergeChatModal';
import {
  INITIAL_PROFILE,
  INITIAL_TASKS,
  INITIAL_NOTES,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS,
} from './data/initialData';
import {
  ScreenType,
  Task,
  Note,
  UserProfile,
  UserSettings,
  NotificationItem,
} from './types';
import { subscribeToast } from './utils/toast';
import {
  getStoredItem,
  setStoredItem,
  STORAGE_KEYS,
} from './utils/storage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>([]);

  // Persistent States initialized from browser localStorage with safe fallbacks
  const [profile, setProfile] = useState<UserProfile>(() =>
    getStoredItem<UserProfile>(STORAGE_KEYS.PROFILE, INITIAL_PROFILE)
  );
  const [tasks, setTasks] = useState<Task[]>(() =>
    getStoredItem<Task[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS)
  );
  const [notes, setNotes] = useState<Note[]>(() =>
    getStoredItem<Note[]>(STORAGE_KEYS.NOTES, INITIAL_NOTES)
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    getStoredItem<NotificationItem[]>(STORAGE_KEYS.ALERTS, INITIAL_NOTIFICATIONS)
  );
  const [settings, setSettings] = useState<UserSettings>(() =>
    getStoredItem<UserSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  // Sync states to localStorage whenever they change
  useEffect(() => {
    setStoredItem(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.NOTES, notes);
  }, [notes]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.ALERTS, notifications);
  }, [notifications]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  // Subscribe to global executive toasts
  useEffect(() => {
    const unsubscribe = subscribeToast((message, type = 'gold') => {
      setToast({ message, type });
      const timer = setTimeout(() => {
        setToast((curr) => (curr?.message === message ? null : curr));
      }, 3000);
      return () => clearTimeout(timer);
    });
    return unsubscribe;
  }, []);

  // Enhanced Navigation with history tracking
  const navigateTo = (targetScreen: ScreenType) => {
    if (targetScreen === currentScreen) return;
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(targetScreen);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prevScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory((prev) => prev.slice(0, prev.length - 1));
      setCurrentScreen(prevScreen);
    } else {
      // Graceful contextual fallback
      if (currentScreen === 'edit_profile' || currentScreen === 'settings') {
        setCurrentScreen('profile');
      } else if (currentScreen === 'help') {
        setCurrentScreen('settings');
      } else if (currentScreen === 'signin' || currentScreen === 'signup') {
        setCurrentScreen('onboarding');
      } else {
        setCurrentScreen('home');
      }
    }
  };

  // --- Task Handlers (Add, Edit, Delete, Toggle Complete, Toggle Star) ---
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            completedTime: nextCompleted ? 'Just now' : undefined,
          };
        }
        return t;
      })
    );

    // Keep profile tasksDoneCount in sync
    setProfile((prev) => {
      const targetTask = tasks.find((t) => t.id === taskId);
      const isCurrentlyCompleted = targetTask?.completed ?? false;
      const nextDoneCount = isCurrentlyCompleted
        ? Math.max(0, prev.tasksDoneCount - 1)
        : prev.tasksDoneCount + 1;
      return { ...prev, tasksDoneCount: nextDoneCount };
    });
  };

  const handleToggleStar = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, starred: !t.starred } : t))
    );
  };

  const handleAddTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleEditTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (targetTask?.completed) {
      setProfile((prev) => ({
        ...prev,
        tasksDoneCount: Math.max(0, prev.tasksDoneCount - 1),
      }));
    }
  };

  // --- Note Handlers (Add, Edit, Delete, Star, Bookmark, Like) ---
  const handleAddNote = (newNoteData: Omit<Note, 'id'>) => {
    const newNote: Note = {
      ...newNoteData,
      id: `note-${Date.now()}`,
    };
    setNotes((prev) => [newNote, ...prev]);
    setProfile((prev) => ({
      ...prev,
      execNotesCount: prev.execNotesCount + 1,
    }));
  };

  const handleUpdateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, ...updates } : n))
    );
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    setProfile((prev) => ({
      ...prev,
      execNotesCount: Math.max(0, prev.execNotesCount - 1),
    }));
  };

  const handleToggleNoteStar = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isStarred: !n.isStarred } : n))
    );
  };

  const handleToggleNoteBookmark = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isBookmarked: !n.isBookmarked } : n))
    );
  };

  const handleToggleNoteLike = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isLiked: !n.isLiked } : n))
    );
  };

  // --- Notification / Alerts Handlers (Mark All Read, Mark Single Read, Dismiss/Delete) ---
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // --- Settings Handlers ---
  const handleUpdateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  // --- Profile Handlers ---
  const handleSaveProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const unreadAlertsCount = notifications.filter((n) => n.unread).length;

  // Determine which screens show the standard Top App Bar and Bottom Navigation
  const isAuthOrSplash =
    currentScreen === 'splash' ||
    currentScreen === 'onboarding' ||
    currentScreen === 'signin' ||
    currentScreen === 'signup';

  const isSubScreen =
    currentScreen === 'settings' ||
    currentScreen === 'search' ||
    currentScreen === 'edit_profile' ||
    currentScreen === 'help';

  const getScreenTitle = (): { title: string; subtitle: string } => {
    switch (currentScreen) {
      case 'home':
        return { title: 'Home', subtitle: 'Executive Suite' };
      case 'tasks':
        return { title: 'Tasks', subtitle: 'Executive Suite' };
      case 'notes':
        return { title: 'Notes', subtitle: 'Executive Suite' };
      case 'alerts':
        return { title: 'Notifications', subtitle: 'Executive Suite' };
      case 'profile':
        return { title: 'Profile', subtitle: 'Executive Suite' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Executive Suite' };
      case 'search':
        return { title: 'Search', subtitle: 'Executive Suite' };
      case 'edit_profile':
        return { title: 'Edit Profile', subtitle: 'Executive Suite' };
      case 'help':
        return { title: 'Help & Concierge', subtitle: 'Executive Suite' };
      default:
        return { title: 'Executive Suite', subtitle: 'Bilal Jutt' };
    }
  };

  const { title: currentTitle, subtitle: currentSubtitle } = getScreenTitle();

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col relative font-sans selection:bg-primary-container selection:text-on-primary-container">
      {/* Quick Screen Switcher (floating pill at top center) */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={(screen) => navigateTo(screen)}
      />

      {/* Global Executive Toast Notification Banner */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[110] max-w-sm w-[90%] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-surface-container-highest/95 backdrop-blur-xl border border-primary/30 text-on-surface shadow-2xl shadow-black/70 pointer-events-auto">
            <span
              className={`material-symbols-outlined text-[18px] shrink-0 ${
                toast.type === 'error'
                  ? 'text-error'
                  : toast.type === 'success'
                  ? 'text-secondary'
                  : 'text-primary'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {toast.type === 'error'
                ? 'error'
                : toast.type === 'success'
                ? 'check_circle'
                : 'verified'}
            </span>
            <span className="text-xs font-semibold leading-snug flex-1">
              {toast.message}
            </span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-on-surface-variant hover:text-on-surface ml-1 p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Header (shown on non-auth screens) */}
      {!isAuthOrSplash && (
        <Header
          currentScreen={currentScreen}
          title={currentTitle}
          subtitle={currentSubtitle}
          onNavigate={(screen) => navigateTo(screen)}
          showBack={isSubScreen}
          onBack={goBack}
        />
      )}

      {/* Screen Render Switch */}
      <main className="flex-1 flex flex-col w-full relative">
        {currentScreen === 'splash' && (
          <SplashScreen onProceed={(target) => navigateTo(target || 'onboarding')} />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingScreen onNavigate={(screen) => navigateTo(screen)} />
        )}

        {currentScreen === 'signin' && (
          <SignInScreen
            onNavigate={(screen) => navigateTo(screen)}
            onSuccessLogin={() => navigateTo('home')}
          />
        )}

        {currentScreen === 'signup' && (
          <SignUpScreen
            onNavigate={(screen) => navigateTo(screen)}
            onSuccessSignUp={() => navigateTo('home')}
          />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            tasks={tasks}
            profile={profile}
            onToggleTask={handleToggleTask}
            onNavigate={(screen) => navigateTo(screen)}
            onOpenNewTaskModal={() => navigateTo('tasks')}
            onOpenNewNoteModal={() => {
              navigateTo('notes');
              setIsNewNoteModalOpen(true);
            }}
          />
        )}

        {currentScreen === 'tasks' && (
          <TasksScreen
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onToggleStar={handleToggleStar}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        )}

        {currentScreen === 'notes' && (
          <NotesScreen
            notes={notes}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
            onToggleStar={handleToggleNoteStar}
            onToggleBookmark={handleToggleNoteBookmark}
            onToggleLike={handleToggleNoteLike}
            isNewNoteModalOpen={isNewNoteModalOpen}
            onCloseNewNoteModal={() => setIsNewNoteModalOpen(false)}
          />
        )}

        {currentScreen === 'alerts' && (
          <AlertsScreen
            notifications={notifications}
            onMarkAllAsRead={handleMarkAllNotificationsRead}
            onMarkItemRead={handleMarkNotificationRead}
            onDismissNotification={handleDismissNotification}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            profile={profile}
            onNavigate={(screen) => navigateTo(screen)}
            onSignOut={() => navigateTo('signin')}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            profile={profile}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onNavigate={(screen) => navigateTo(screen)}
            onSignOut={() => navigateTo('signin')}
          />
        )}

        {currentScreen === 'search' && (
          <SearchScreen
            onNavigate={(screen) => navigateTo(screen)}
            onBack={goBack}
          />
        )}

        {currentScreen === 'edit_profile' && (
          <EditProfileScreen
            profile={profile}
            onSave={handleSaveProfile}
            onBack={goBack}
          />
        )}

        {currentScreen === 'help' && (
          <HelpScreen
            onNavigate={(screen) => navigateTo(screen)}
            onOpenLiveChat={() => setIsChatModalOpen(true)}
            onBack={goBack}
          />
        )}

        {currentScreen === 'concierge_chat' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <ConciergeChatModal
              isOpen={true}
              onClose={goBack}
            />
          </div>
        )}
      </main>

      {/* Persistent Bottom Navigation Dock (shown on primary dashboard screens) */}
      {!isAuthOrSplash && !isSubScreen && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => navigateTo(screen)}
          unreadCount={unreadAlertsCount}
        />
      )}

      {/* Live Concierge Chat Drawer Modal */}
      <ConciergeChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </div>
  );
}
