import { useEffect, useState } from 'react';
import { useRulesStore } from '../shared/store/useRulesStore';
import { Button } from '../shared/components/Button';
import { Switch } from '../shared/components/Switch';
import { Badge } from '../shared/components/Badge';
import { Plus, Settings, Timer, Pause } from 'lucide-react';
import { ACTION_TYPES } from '../shared/constants/defaultPrompts';

export const PopupApp = () => {
  const { rules, loadRules, toggleRule } = useRulesStore();
  const [currentDomain, setCurrentDomain] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    loadRules();
    chrome.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url;
      if (url && !url.startsWith('chrome') && !url.startsWith('about')) {
        try {
          setCurrentUrl(url);
          setCurrentDomain(new URL(url).hostname);
        } catch (e) {}
      }
    });
  }, [loadRules]);

  const handleOptionsClick = () => chrome.runtime.openOptionsPage();
  const getActionLabel = (id: string) => ACTION_TYPES.find(a => a.id === id)?.label || 'Action';

  const handleManualPause = () => {
    const extensionUrl = chrome.runtime.getURL('src/cooldown/index.html');
    const target = currentUrl ? encodeURIComponent(currentUrl) : '';
    chrome.tabs.update({ url: `${extensionUrl}?target=${target}&manual=true` });
  };

  return (
    <div className="w-[380px] min-h-[540px] bg-light-base dark:bg-dark-base text-light-text dark:text-dark-text flex flex-col animate-fade-in">
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-component bg-accent flex items-center justify-center">
            <Pause className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight leading-tight">Stillness</h1>
            <p className="text-[11px] text-light-text-tertiary dark:text-dark-text-tertiary mt-0.5">Mindful pause.</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-light-text-tertiary dark:text-dark-text-tertiary" onClick={handleOptionsClick}>
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 px-5 flex flex-col gap-4">
        <div className="rounded-card border border-accent/20 bg-accent/5 p-4 transition-all duration-300 hover:border-accent/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Timer className="w-3.5 h-3.5 text-accent" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-accent">Instant Cooldown</span>
            </div>
            {currentDomain && (
              <span className="text-[11px] font-medium opacity-50 truncate max-w-[140px]">{currentDomain}</span>
            )}
          </div>
          <Button
            size="md"
            className="w-full text-[13px] bg-accent hover:bg-accent-hover text-white shadow-sm"
            onClick={handleManualPause}
          >
            Start 10-min pause now
          </Button>
          <p className="text-[10px] text-center mt-2.5 opacity-40">Use this to pause your current activity immediately.</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-light-text-tertiary dark:text-dark-text-tertiary">Rules</span>
          <Badge variant="secondary">{rules.length}</Badge>
        </div>

        {rules.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-10">
            <p className="text-[13px] font-medium text-light-text-secondary dark:text-dark-text-secondary">No rules yet</p>
            <p className="text-[12px] text-light-text-tertiary dark:text-dark-text-tertiary mt-1">Configure sites to pause on.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
            {rules.map(rule => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-component border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface px-4 py-3"
              >
                <div className="flex flex-col gap-1 overflow-hidden mr-3">
                  <span className="text-[13px] font-medium truncate">{rule.name || rule.domainPattern}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-light-text-tertiary dark:text-dark-text-tertiary">
                      {getActionLabel(rule.actionType)}
                    </span>
                    <span className="text-[11px] text-light-text-tertiary dark:text-dark-text-tertiary">·</span>
                    <span className="text-[11px] text-light-text-tertiary dark:text-dark-text-tertiary">
                      {rule.cooldownMinutes} min
                    </span>
                  </div>
                </div>
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={() => toggleRule(rule.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 pt-4 pb-5 mt-auto">
        <div className="border-t border-light-border dark:border-dark-border pt-4">
          <Button variant="outline" className="w-full text-[13px]" onClick={handleOptionsClick}>
            <Plus className="w-3.5 h-3.5" />
            Manage Rules
          </Button>
          <p className="text-center text-[10px] font-medium tracking-[0.1em] text-light-text-tertiary/60 dark:text-dark-text-tertiary/50 mt-3">
            LOCAL · NO ACCOUNT
          </p>
        </div>
      </div>
    </div>
  );
};
