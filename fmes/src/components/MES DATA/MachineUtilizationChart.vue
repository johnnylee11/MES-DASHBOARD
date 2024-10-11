<template>
    <div>
      <h3 class = "text-lg font-semibold mb-2 text-center">Machine Utilization Chart</h3>
      <canvas id="machine-utilization-chart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
  
  export default {
    name: 'MachineUtilizationChart',
    mounted() {
      // Register necessary components for the bar chart
      Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
      const ctx = document.getElementById('machine-utilization-chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Machine 1', 'Machine 2', 'Machine 3'],
          datasets: [
            {
              label: 'Utilization (%)',
              data: [80, 75, 90],
              backgroundColor: ['#4CAF50', '#FFC107', '#E0E0E0'],
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
  