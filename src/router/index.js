import { createRouter, createWebHistory } from 'vue-router';
import BoardIndex from '../views/boards/Index.vue';
import BoardCreate from '../views/boards/Create.vue';

const routes = [
  { path: '/', redirect: '/boards' },
  { path: '/boards', component: BoardIndex },
  { path: '/boards/create', component: BoardCreate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
