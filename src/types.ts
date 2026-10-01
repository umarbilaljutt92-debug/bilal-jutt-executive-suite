export type ScreenType =
  | 'splash'
  | 'onboarding'
  | 'signin'
  | 'signup'
  | 'home'
  | 'tasks'
  | 'notes'
  | 'alerts'
  | 'profile'
  | 'settings'
  | 'search'
  | 'edit_profile'
  | 'help'
  | 'concierge_chat';

export type TaskCategory = 'All' | 'Executive' | 'Ventures' | 'Personal' | 'Completed';

export interface Task {
  id: string;
  title: string;
  category: 'Executive' | 'Ventures' | 'Personal';
  time: string;
  completed: boolean;
  completedTime?: string;
  starred?: boolean;
  subtasksDone?: number;
  subtasksTotal?: number;
  attachments?: number;
  tagDetail?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

export type NoteCategory = 'all' | 'strategic' | 'ventures' | 'personal' | 'ideas';

export interface Note {
  id: string;
  title: string;
  category: 'strategic' | 'ventures' | 'personal' | 'ideas';
  body: string;
  timestamp: string;
  readTime: string;
  isPriority?: boolean;
  isStarred?: boolean;
  isBookmarked?: boolean;
  isLiked?: boolean;
  blueprints?: number;
  itemsCount?: number;
  image?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  category: 'system' | 'vip';
  time: string;
  unread: boolean;
  period: 'today' | 'earlier';
  tag?: string;
  tagDetail?: string;
  avatars?: string[];
  extraAvatarsCount?: number;
  actionText?: string;
  documentPath?: string;
  progressPercent?: number;
  growthMetric?: string;
}

export interface UserProfile {
  fullName: string;
  executiveTitle: string;
  bio: string;
  corporateEmail: string;
  phone: string;
  dialCode: string;
  location: string;
  membershipLevel: string;
  publicVerification: boolean;
  timezones: string;
  focusIndex: number;
  tasksDoneCount: number;
  execNotesCount: number;
  avatarUrl: string;
}

export interface UserSettings {
  notificationsEnabled: boolean;
  biometricsEnabled: boolean;
  selectedLanguage: string;
}

