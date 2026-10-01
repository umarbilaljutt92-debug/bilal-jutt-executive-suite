/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const STORAGE_KEYS = {
  TASKS: 'bilal_exec_tasks',
  NOTES: 'bilal_exec_notes',
  ALERTS: 'bilal_exec_alerts',
  SETTINGS: 'bilal_exec_settings',
  PROFILE: 'bilal_exec_profile',
  RECENT_SEARCHES: 'bilal_exec_recent_searches',
} as const;

export function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }
  try {
    const item = window.localStorage.getItem(key);
    if (item === null || item === undefined || item === '') {
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`[Executive Storage] Error reading key "${key}":`, error);
    return fallback;
  }
}

export function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[Executive Storage] Error saving key "${key}":`, error);
  }
}

export function removeStoredItem(key: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[Executive Storage] Error removing key "${key}":`, error);
  }
}
