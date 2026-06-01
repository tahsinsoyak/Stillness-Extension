import { useEffect, useState } from 'react';
import { useRulesStore } from '../shared/store/useRulesStore';
import { useSettingsStore } from '../shared/store/useSettingsStore';
import { storage } from '../shared/lib/storage';
import { DecisionHistoryItem, CooldownRule } from '../shared/types/cooldown';
import { Button } from '../shared/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/components/Card';
import { Switch } from '../shared/components/Switch';
import { Input } from '../shared/components/Input';
import { Badge } from '../shared/components/Badge';
import { ACTION_TYPES, DEFAULT_PROMPTS } from '../shared/constants/defaultPrompts';
import { cn } from '../shared/lib/utils';
import { Plus, Trash2, History, Settings, Shield, Clock, Check, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { Logo } from '../shared/components/Logo';

export const OptionsApp = () => {
  const { rules, loadRules, deleteRule, toggleRule, addRule } = useRulesStore();
  const { settings, loadSettings, updateSettings } = useSettingsStore();
  const [history, setHistory] = useState<DecisionHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'rules' | 'history' | 'settings'>('rules');

  const [isAdding, setIsAdding] = useState(false);
  const [newRule, setNewRule] = useState<Partial<CooldownRule>>({
    enabled: true,
    cooldownMinutes: 10,
    actionType: 'shopping',
    allowEmergencySkip: false,
    prompt: DEFAULT_PROMPTS['shopping']
  });

  useEffect(() => {
    loadRules();
    loadSettings();
    storage.getHistory().then(setHistory);
  }, []);

  const handleAddRule = async () => {
    if (!newRule.domainPattern) return;

    await addRule({
      ...newRule,
      id: crypto.randomUUID(),
      name: newRule.name || newRule.domainPattern,
      domainPattern: newRule.domainPattern,
      actionType: newRule.actionType as any,
      cooldownMinutes: newRule.cooldownMinutes || 10,
      prompt: newRule.prompt || DEFAULT_PROMPTS[newRule.actionType || 'custom'] || '',
      enabled: true,
      allowEmergencySkip: newRule.allowEmergencySkip || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as CooldownRule);

    setIsAdding(false);
    setNewRule({ enabled: true, cooldownMinutes: 10, actionType: 'shopping', prompt: DEFAULT_PROMPTS['shopping'] });
  };

  const tabs = [
    { id: 'rules' as const, label: 'Rules', icon: Shield },
    { id: 'history' as const, label: 'History', icon: History },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-light-base dark:bg-dark-base text-light-text dark:text-dark-text pb-16 animate-fade-in relative overflow-hidden">
      {/* Decorative gradient glow for a premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.06)_0%,rgba(99,102,241,0.02)_50%,transparent_100%)] pointer-events-none -z-10" />
      <div className="max-w-[720px] mx-auto px-6 pt-12 relative z-10">

        <div className="flex items-center gap-3 mb-2">
          <Logo size={36} />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Stillness <span className="text-[14px] text-light-text-tertiary dark:text-dark-text-tertiary font-normal">Extension</span></h1>
            <p className="text-[13px] text-light-text-secondary dark:text-dark-text-secondary">Mindful digital decisions.</p>
          </div>
        </div>

        <div className="flex p-1 mt-8 mb-8 rounded-container border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-medium rounded-component transition-colors duration-150",
                activeTab === tab.id
                  ? "bg-accent text-white"
                  : "text-light-text-tertiary dark:text-dark-text-tertiary hover:text-light-text-secondary dark:hover:text-dark-text-secondary"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'rules' && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Your Rules</h2>
                <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-0.5">
                  {rules.length} rule{rules.length !== 1 ? 's' : ''} configured
                </p>
              </div>
              <Button size="sm" onClick={() => setIsAdding(!isAdding)}>
                <Plus className="w-3.5 h-3.5" />
                Add Rule
              </Button>
            </div>

            {isAdding && (
              <Card className="animate-scale-in border-accent/30">
                <CardHeader>
                  <CardTitle>New Rule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-light-text-secondary dark:text-dark-text-secondary">Domain</label>
                      <Input
                        placeholder="e.g. amazon.com"
                        value={newRule.domainPattern || ''}
                        onChange={(e) => setNewRule({ ...newRule, domainPattern: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-light-text-secondary dark:text-dark-text-secondary">Action Type</label>
                      <select
                        className="flex h-9 w-full rounded-component border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-ring dark:[color-scheme:dark]"
                        value={newRule.actionType}
                        onChange={(e) => {
                          const type = e.target.value as any;
                          setNewRule({ ...newRule, actionType: type, prompt: DEFAULT_PROMPTS[type] || '' });
                        }}
                      >
                        {ACTION_TYPES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-light-text-secondary dark:text-dark-text-secondary">Duration (min)</label>
                      <Input
                        type="number"
                        min={1}
                        max={60}
                        value={newRule.cooldownMinutes || 10}
                        onChange={(e) => setNewRule({ ...newRule, cooldownMinutes: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium text-light-text-secondary dark:text-dark-text-secondary">Prompt</label>
                      <Input
                        placeholder="Why do I want this?"
                        value={newRule.prompt || ''}
                        onChange={(e) => setNewRule({ ...newRule, prompt: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
                    <Button size="sm" onClick={handleAddRule} disabled={!newRule.domainPattern}>Save</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {rules.length === 0 && !isAdding ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-card bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-light-text-tertiary dark:text-dark-text-tertiary" />
                </div>
                <p className="text-[13px] font-medium">No rules configured</p>
                <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-1">Add a rule to get started.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {rules.map(rule => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between rounded-card border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface px-5 py-4"
                  >
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-9 h-9 rounded-component bg-accent-muted flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-accent" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[14px] font-medium truncate">{rule.domainPattern}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary">
                            {ACTION_TYPES.find(a => a.id === rule.actionType)?.label} · {rule.cooldownMinutes} min
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRule(rule.id)}
                        className="text-light-text-tertiary hover:text-danger dark:text-dark-text-tertiary dark:hover:text-danger"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-base font-semibold">Decision History</h2>
              <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-0.5">
                {history.length} entr{history.length !== 1 ? 'ies' : 'y'} recorded
              </p>
            </div>

            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-card bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border flex items-center justify-center mb-3">
                  <History className="w-5 h-5 text-light-text-tertiary dark:text-dark-text-tertiary" />
                </div>
                <p className="text-[13px] font-medium">No history yet</p>
                <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-1">Your decisions will appear here.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {history.map(item => (
                  <div
                    key={item.id}
                    className="rounded-card border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface px-5 py-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-component flex items-center justify-center shrink-0",
                          item.outcome === 'stopped' || item.outcome === 'decided_later'
                            ? "bg-success-muted"
                            : "bg-light-subtle dark:bg-dark-subtle"
                        )}>
                          {item.outcome === 'stopped' || item.outcome === 'decided_later'
                            ? <Check className="w-4 h-4 text-success" />
                            : <Clock className="w-4 h-4 text-light-text-tertiary dark:text-dark-text-tertiary" />
                          }
                        </div>
                        <div>
                          <p className="text-[13px] font-medium">{item.domain}</p>
                          <p className="text-[11px] text-light-text-tertiary dark:text-dark-text-tertiary mt-0.5">
                            {format(new Date(item.startedAt), 'MMM d, yyyy · h:mm a')}
                          </p>
                        </div>
                      </div>
                      <Badge variant={item.outcome === 'stopped' || item.outcome === 'decided_later' ? 'success' : 'secondary'}>
                        {item.outcome.replace('_', ' ')}
                      </Badge>
                    </div>
                    {item.reflectionNote && settings.storeReflectionNotes && (
                      <div className="mt-3 ml-11 text-[13px] text-light-text-secondary dark:text-dark-text-secondary italic bg-light-elevated dark:bg-dark-elevated p-3 rounded-component">
                        "{item.reflectionNote}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex flex-col gap-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  Timer Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-medium">Default Pause Duration</p>
                      <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-0.5">
                        Duration for manual instant pauses.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={120}
                        className="w-16 text-center text-[13px] h-8"
                        value={settings.defaultCooldownMinutes}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val > 0) updateSettings({ defaultCooldownMinutes: val });
                        }}
                      />
                      <span className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary font-medium">min</span>
                    </div>
                  </div>
                  {/* Preset buttons */}
                  <div className="flex gap-2 mt-1">
                    {[5, 10, 15, 30, 45, 60].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => updateSettings({ defaultCooldownMinutes: mins })}
                        className={cn(
                          "px-2.5 py-1 text-[11px] font-medium rounded-pill border transition-all duration-150",
                          settings.defaultCooldownMinutes === mins
                            ? "bg-accent/10 border-accent text-accent"
                            : "border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-elevated dark:hover:bg-dark-elevated"
                        )}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent animate-pulse" />
                  Support Stillness
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[13px] text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  Stillness is 100% free, private, and open-source. If this extension has helped you make better, more mindful decisions, please consider supporting its development!
                </p>
                <a
                  href="https://patreon.com/tahsinsoyak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-component bg-accent hover:bg-accent-hover text-white text-[13px] font-semibold transition-all duration-150 shadow-sm"
                >
                  <Heart className="w-4 h-4" fill="currentColor" />
                  Support on Patreon ❤️
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-medium">Store reflection notes</p>
                    <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-0.5">Saved locally only.</p>
                  </div>
                  <Switch
                    checked={settings.storeReflectionNotes}
                    onCheckedChange={(c) => updateSettings({ storeReflectionNotes: c })}
                  />
                </div>
                <div className="border-t border-light-border dark:border-dark-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-warning">Clear all data</p>
                    <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-0.5">Delete all rules and history.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      if (confirm("Are you sure? This cannot be undone.")) {
                        await chrome.storage.local.clear();
                        window.location.reload();
                      }
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-accent" />
                  Behavior
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-medium">Theme</p>
                    <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-0.5">Color scheme.</p>
                  </div>
                  <select
                    className="flex h-8 w-28 rounded-component border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface px-2.5 py-1 text-[13px] focus:outline-none focus:ring-2 focus:ring-accent-ring dark:[color-scheme:dark]"
                    value={settings.theme}
                    onChange={(e) => updateSettings({ theme: e.target.value as any })}
                  >
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="border-t border-light-border dark:border-dark-border" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-medium">Emergency skip</p>
                    <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-0.5">Allow bypassing timer.</p>
                  </div>
                  <Switch
                    checked={settings.enableEmergencySkip}
                    onCheckedChange={(c) => updateSettings({ enableEmergencySkip: c })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary px-1 mt-1">
              <span>All preferences are saved automatically in real-time.</span>
              <span className="flex items-center gap-1.5 text-accent font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Auto-saved
              </span>
            </div>

            <p className="text-center text-[11px] text-light-text-tertiary/60 dark:text-dark-text-tertiary/50 pt-4 tracking-wide">
              LOCAL ONLY · YOUR DATA STAYS IN THIS BROWSER
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
