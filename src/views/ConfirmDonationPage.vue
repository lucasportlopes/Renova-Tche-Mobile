<template>
  <IonContent class="content">
    <div class="confirmation-container" v-if="confirmationData">
      <h1 class="title">Confirmação da Doação</h1>

      <!-- Imagens -->
      <div class="images-container" v-if="confirmationData.images && confirmationData.images.length">
        <h2>Imagens</h2>
        <div class="image-grid">
          <div v-for="(image, index) in confirmationData.images" :key="index" class="image-preview">
            <img :src="image" alt="Imagem carregada" />
          </div>
        </div>
      </div>
      <div class="donation-details">
        <p><strong>Qual o endereço?</strong><br />{{ confirmationData.address || 'Não informado' }}</p>
        <p><strong>O que deseja doar?</strong><br />{{ confirmationData.itemName || 'Não informado' }}</p>
        <p><strong>Quantidade e unidade:</strong><br />
          {{ confirmationData.itemAmount || 'Não informado' }} {{ confirmationData.unit || '' }}
        </p>
        <p><strong>Precisa de ajuda?</strong><br />
          {{ confirmationData.needsHelp === 'yes' ? 'Precisa de ajuda' : 'Não precisa de ajuda' }}
        </p>
      </div>

      <!-- Botões de ação -->
      <div class="button-group">
        <IonButton @click="goBack" color="danger" expand="block">
          Voltar
        </IonButton>
        <IonButton @click="confirmDonation" color="primary" expand="block">
          Confirmar
        </IonButton>
      </div>
    </div>
  </IonContent>
</template>

<script>
import { IonContent, IonButton } from '@ionic/vue';

export default {
  components: {
    IonContent,
    IonButton
  },

  data() {
    return {
      confirmationData: null // Dados da doação
    };
  },
  mounted() {
    try {
      const data = this.$route.query.data ? JSON.parse(this.$route.query.data) : {};
      this.confirmationData = {
        images: data.images || [],
        address: data.address || '',
        itemName: data.itemName || '',
        itemAmount: data.itemAmount || '',
        unit: data.unit || '', // Inclui a unidade de medida
        needsHelp: data.needsHelp || 'no'
      };
    } catch (error) {
      console.error('Erro ao carregar os dados da doação:', error);
      this.confirmationData = {
        images: [],
        address: '',
        itemName: '',
        itemAmount: '',
        unit: '',
        needsHelp: 'no'
      };
    }
  },
  methods: {
    goBack() {
      this.$router.back(); // Retorna para a tela anterior
    },

    confirmDonation() {
      console.log('Doação Confirmada:', this.confirmationData);
      // Aqui você pode integrar com uma API para enviar os dados
      this.$router.push('/doacoes'); // Redireciona para a tela de doações
    }
  }
};
</script>

<style scoped>
.content {
  padding: 16px;
  --background: #f9f6e2;
}

.confirmation-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 16px;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #30757a;
}

.images-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.image-preview {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.donation-details {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.donation-details p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

button {
  font-size: 1rem;
  font-weight: bold;
}
</style>
