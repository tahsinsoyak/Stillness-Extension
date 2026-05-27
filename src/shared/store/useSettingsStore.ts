import { create } from 'zustand';
import { UserSettings } from '../types/cooldown';
import { storage, defaultSettings } from '../lib/storage';

interface SettingsState {
  settings: UserSettings;
  isLoading: boolean;
  loadSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: defaultSettings,
  isLoading: true,
  loadSettings: async () => {
    const settings = await storage.getSettings();
    set({ settings, isLoading: false });
    
    // Apply theme
    if (settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  updateSettings: async (newSettings) => {
    const updated = { ...get().settings, ...newSettings };
    await storage.saveSettings(updated);
    set({ settings: updated });
    
    // Apply theme
    if (updated.theme === 'dark' || (updated.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
}));
