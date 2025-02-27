// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import "./assets/css/main.css"

// Import your router configuration
import router from './router';

// Import Pinia and the persisted state plugin
import piniaPersistedState from 'pinia-plugin-persistedstate';

// Create Pinia and use the persisted state plugin
const pinia = createPinia();
pinia.use(piniaPersistedState);

// Create the Vue app
const app = createApp(App);

// Use Pinia with the Vue app
app.use(pinia);

// Use Vue Router
app.use(router);

// Mount the app
app.mount('#app');
