import { createRouter, createWebHistory } from 'vue-router';
import BoardIndex from '../views/boards/Index.vue';
import BoardCreate from '../views/boards/Create.vue';
import BoardShow from '../views/boards/Show.vue';
import BoardEdit from '../views/boards/Edit.vue';

// TODO: name all routes and replace in templates

const routes = [
  { path: '/', redirect: '/boards' },
  { path: '/boards', component: BoardIndex },
  { path: '/boards/create', component: BoardCreate },
  { path: '/boards/:id', component: BoardShow },
  { path: '/boards/:id/edit', name: 'boards.edit', component: BoardEdit },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
