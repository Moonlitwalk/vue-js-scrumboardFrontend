import { createRouter, createWebHistory } from 'vue-router';
import BoardIndex from '../views/boards/index.vue';
import BoardCreate from '../views/boards/Create.vue';
import BoardShow from '../views/boards/Show.vue';

const routes = [
  { path: '/', redirect: '/boards' },
  { path: '/boards', component: BoardIndex },
  { path: '/boards/create', component: BoardCreate },
  { path: '/boards/:id', component: BoardShow },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
