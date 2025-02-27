<template>
  <nav>
    Navbar
  </nav>
</template>

<!-- <script>
import { useAuthStore } from "../store/index";
import { useRouter } from 'vue-router';

export default {
  methods: {
    openSidebar() {
      this.$emit("open");
    },
    logout() {
      const authStore = useAuthStore();
      const router = useRouter();

      authStore.clear(); // Clear the auth store
      location.reload(); // Reload the page to reset the app state
    }
  }
};
</script> -->

<style scoped>
</style>