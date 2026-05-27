export const DEFAULT_PROMPTS: Record<string, string> = {
  shopping: "Will I still want this tomorrow? Is this planned, or is it an impulse?",
  subscription: "Do I understand the renewal and cancellation terms? Will I use this enough next month?",
  email: "Would I send this same message tomorrow morning? Could this be shorter, calmer, or clearer?",
  social_message: "Am I trying to respond, or react? Would waiting 10 minutes improve this message?",
  application: "Did I review the details carefully? Is this the version I want to submit?",
  account_deletion: "Do I understand what data or access I may lose? Is this reversible?",
  refund_or_cancel: "Is this the best action right now? Do I need more information?",
  custom: "Why do I want to do this right now?",
};

export const ACTION_TYPES = [
  { id: 'shopping', label: 'Shopping' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'email', label: 'Email' },
  { id: 'social_message', label: 'Social Message' },
  { id: 'application', label: 'Application' },
  { id: 'account_deletion', label: 'Account Deletion' },
  { id: 'refund_or_cancel', label: 'Refund/Cancel' },
  { id: 'custom', label: 'Custom' },
];
