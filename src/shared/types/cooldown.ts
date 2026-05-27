export type CooldownActionType =
  | "shopping"
  | "subscription"
  | "email"
  | "social_message"
  | "application"
  | "account_deletion"
  | "refund_or_cancel"
  | "custom";

export type CooldownRule = {
  id: string;
  name: string;
  enabled: boolean;
  domainPattern: string;
  pathKeywords?: string[];
  actionType: CooldownActionType;
  cooldownMinutes: number;
  activeTimeWindow?: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string;   // HH:mm format
    timezone?: string;
  };
  prompt: string;
  allowEmergencySkip: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DecisionHistoryItem = {
  id: string;
  ruleId: string;
  domain: string;
  actionType: CooldownActionType;
  startedAt: string;
  completedAt?: string;
  outcome: "continued" | "stopped" | "decided_later" | "skipped";
  reflectionNote?: string;
};

export type UserSettings = {
  theme: "light" | "dark" | "system";
  defaultCooldownMinutes: number;
  storeReflectionNotes: boolean;
  showGentlePrompts: boolean;
  enableEmergencySkip: boolean;
  weeklyReviewEnabled: boolean;
};
