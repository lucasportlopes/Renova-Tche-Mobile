<template>
    <IonContent class="content">
      <div class="request-container">
        <h1 class="title">Solicitar Item</h1>
  
        <!-- Imagens do Item -->
        <div class="images-container">
          <div class="image-grid">
            <img v-for="(image, index) in itemData.images" :key="index" :src="image" alt="Item" />
          </div>
        </div>
  
        <!-- Detalhes do Item -->
        <div class="item-details">
          <p><strong>Item:</strong> {{ itemData.itemName }}</p>
          <p><strong>Quantidade:</strong> {{ itemData.itemAmount }}</p>
          <p><strong>Local:</strong> {{ itemData.address }}</p>
        </div>
  
        <!-- Mensagem do Usuário -->
        <div class="message-container">
          <IonTextarea
            v-model="userMessage"
            placeholder="Escreva uma mensagem ao doador (opcional)"
          />
        </div>
  
        <!-- Botão para Solicitação -->
        <IonButton expand="block" @click="sendRequest">Solicitar</IonButton>
      </div>
    </IonContent>
  </template>
  
  <script>
  import { IonContent, IonTextarea, IonButton } from '@ionic/vue';
  
  export default {
    components: {
      IonContent,
      IonTextarea,
      IonButton,
    },
    data() {
      return {
        itemData: JSON.parse(this.$route.query.data), // Dados do item enviados pela rota
        userMessage: '', // Mensagem opcional do usuário
      };
    },
    methods: {
      sendRequest() {
        console.log('Solicitação enviada:', {
          itemId: this.itemData.id,
          message: this.userMessage,
        });
        this.$router.push({ name: 'requestDonation', params: { id: donation.id } });
      },
    },
  };
  </script>
  
  <style scoped>
  .content {
    padding: 16px;
  }
  
  .request-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .title {
    font-size: 1.5rem;
    text-align: center;
    color: #30757a;
  }
  
  .images-container {
    display: flex;
    justify-content: center;
  }
  
  .image-grid img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .item-details p {
    font-size: 1rem;
    margin: 0.5rem 0;
  }
  
  .message-container {
    margin: 1rem 0;
  }
  </style>
  