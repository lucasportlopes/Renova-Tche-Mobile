<template>
    <IonContent class="content">
      <h1 class="title">Solicitações Recebidas</h1>
      <div v-if="requests.length">
        <div v-for="request in requests" :key="request.id" class="request-card">
          <p><strong>Item:</strong> {{ request.itemName }}</p>
          <p><strong>Solicitante:</strong> {{ request.userName }}</p>
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
  
            <!-- Botão para concluir a doação -->
            <IonButton
              v-if="request.status === 'ACCEPTED'"
              color="success"
              @click="navigateToConclude(request)"
            >
              Concluir Doação
            </IonButton>
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
          { id: 1, itemName: 'Banheiro', userName: 'Carlos Silva', status: 'PENDING' },
          { id: 2, itemName: 'Tijolos', userName: 'Ana Paula', status: 'ACCEPTED' },
        ],
      };
    },
    methods: {
      acceptRequest(requestId) {
        console.log('Solicitação aceita:', requestId);
        const request = this.requests.find((r) => r.id === requestId);
        if (request) {
          request.status = 'ACCEPTED'; // Atualiza o status da solicitação
        }
      },
      rejectRequest(requestId) {
        console.log('Solicitação rejeitada:', requestId);
        this.requests = this.requests.filter((r) => r.id !== requestId); // Remove a solicitação
      },
      navigateToConclude(request) {
        console.log('Navegando para concluir doação:', request);
        this.$router.push({
          name: 'concludeDonation',
          params: { id: request.id },
          query: { data: JSON.stringify(request) },
        });
      },
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
    
  