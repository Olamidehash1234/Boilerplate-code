<template>
  <router-view v-slot="{ Component, route }">
    <!-- Dynamically select layout based on route meta -->
    <component :is="getLayout(route)">
      <component :is="Component" />
    </component>
  </router-view>
</template>

<script>
import MainLayout from './layouts/MainLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';

export default {
  methods: {
    getLayout(route) {
      switch (route.meta.layout) {
        case 'MainLayout':
          return MainLayout;
        case 'AuthLayout':
          return AuthLayout;
        default:
          return 'div'; // Default layout (no layout)
      }
    }
  }
};
</script>

<style>
/* Global styles go here */
</style>
