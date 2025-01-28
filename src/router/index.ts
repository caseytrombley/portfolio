import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:caseStudyID',
      name: 'case-study',
      component: HomeView, // Reuse the HomeView and open the modal dynamically
    },
    {
      path: '/:projectID',
      name: 'project',
      component: HomeView, // Reuse the HomeView and open the modal dynamically
    },
  ],
  // scrollBehavior() {
  //   return { top: 0 }; // Always scroll to the top when navigating
  // },
});

export default router;
