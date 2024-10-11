<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg text-center mb-8">
      <h1 class="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p class="text-lg text-gray-600">Navigate to your desired dashboard:</p>
      <div class="mt-6 flex justify-center space-x-4">
        <router-link to="/production-dashboard" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Production Dashboard
        </router-link>
        <router-link to="/qc-dashboard" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          QC Dashboard
        </router-link>
      </div>
    </div>

    <!-- Responsive grid layout with fixed sizes for charts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <ProductionStatusChart class="chart-container"/>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <MachineUtilizationChart class="chart-container"/>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-lg md:col-span-2">
        <DefectRateChart class="chart-container"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductionStatusChart from '@/components/MES DATA/ProductionStatusChart.vue';
import MachineUtilizationChart from '@/components/MES DATA/MachineUtilizationChart.vue';
import DefectRateChart from '@/components/MES DATA/DefectRateChart.vue';

export default {
  name: 'HomePage',
  components: {
    ProductionStatusChart,
    MachineUtilizationChart,
    DefectRateChart,
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px; /* Adjust the height as needed */
  max-width: 500px; /* Optional: set a max width */
  margin: 0 auto; /* Center the chart */
}

h3 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}

.grid {
  margin-top: 20px;
}
</style>
