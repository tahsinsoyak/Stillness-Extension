chrome.runtime.onInstalled.addListener(() => {
  console.log('Decision Cooldown Installed.');
});

// Optionally listen for tab updates to clean up state
chrome.tabs.onRemoved.addListener((_tabId) => {
  // cleanup
});
