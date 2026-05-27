import { storage } from '../shared/lib/storage';
import { matchRule } from '../shared/lib/matchRule';

async function checkNavigation() {
  const currentUrl = window.location.href;

  // Do not run inside our own extension pages
  if (window.location.protocol === 'chrome-extension:') return;

  // Quick check if bypassing via query param
  if (currentUrl.includes('cooldown_skipped=true')) {
    return;
  }
  
  // Quick check in session storage if this URL was just skipped/continued
  const sessionStatus = sessionStorage.getItem('cooldown_status_' + currentUrl);
  if (sessionStatus === 'continued' || sessionStatus === 'skipped') {
    return;
  }

  const rules = await storage.getRules();
  const matchedRule = matchRule(currentUrl, rules);

  if (matchedRule) {
    // Hide body immediately to prevent flashing page content
    if (document.documentElement) {
      document.documentElement.style.display = 'none';
    }

    const extensionUrl = chrome.runtime.getURL('src/cooldown/index.html');
    const targetUrl = encodeURIComponent(currentUrl);
    
    // Redirect to cooldown page
    window.location.href = `${extensionUrl}?target=${targetUrl}&ruleId=${matchedRule.id}`;
  }
}

// Run as soon as possible
checkNavigation();
