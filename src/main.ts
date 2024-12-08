import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';
import '@ionic/vue/css/core.css';
import './theme/variables.css';
import './assets/css/index.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router);

const user = reactive({
  id: 7,
  name: 'Dev Name',
  photo: 'https://randomuser.me/api/portraits/women/8.jpg',
});
app.provide('user', user);

router.isReady().then(() => {
  app.mount('#app');
});