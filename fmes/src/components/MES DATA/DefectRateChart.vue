<template>
    <div>
      <h3 class = "text-lg font-semibold mb-2 text-center">Defect Rate Chart</h3>
      <canvas id="defect-rate-chart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
  
  export default {
    name: 'DefectRateChart',
    mounted() {
      // Register necessary components for the line chart
      Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
  
      const ctx = document.getElementById('defect-rate-chart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              label: 'Defect Rate (%)',
              data: [2, 1.5, 1.8, 2.5, 2],
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
            },
          ],
        },
      });
    },
  };
  </script>
  
  <style scoped>
  canvas {
    max-width: 400px;
    max-height: 400px;
  }
  </style>
  