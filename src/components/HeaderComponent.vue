<template>
  <IonHeader class="bg-primaryBgColor header">
    <IonButton fill="clear" @click="showLoginPrompt">
      <IonIcon slot="icon-only" :icon="help" class="icon" />
    </IonButton>

    <img :src="title" alt="Title" />

    <div>
      <IonButton fill="clear" @click="navigateToNotifications">
        <IonIcon slot="icon-only" :icon="notificationsOutline" class="icon" />
      </IonButton>
      <IonButton fill="clear" @click="navigateToRequests" class="profile-picture">
        <img :src="user?.photo || 'https://randomuser.me/api/portraits/women/8.jpg'" alt="Profile Picture" />
      </IonButton>
    </div>

    <IonAlert
      :isOpen="loginAlertOpen"
      header="Login"
      message="Enter your username"
      :inputs="[
        { name: 'username', placeholder: 'Username' }
      ]"
      :buttons="[
        { text: 'Cancel', role: 'cancel', handler: closeAlert },
        { text: 'OK', handler: (value) => handleLogin(value) }]"
    />

  </IonHeader>
</template>

<script>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { IonButton, IonHeader, IonIcon, IonAlert } from '@ionic/vue';
import { help, notificationsOutline } from 'ionicons/icons';
import mainHeader from '@/assets/mainHeader.svg';
import { supabase } from '@/lib/supabase';

export default {
  components: {
    IonHeader,
    IonButton,
    IonIcon,
    IonAlert,
  },
  setup() {
    const router = useRouter();
    const title = ref(mainHeader);
    const loginAlertOpen = ref(false);
    const user = inject('user');

    const showLoginPrompt = () => {
      loginAlertOpen.value = true;
    };

    const closeAlert = () => {
      loginAlertOpen.value = false;
    };

    const handleLogin = async (value) => {
    const { username } = value;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, photo')
        .eq('username', username)
        .single();

      if (error || !data) {
        console.log('Usuário não encontrado');
        alert('Username inválido. Usuário padrão será mantido.');
        return;
      }

      user.id = data.id;
      user.name = data.name;
      user.photo = data.photo;
      console.log('Login com usuário:', data);
    } catch (err) {
      alert('Erro. Usuário padrão será mantido.');
    } finally {
      closeAlert();
    }
  };

  const navigateToNotifications = () => {
    router.push({ name: 'notifications' });
  };

  const navigateToRequests = () => {
    router.push({ name: 'requests' });
  };

  return {
    title,
    loginAlertOpen,
    showLoginPrompt,
    closeAlert,
    handleLogin,
    navigateToNotifications,
    navigateToRequests,
    help,
    notificationsOutline,
    user,
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