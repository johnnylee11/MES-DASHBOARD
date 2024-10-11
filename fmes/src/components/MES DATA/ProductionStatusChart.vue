<template>
  <div class="chart-wrapper">
    <h3 class="text-lg font-semibold mb-2 text-center">Production Status Chart</h3>
    <canvas id="production-status-chart"></canvas>
  </div>
</template>

<script>
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

export default {
  name: 'ProductionStatusChart',
  mounted() {
    const ctx = document.getElementById('production-status-chart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Completed', 'In Progress', 'Pending'],
        datasets: [
          {
            data: [60, 30, 10],
            backgroundColor: ['#4CAF50', '#FFC107', '#E0E0E0'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  },
};
</script>

<style scoped>
.chart-wrapper {
  width: 100%; /* Ensures the chart is responsive */
  max-width: 300px; /* Smaller maximum width */
  height: 250px; /* Explicit height to control chart size */
  margin: 0 auto; /* Center the chart */
}

canvas {
  display: block;
  max-width: 90%; /* Ensure canvas does not exceed the wrapper size */
  max-height: 90%; /* Ensure canvas height does not exceed the wrapper size */
}
</style>
