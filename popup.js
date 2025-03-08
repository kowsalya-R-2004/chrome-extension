document.getElementById('viewAnalyticsBtn').addEventListener('click', function () {
  window.open('https://your-backend-server.com/dashboard', '_blank');
});

chrome.storage.local.get(['productiveTime', 'unproductiveTime'], function (data) {
  document.getElementById('productiveTime').innerText = `${data.productiveTime} minutes`;
  document.getElementById('unproductiveTime').innerText = `${data.unproductiveTime} minutes`;
});
