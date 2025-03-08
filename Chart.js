<!-- analytics.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Productivity Analytics</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>Productivity Analytics</h1>
  <canvas id="productivityChart"></canvas>

  <script>
    fetch('https://your-backend-server.com/dashboard')
      .then(response => response.json())
      .then(data => {
        const ctx = document.getElementById('productivityChart').getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Productive', 'Unproductive'],
            datasets: [{
              label: 'Time Spent (Minutes)',
              data: [data.productiveTime, data.unproductiveTime],
              backgroundColor: ['#4caf50', '#f44336'],
            }],
          },
        });
      });
  </script>
</body>
</html>
