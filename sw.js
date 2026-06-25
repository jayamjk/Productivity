// sw.js
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Listen for periodic sync events
self.addEventListener('periodicsync', event => {
  if (event.tag === 'focus-reminder') {
    event.waitUntil(showFocusNotification());
  }
});

// Show a notification based on the current hour
async function showFocusNotification() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Map hour ranges to meaningful messages from your routine
  let message = 'Stay disciplined. You are building a perfect man.';

  if (hour === 4 && minute < 15) message = '🌅 Rise! Water, breathwork, journal.';
  else if (hour === 4 && minute >= 15 && minute < 45) message = '🧘 Meditation & journaling time.';
  else if (hour === 4 || (hour === 5 && minute < 45)) message = '🏋️ Gym time – crush it!';
  else if (hour === 5 && minute >= 45) message = '🚿 Shower, dress, protein.';
  else if (hour === 6) message = '🚗 Driving practice or learning audio.';
  else if (hour === 7) message = '🍳 Breakfast & meal prep.';
  else if (hour === 8 || hour === 9) message = '🎨 Deep work block – phone in box.';
  else if (hour === 10 && minute < 30) message = '🎨 Still deep work. Social media window at 10:30.';
  else if (hour === 10 && minute >= 30 && minute < 50) message = '🌐 20-min social media window NOW. Be intentional.';
  else if (hour === 10 && minute >= 50) message = '⏰ Social media closed. Wind down, lunch.';
  else if (hour === 11) message = '🥗 Early lunch, pack for office.';
  else if (hour >= 12 && hour < 20) message = '💼 Office deep work. Phone on DND.';
  else if (hour === 20 && minute < 30) message = '🏠 Commute home, light dinner.';
  else if (hour === 20 || hour === 21 && minute < 30) message = '📖 Read & journal, no screens.';
  else if (hour >= 21 && minute >= 30 || hour >= 22) message = '🌙 Sleep. Phone in box.';

  const options = {
    body: message,
    icon: 'icon.png',
    badge: 'icon.png',
    tag: 'focus-reminder',
    requireInteraction: false,
  };

  return self.registration.showNotification('⚡ Focus Reminder', options);
}
