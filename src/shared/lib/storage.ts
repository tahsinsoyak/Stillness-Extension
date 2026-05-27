import { CooldownRule, DecisionHistoryItem, UserSettings } from '../types/cooldown';

const STORAGE_KEYS = {
  RULES: 'cooldown_rules',
  HISTORY: 'cooldown_history',
  SETTINGS: 'cooldown_settings',
};

export const defaultSettings: UserSettings = {
  theme: 'system',
  defaultCooldownMinutes: 10,
  storeReflectionNotes: true,
  showGentlePrompts: true,
  enableEmergencySkip: false,
  weeklyReviewEnabled: false,
};

export const storage = {
  async getRules(): Promise<CooldownRule[]> {
    if (!chrome?.storage?.local) return [];
    const result = await chrome.storage.local.get(STORAGE_KEYS.RULES);
    const rules = result[STORAGE_KEYS.RULES];
    
    // Provide default rules on first install to demonstrate usage
    if (rules === undefined) {
      const defaultRules: CooldownRule[] = [
        {
          id: 'default-amazon',
          name: 'Amazon Shopping',
          enabled: true,
          domainPattern: 'amazon.com',
          actionType: 'shopping',
          cooldownMinutes: 10,
          prompt: 'Will I still want this tomorrow? Is this planned, or is it an impulse?',
          allowEmergencySkip: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'default-x',
          name: 'Twitter / X',
          enabled: true,
          domainPattern: 'x.com',
          actionType: 'social_message',
          cooldownMinutes: 5,
          prompt: 'Am I trying to respond, or react? Would waiting 5 minutes improve this message?',
          allowEmergencySkip: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
      await this.saveRules(defaultRules);
      return defaultRules;
    }
    
    return rules || [];
  },

  async saveRules(rules: CooldownRule[]): Promise<void> {
    if (!chrome?.storage?.local) return;
    await chrome.storage.local.set({ [STORAGE_KEYS.RULES]: rules });
  },

  async getHistory(): Promise<DecisionHistoryItem[]> {
    if (!chrome?.storage?.local) return [];
    const result = await chrome.storage.local.get(STORAGE_KEYS.HISTORY);
    return result[STORAGE_KEYS.HISTORY] || [];
  },

  async addHistoryItem(item: DecisionHistoryItem): Promise<void> {
    if (!chrome?.storage?.local) return;
    const history = await this.getHistory();
    await chrome.storage.local.set({ [STORAGE_KEYS.HISTORY]: [item, ...history] });
  },

  async getSettings(): Promise<UserSettings> {
    if (!chrome?.storage?.local) return defaultSettings;
    const result = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS);
    return { ...defaultSettings, ...(result[STORAGE_KEYS.SETTINGS] || {}) };
  },

  async saveSettings(settings: UserSettings): Promise<void> {
    if (!chrome?.storage?.local) return;
    await chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
  },
};
