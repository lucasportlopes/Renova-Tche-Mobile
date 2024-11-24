<template>
    <IonContent class="content">
      <h1 class="title">Concluir Doação</h1>
      <div class="summary-container">
        <p><strong>Item:</strong> {{ donation.itemName }}</p>
        <p><strong>Receptor:</strong> {{ donation.receiver }}</p>
        <IonButton expand="block" color="success" @click="markAsCompleted">
          Marcar como Entregue
        </IonButton>
      </div>
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
        donation: {
          itemName: '',
          receiver: '',
        },
      };
    },
    created() {
    const requestData = this.$route.query.data;
    if (requestData) {
      const request = JSON.parse(requestData);
      this.donation.itemName = request.itemName;
      this.donation.receiver = request.userName;
    }
    },
    methods: {
      markAsCompleted() {
        console.log('Doação marcada como entregue.');
        this.$router.push('/doacoes');
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
  
  .summary-container {
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  