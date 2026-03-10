import { createRouter, createWebHistory } from 'vue-router';
import BoardIndex from '../views/boards/index.vue';
import BoardCreate from '../views/boards/create.vue';
import BoardShow from '../views/boards/show.vue';
import BoardEdit from '../views/boards/edit.vue';
import TicketIndex from '../views/tickets/index.vue';
import TicketCreate from '../views/tickets/create.vue';
import TicketShow from '../views/tickets/show.vue';
import TicketEdit from '../views/tickets/edit.vue';

// TODO: name all routes and replace in templates

const routes = [
  //board Routes
  { path: '/', redirect: '/boards' },
  { path: '/boards', name: 'board.index', component: BoardIndex },
  { path: '/boards/create', component: BoardCreate },
  { path: '/boards/:id', name: 'board.show', component: BoardShow },
  { path: '/boards/:id/edit', name: 'boards.edit', component: BoardEdit },

  //ticket routes
  { path: '/', redirect: '/tickets'},
  { path: '/tickets', name: 'ticket.index', component: TicketIndex},
  { path: '/tickets/new_ticket', name: 'ticket.create', component: TicketCreate},
  { path: '/tickets/:id', name: 'ticket.show', component: TicketShow},
  { path: '/tickets/:id/edit', name:'ticket.edit', component: TicketEdit}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
