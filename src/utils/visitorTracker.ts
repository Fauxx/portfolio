// Cookieless, privacy-friendly visitor notification service for portfolio

const TELEGRAM_TOKEN_B64 = 'ODg4MDQ4NTE0NDpBQUdaU1o4bUNYTGpOVVVZcGM0SEVnbmFyRUR4TVZkRUVRMA==';
const TELEGRAM_CHAT_ID = '5040778991';
const SESSION_FLAG = 'portfolio_visit_notified';

interface GeoData {
  ip?: string;
  country?: string;
  region?: string;
  city?: string;
  organization_name?: string;
}

function getDeviceInfo(): { os: string; browser: string; isMobile: boolean } {
  const ua = navigator.userAgent;
  let os = 'Unknown OS';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown Browser';
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  return { os, browser, isMobile };
}

function formatReferrer(rawReferrer: string): string {
  if (!rawReferrer) return 'Direct / Bookmark / PDF Resume';
  try {
    const url = new URL(rawReferrer);
    if (url.hostname.includes('linkedin.com')) return 'LinkedIn (Recruiter / Profile)';
    if (url.hostname.includes('github.com')) return 'GitHub';
    if (url.hostname.includes('google.')) return 'Google Search';
    return url.hostname;
  } catch {
    return rawReferrer.slice(0, 50);
  }
}

export async function trackVisitor(): Promise<void> {
  // 1. Guard against local dev runs to prevent self-notification
  if (typeof window === 'undefined') return;
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0') {
    return;
  }

  // 2. Guard against web bots / automated crawlers
  if (navigator.webdriver) return;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('bot') || ua.includes('crawl') || ua.includes('spider') || ua.includes('lighthouse')) {
    return;
  }

  // 3. Deduplicate within the same browser session (one ping per visit session)
  try {
    if (sessionStorage.getItem(SESSION_FLAG)) {
      return;
    }
    sessionStorage.setItem(SESSION_FLAG, 'true');
  } catch {
    // sessionStorage disabled or private mode fallback
  }

  const { os, browser, isMobile } = getDeviceInfo();
  const screenRes = `${window.screen.width}x${window.screen.height}`;
  const referrer = formatReferrer(document.referrer);
  const now = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Manila',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  let geo: GeoData = {};

  // 4. Query cookieless IP geo endpoint (GeoJS, timeout 3.5s so it never blocks)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://get.geojs.io/v1/ip/geo.json', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      geo = await res.json();
    }
  } catch {
    // Fallback if blocked by adblock or network timeout
  }

  const locationParts = [geo.city, geo.region, geo.country].filter(Boolean);
  const locationStr = locationParts.length > 0 ? locationParts.join(', ') : 'Unknown Location';
  const networkStr = geo.organization_name || 'Unknown Network';
  const ipStr = geo.ip ? `\`${geo.ip}\`` : 'Hidden';

  const message = `🎯 *New Portfolio Visitor!*

📍 *Location:* ${locationStr}
🏢 *ISP / Org:* ${networkStr}
🌐 *IP:* ${ipStr}
🔗 *Referrer:* ${referrer}
💻 *Device:* ${os} • ${browser} (${isMobile ? 'Mobile' : 'Desktop'})
🖥️ *Screen:* ${screenRes}
⏰ *Time:* ${now} (PHT)
🌐 *URL:* ${window.location.href}`;

  // 5. Send message directly to Telegram Bot API
  try {
    const botToken = atob(TELEGRAM_TOKEN_B64);
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  } catch {
    // Fail silently in background to avoid any client disruption
  }
}
