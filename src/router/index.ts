import { createRouter, createWebHistory } from '@ionic/vue-router';
import StartPage from '../views/HomePage.vue';
import DonationsPage from '../views/DonationsPage.vue';
import SearchPage from '../views/SearchPage.vue';
import MessagesPage from '../views/MessagesPage.vue';
import AddDonationPage from '@/views/AddDonationPage.vue';
import ConfirmDonationPage from '@/views/ConfirmDonationPage.vue';
import DonationDetailsPage from '@/views/DonationDetailsPage.vue';

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
  },
  {
    path: '/cadastrar',
    name: 'addDonation',
    component: AddDonationPage
  },
  {
    path: '/detalhes/:id',
    name: 'donationDetails',
    component: DonationDetailsPage,
    props: true
  },
  {
    path: '/confirmacao',
    name: 'confirmDonation',
    component: ConfirmDonationPage, 
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
