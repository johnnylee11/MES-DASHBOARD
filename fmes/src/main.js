import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './assets/styles.css';

// Import FontAwesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Add the icons to the library
library.add(faPlus, faEdit, faTrash);

// Create Vue App
const app = createApp(App);

// Register FontAwesome globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Use router
app.use(router);

// Mount the app
app.mount('#app');
