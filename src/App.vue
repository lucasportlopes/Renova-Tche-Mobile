<template>
  <IonApp>
    <HeaderComponent />
      <router-view />
    <FooterComponent />
  </IonApp>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { IonApp } from '@ionic/vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    IonApp,
  }
};
</script>