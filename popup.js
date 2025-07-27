// Popup script for extension popup
document.addEventListener('DOMContentLoaded', () => {
  console.log('AI Prompt Engineer popup loaded');
  
  // Check if we're on a supported site
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      const url = tabs[0].url;
      const supportedSites = [
        'chat.openai.com',
        'chatgpt.com',
        'claude.ai',
        'chat.deepseek.com',
        'gemini.google.com',
        'bing.com',
        'you.com',
        'poe.com'
      ];
      
      const isSupported = supportedSites.some(site => url.includes(site));
      updateStatus(isSupported);
    }
  });
});

function updateStatus(isSupported) {
  const statusDot = document.querySelector('.status-indicator');
  const statusText = document.querySelector('.status-text h3');
  const statusDescription = document.querySelector('.status-text p');
  
  if (isSupported) {
    if (statusDot) statusDot.style.background = '#10b981'; // Green
    if (statusText) statusText.textContent = 'Active on this site';
    if (statusDescription) statusDescription.textContent = 'Look for the floating 🤖 button on the page!';
  } else {
    if (statusDot) statusDot.style.background = '#f59e0b'; // Yellow
    if (statusText) statusText.textContent = 'Visit a supported site';
    if (statusDescription) statusDescription.textContent = 'Navigate to ChatGPT, Claude, or other supported LLM sites.';
  }
}
