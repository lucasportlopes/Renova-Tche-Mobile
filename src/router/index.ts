import { createRouter, createWebHistory } from '@ionic/vue-router';
import StartPage from '../views/HomePage.vue';
import DonationsPage from '../views/DonationsPage.vue';
import SearchPage from '../views/SearchPage.vue';
import MessagesPage from '../views/MessagesPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/inicio'
  },
  {
    path: '/inicio',
    name: 'home',
    component: StartPage
  },
  {
    path: '/doacoes',
    name: 'donations',
    component: DonationsPage
  },
  {
    path: '/pesquisar',
    name: 'search',
    component: SearchPage
  },
  {
    path: '/mensagens',
    name: 'messages',
    component: MessagesPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
