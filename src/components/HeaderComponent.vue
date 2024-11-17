<template>
  <IonHeader class="bg-primaryBgColor header">
    <IonButton fill="clear" @click="showAlert('FAQ')">
      <IonIcon slot="icon-only" :icon="help" class="icon" />
    </IonButton>

    <IonTitle class="text-black title">{{ title }}</IonTitle>

    <div>
      <IonButton fill="clear" @click="navigateToNotifications">
        <IonIcon slot="icon-only" :icon="notificationsOutline" class="icon" />
      </IonButton>
      <IonButton fill="clear" @click="showAlert('Profile')" class="profile-picture">
        <img src="https://randomuser.me/api/portraits/women/8.jpg" alt="Profile Picture" />
      </IonButton>
    </div>
  </IonHeader>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { IonButton, IonHeader, IonIcon, IonTitle } from '@ionic/vue';
import { help, notificationsOutline } from 'ionicons/icons';

export default {
  components: {
    IonHeader,
    IonTitle,
    IonButton,
    IonIcon,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = ref('Renovatchê!');

    const navigateToNotifications = () => {
      router.push({ name: 'notifications' });
    };

    const showAlert = (msg) => {
      alert(`"${msg}" Não implementado`);
    };

    watch(route, (newRoute) => {
      if (newRoute.name === 'donations') {
        title.value = 'Doações!';
      } else {
        title.value = 'Renovatchê!';
      }
    });

    return {
      title,
      navigateToNotifications,
      showAlert,
      help,
      notificationsOutline,
    };
  },
};
</script>


<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #1E1B13;
}

.profile-picture {
  border-radius: 50%;
  width: 3.125rem;
  height: 3.125rem;
  overflow: hidden;
  margin: 0;
  --padding-bottom: 0;
  --padding-end: 0;
  --padding-start: 0;
  --padding-top: 0;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.icon {
  color: #1E1B13;
}
</style>