import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProductionDashboard from '../views/production/ProductionDashboard.vue'; // Adjust the path if necessary
import QualityDashboard from '../views/QC/QCDashboard.vue'; // Adjust the path if necessary
import Home from '../views/Home/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
  },
  {
    path: '/production-dashboard',
    name: 'ProductionDashboard',
    component: ProductionDashboard,
  },
  {
    path: '/qc-dashboard',
    name: 'QCDashboard',
    component: QualityDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
