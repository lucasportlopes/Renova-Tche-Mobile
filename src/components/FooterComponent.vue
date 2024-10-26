<template>
  <IonFooter class="bg-grey text-black">
    <IonToolbar class="toolbar">
      <div class="footer-buttons bg-primaryBgColor">
        <IonButton fill="clear" @click="navigate('home')" class="button">
          <div class="button-content">
            <IonIcon slot="icon-only" :icon="homeOutline" :class="{'icon': true, 'icon-checked': isActive('home')}"/>
            <IonLabel class="footer-label">Início</IonLabel>
          </div>
        </IonButton>
        <IonButton fill="clear" @click="navigate('donations')" class="button">
          <div class="button-content">
            <IonIcon slot="icon-only" :icon="heartOutline" :class="{'icon': true, 'icon-checked': isActive('donations')}"/>
            <IonLabel class="footer-label">Doações</IonLabel>
          </div>
        </IonButton>
        <IonButton fill="clear" @click="navigate('search')" class="button">
          <div class="button-content">
            <IonIcon slot="icon-only" :icon="search" :class="{'icon': true, 'icon-checked': isActive('search')}"/>
            <IonLabel class="footer-label">Pesquisar</IonLabel>
          </div>
        </IonButton>
        <IonButton fill="clear" @click="navigate('messages')" class="button">
          <div class="button-content">
            <IonIcon slot="icon-only" :icon="chatboxOutline" :class="{'icon': true, 'icon-checked': isActive('messages')}" />
            <IonLabel class="footer-label">Mensagens</IonLabel>
          </div>
        </IonButton>
      </div>
    </IonToolbar>
  </IonFooter>
</template>

<script>
import { IonFooter, IonToolbar, IonButton, IonLabel, IonIcon } from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router';
import { homeOutline, heartOutline, search, chatboxOutline } from 'ionicons/icons';

export default {
  components: {
    IonFooter,
    IonToolbar,
    IonButton,
    IonLabel,
    IonIcon
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navigate = (route) => {
      router.push({ name: route });
    };

    const isActive = (routeName) => {
      return route.name === routeName;
    };
    return { navigate, isActive, homeOutline, heartOutline, search, chatboxOutline };
  }
};
</script>

<style scoped>
.toolbar {
  --min-height: 0;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  --border-radius: 0;
}

.footer-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.footer-label {
  padding: 0;
  margin: 0;
  font-size: 3vw;
  color: #4B4639;
}

@media (min-width: 1200px) {
  .footer-label {
    font-size: 1vw;
  }
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0;
}

.icon {
  color: #4B4639;
  padding: 0.25em .45em;
  border-radius: 45%;
}

.icon-checked {
  color: #FAFAFA;
  background-color: #31757A;
}
</style>