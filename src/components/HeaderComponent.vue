<template>
  <IonHeader class="bg-primaryBgColor header">
    <IonButton fill="clear" @click="showAlert('FAQ')">
      <IonIcon slot="icon-only" :icon="help" class="icon" />
    </IonButton>

    <img :src="title" alt="Title">
    
    <div>
      <IonButton fill="clear" @click="navigateToNotifications">
        <IonIcon slot="icon-only" :icon="notificationsOutline" class="icon" />
      </IonButton>
      <IonButton fill="clear" @click="navigateToRequests" class="profile-picture">
        <img src="https://randomuser.me/api/portraits/women/8.jpg" alt="Profile Picture" />
      </IonButton>
    </div>
  </IonHeader>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { IonButton, IonHeader, IonIcon } from '@ionic/vue';
import { help, notificationsOutline } from 'ionicons/icons';
import mainHeader from '@/assets/mainHeader.svg';
import donations from '@/assets/donations.svg';

export default {
  components: {
    IonHeader,
    IonButton,
    IonIcon,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = ref(mainHeader);

    const navigateToNotifications = () => {
      router.push({ name: 'notifications' });
    };

    const navigateToRequests = () => {
      router.push({ name: 'requests' });
    };

    const showAlert = (msg) => {
      alert(`"${msg}" Não implementado`);
    };

    watch(route, (newRoute) => {
      if (newRoute.name === 'donations') {
        title.value = donations;
      } else {
        title.value = mainHeader;
      }
    });

    return {
      title,
      navigateToNotifications,
      navigateToRequests,
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