<template>
    <IonContent class="content">
      <h1 class="title">Minhas Solicitações</h1>
      <div v-if="requests.length">
        <div v-for="request in requests" :key="request.id" class="status-card">
          <p><strong>Item:</strong> {{ request.item_name }}</p>
          <p><strong>Status:</strong> {{ request.status }}</p>
        </div>
      </div>
      <p v-else>Você ainda não solicitou nenhum item.</p>
    </IonContent>
  </template>
  
  <script>
  import { IonContent } from '@ionic/vue';
  import { ref, onMounted, inject } from 'vue';
  import { supabase } from '@/lib/supabase';

  export default {
  components: {
    IonContent,
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
            status
          `)
          .eq('request_user_id', user.id);
        if (error) {
          console.error('Erro ao buscar solicitações:', error.message);
          return;
        }

        if (data) {
          requests.value = data;
        }
      } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
      }
    };

    onMounted(() => {
      fetchRequests();
    });

    return {
      requests,
    };
  },
};
  </script>
  
  <style scoped>
  .content {
    padding: 16px;
  }
  
  .title {
    font-size: 1.5rem;
    text-align: center;
    color: #30757a;
  }
  
  .status-card {
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  