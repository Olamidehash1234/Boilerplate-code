import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/index';
import Home from '../views/index.vue';

const routes = [
  { path: '/', component: Home },
  // { path: '/auth/login', component: LoginPage, meta: { layout: 'AuthLayout' } },
  // { path: '/auth/create-account', component: Signup, meta: { layout: 'AuthLayout' } },
  // { path: '/driver', component: DriverPage, meta: { requiresRole: 'driver', layout: 'MainLayout' } },
  // {
  //   path: '/transporter',
  //   component: TransporterPage,
  //   meta: { requiresRole: 'transporter', layout: 'MainLayout' },
  //   children: [
  //     { path: 'tracker', component: Tracker, name: 'transporter-tracker' },
  //   ]
  // },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const role = authStore.role;

  if (to.meta.requiresRole && (!isAuthenticated || to.meta.requiresRole !== role)) {
    if (isAuthenticated) {
      if (role === 'driver') {
        next('/driver');
      } else if (role === 'transporter') {
        next('/transporter');
      } else {
        next('/');
      }
    } else {
      next('/auth/login');
    }
  } else if ((to.path === '/auth/login' || to.path === '/auth/create-account') && isAuthenticated) {
    if (role === 'driver') {
      next('/driver');
    } else if (role === 'transporter') {
      next('/transporter');
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
