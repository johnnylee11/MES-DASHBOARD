<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-black shadow-md">
      <div class="p-6 text-white">
        <h1 class="text-3xl font-bold mb-6">MES DASHBOARD</h1>
      </div>
      <nav class="mt-6">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/"
              class="flex items-center p-3 text-white hover:bg-gray-700 rounded-lg"
              active-class="bg-gray-800 font-semibold"
            >
              <svg
                class="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9-2v12"></path>
              </svg>
              <span class="ml-3">Home</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/production-dashboard"
              class="flex items-center p-3 text-white hover:bg-gray-700 rounded-lg"
              active-class="bg-gray-800 font-semibold"
            >
              <svg
                class="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              <span class="ml-3">Production</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/qc-dashboard"
              class="flex items-center p-3 text-white hover:bg-gray-700 rounded-lg"
              active-class="bg-gray-800 font-semibold"
            >
              <svg
                class="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="ml-3">Quality Control</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Updated sidebar with black background and white text */
aside {
  background-color: #333333; /* Black sidebar background */
}

svg {
  transition: all 0.3s ease;
}

router-link:hover svg {
  color: #cbd5e0; /* Lighter gray for hover icon */
}

router-link.active svg {
  color: #edf2f7; /* White for active icon */
}

.router-link {
  color: white;
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  border: 2px solid white;
  padding: 10px 20px;
  margin-top: 15px;
  margin-left: -5px;
  margin-bottom: 1px; 
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2); /* Optional: Adds a subtle shadow */
}

nav {
  width: 100%; /* Ensure the nav fills the sidebar */
}

</style>
