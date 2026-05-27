import { create } from 'zustand';
import { CooldownRule } from '../types/cooldown';
import { storage } from '../lib/storage';

interface RulesState {
  rules: CooldownRule[];
  isLoading: boolean;
  loadRules: () => Promise<void>;
  addRule: (rule: CooldownRule) => Promise<void>;
  updateRule: (rule: CooldownRule) => Promise<void>;
  deleteRule: (id: string) => Promise<void>;
  toggleRule: (id: string) => Promise<void>;
}

export const useRulesStore = create<RulesState>((set, get) => ({
  rules: [],
  isLoading: true,
  loadRules: async () => {
    const rules = await storage.getRules();
    set({ rules, isLoading: false });
  },
  addRule: async (rule) => {
    const newRules = [...get().rules, rule];
    await storage.saveRules(newRules);
    set({ rules: newRules });
  },
  updateRule: async (updatedRule) => {
    const newRules = get().rules.map((r) => (r.id === updatedRule.id ? updatedRule : r));
    await storage.saveRules(newRules);
    set({ rules: newRules });
  },
  deleteRule: async (id) => {
    const newRules = get().rules.filter((r) => r.id !== id);
    await storage.saveRules(newRules);
    set({ rules: newRules });
  },
  toggleRule: async (id) => {
    const newRules = get().rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
    await storage.saveRules(newRules);
    set({ rules: newRules });
  },
}));
