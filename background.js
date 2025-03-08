let websiteData = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const url = new URL(tab.url);
    const domain = url.hostname;
    const currentTime = Date.now();
    
    if (!websiteData[domain]) {
      websiteData[domain] = {
        timeSpent: 0,
        lastVisited: currentTime,
      };
    } else {
      const timeSpent = websiteData[domain].timeSpent + (currentTime - websiteData[domain].lastVisited);
      websiteData[domain].timeSpent = timeSpent;
    }
    websiteData[domain].lastVisited = currentTime;
  });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  // Send data to the backend when a tab is closed
  chrome.tabs.get(tabId, (tab) => {
    const url = new URL(tab.url);
    const domain = url.hostname;
    if (websiteData[domain]) {
      sendDataToBackend(domain, websiteData[domain].timeSpent);
      websiteData[domain].timeSpent = 0; // Reset time for the domain
    }
  });
});

function sendDataToBackend(domain, timeSpent) {
  // Send the time spent data to the backend server
  fetch('https://your-backend-server.com/api/save-time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      domain: domain,
      timeSpent: timeSpent,
      timestamp: Date.now(),
    }),
  });
}
