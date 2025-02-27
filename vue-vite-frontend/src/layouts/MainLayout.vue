<!-- layouts/MainLayout.vue -->
<template>
  <div>
    <Navbar />
    <!-- Sidebar content goes here -->
    <slot></slot>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'MainLayout',
  components: {
    Navbar,
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
