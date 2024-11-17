<template>
    <IonContent class="content">
      <h1 class="title">Minhas Solicitações</h1>
      <div v-if="requests.length">
        <div v-for="request in requests" :key="request.id" class="status-card">
          <p><strong>Item:</strong> {{ request.itemName }}</p>
          <p><strong>Status:</strong> {{ request.status }}</p>
        </div>
      </div>
      <p v-else>Você ainda não solicitou nenhum item.</p>
    </IonContent>
  </template>
  
  <script>
  import { IonContent } from '@ionic/vue';
  
  export default {
    components: {
      IonContent,
    },
    data() {
      return {
        requests: [
          { id: 1, itemName: 'Banheiro', status: 'Aguardando aprovação' },
          { id: 2, itemName: 'Tijolos', status: 'Aprovado' },
        ],
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
  