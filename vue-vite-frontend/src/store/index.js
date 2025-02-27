// src/store/index.js
import { defineStore } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

// Create and configure the Pinia store with persistence
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    role: null,
    userName: null,
    userEmail: null,
    isAuthenticated: false,
  }),
  actions: {
    setToken(token, role) {
      this.token = token;
      this.role = role;
      this.isAuthenticated = true;
    },
    setUserDetails(name, email) {
      this.userName = name;
      this.userEmail = email;
    },
    clear() {
      this.token = null;
      this.role = null;
      this.userName = null;
      this.userEmail = null;
      this.isAuthenticated = false;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, // Store in localStorage
      },
    ],
  },
});

// Pinia plugin setup
import { createPinia } from 'pinia';

const pinia = createPinia();
pinia.use(piniaPersistedState);

export default pinia;