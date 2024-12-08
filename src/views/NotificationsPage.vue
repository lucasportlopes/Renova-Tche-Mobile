<template>
    <IonContent class="content">
      <h1 class="title">Solicitações Recebidas</h1>
      <div v-if="requests.length">
        <div v-for="request in requests" :key="request.id" class="request-card">
          <p><strong>Item:</strong> {{ request.item_name }}</p>
          <p><strong>Solicitante:</strong> {{ request.request_user.name }}</p>
          <p><strong>Status:</strong> {{ request.status }}</p>
          <div class="button-group">
            <!-- Botões para aceitar/rejeitar -->
            <IonButton
              v-if="request.status === 'PENDING'"
              color="success"
              @click="acceptRequest(request.id)"
            >
              Aceitar
            </IonButton>
            <IonButton
              v-if="request.status === 'PENDING'"
              color="danger"
              @click="rejectRequest(request.id)"
            >
              Rejeitar
            </IonButton>
  
            <!-- Botão para concluir a doação
            <IonButton
              v-if="request.status === 'ACCEPTED'"
              color="success"
              @click="navigateToConclude(request)"
            >
              Concluir Doação
            </IonButton> -->
          </div>
        </div>
      </div>
      <p v-else>Nenhuma solicitação recebida.</p>
    </IonContent>
  </template>
  
  <script>
import { IonContent, IonButton } from '@ionic/vue';
import { ref, onMounted, inject } from 'vue';
import { supabase } from '@/lib/supabase';

export default {
  components: {
    IonContent,
    IonButton,
  },
  setup() {
    const requests = ref([]);

    const user = inject('user');

    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('donations')
          .select(`
            id,
            item_name,
            status,
            donor_name,
            request_user:users!request_user_id (
              id,
              username,
              photo,
              name
            )
          `)
          .eq('donor_id', user.id)
          .neq('status', 'OPEN');

        if (error) {
          console.error('Erro ao buscar solicitações recebidas:', error.message);
          return;
        }

        if (data) {
          requests.value = data;
        }
      } catch (error) {
        console.error('Erro ao buscar solicitações recebidas:', error);
      }
    };

    onMounted(() => {
      fetchRequests();
    });

    const acceptRequest = async (requestId) => {
      console.log('Solicitação aceita:', requestId);
      try {
        const { error } = await supabase
          .from('donations')
          .update({ status: 'ACCEPTED' })
          .eq('id', requestId);

        if (error) {
          console.error('Erro ao aceitar solicitação:', error.message);
        } else {
          const request = requests.value.find((r) => r.id === requestId);
          if (request) request.status = 'ACCEPTED';
        }
      } catch (error) {
        console.error('Erro ao aceitar solicitação:', error);
      }
    };

    const rejectRequest = async (requestId) => {
      console.log('Solicitação rejeitada:', requestId);
      try {
        const { error } = await supabase
          .from('donations')
          .update({ status: 'OPEN', request_user_id: null })
          .eq('id', requestId);

        if (error) {
          console.error('Erro ao rejeitar solicitação:', error.message);
        } else {
          requests.value = requests.value.filter((r) => r.id !== requestId);
        }
      } catch (error) {
        console.error('Erro ao rejeitar solicitação:', error);
      }
    };

    const navigateToConclude = (request) => {
      console.log('Navegando para concluir doação:', request);
      this.$router.push({
        name: 'concludeDonation',
        params: { id: request.id },
        query: { data: JSON.stringify(request) },
      });
    };

    return {
      requests,
      acceptRequest,
      rejectRequest,
      navigateToConclude,
    };
  },
};
</script>
    
    <style scoped>
    .content {
      padding: 16px;
      --background: #f9f6e2;
    }
    
    .title {
      font-size: 1.5rem;
      text-align: center;
      color: #30757a;
      margin-bottom: 1rem;
    }
    
    .request-card {
      padding: 1rem;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .request-card p {
      margin: 0.5rem 0;
      font-size: 1rem;
      color: #333;
    }
    
    .button-group {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
    }
    
    .button-group IonButton {
      flex: 1;
    }
    </style>
    
  