<template>
    <IonContent class="content">
      <h1 class="title">Solicitações Recebidas</h1>
      <div v-if="requests.length">
        <div v-for="request in requests" :key="request.id" class="request-card">
          <p><strong>Item:</strong> {{ request.itemName }}</p>
          <p><strong>Solicitante:</strong> {{ request.userName }}</p>
          <div class="button-group">
            <IonButton color="success" @click="acceptRequest(request.id)">Aceitar</IonButton>
            <IonButton color="danger" @click="rejectRequest(request.id)">Rejeitar</IonButton>
          </div>
        </div>
      </div>
      <p v-else>Nenhuma solicitação recebida.</p>
    </IonContent>
  </template>
  
  <script>
  import { IonContent, IonButton } from '@ionic/vue';
  
  export default {
    components: {
      IonContent,
      IonButton,
    },
    data() {
      return {
        requests: [
          { id: 1, itemName: 'Banheiro', userName: 'Carlos Silva' },
          { id: 2, itemName: 'Tijolos', userName: 'Ana Paula' },
        ],
      };
    },
    methods: {
      acceptRequest(requestId) {
        console.log('Solicitação aceita:', requestId);
      },
      rejectRequest(requestId) {
        console.log('Solicitação rejeitada:', requestId);
      },
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
  
  .request-card {
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
  </style>
  