import { CooldownRule } from '../types/cooldown';

export function matchRule(url: string, rules: CooldownRule[]): CooldownRule | undefined {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const pathname = parsedUrl.pathname;

    for (const rule of rules) {
      if (!rule.enabled) continue;

      // Check active time window if enabled
      if (rule.activeTimeWindow?.enabled) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        const [startH, startM] = rule.activeTimeWindow.start.split(':').map(Number);
        const [endH, endM] = rule.activeTimeWindow.end.split(':').map(Number);
        const startTime = startH * 60 + startM;
        const endTime = endH * 60 + endM;

        let isActiveNow = false;
        if (startTime < endTime) {
          // e.g., 09:00 to 17:00
          isActiveNow = currentTime >= startTime && currentTime <= endTime;
        } else {
          // e.g., 22:00 to 06:00 (crosses midnight)
          isActiveNow = currentTime >= startTime || currentTime <= endTime;
        }

        if (!isActiveNow) continue;
      }

      // Domain match
      // Pattern can be like "amazon.com" matching "www.amazon.com"
      const domainPattern = rule.domainPattern.toLowerCase().trim();
      if (!domainPattern) continue;

      // Simple includes for MVP, can be improved to exact domain matching
      const matchesDomain = hostname.includes(domainPattern);

      if (matchesDomain) {
        // Path keyword match if specified
        if (rule.pathKeywords && rule.pathKeywords.length > 0) {
          const pathMatches = rule.pathKeywords.some(keyword => pathname.toLowerCase().includes(keyword.toLowerCase()));
          if (pathMatches) {
            return rule;
          }
        } else {
          return rule;
        }
      }
    }
  } catch (e) {
    console.error("Error parsing URL or matching rules", e);
  }
  return undefined;
}
