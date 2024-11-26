<template>
  <IonContent class="content">
    <div class="details-container">
      <!-- Imagens -->
      <div class="image-carousel">
        <img v-for="(image, index) in adData.images" :key="index" :src="image" alt="Imagem do Anúncio" />
      </div>

      <!-- Informações do Anúncio -->
      <div class="header-info">
        <img :src="adData.donorPhoto" alt="Foto do Doador" class="donor-photo" />
        <div class="donor-info">
          <h2>{{ adData.donorName }}</h2>
          <p>Local: {{ adData.location }}</p>
        </div>
      </div>

      <!-- Tabs -->
      <IonSegment v-model="activeTab" color="primary">
        <IonSegmentButton value="description">Descrição</IonSegmentButton>
        <IonSegmentButton value="material">Material</IonSegmentButton>
        <IonSegmentButton value="team">Equipe</IonSegmentButton>
      </IonSegment>

      <!-- Conteúdo das Tabs -->
      <div v-if="activeTab === 'description'" class="tab-content">
        <p><strong>O que precisa?</strong><br />{{ adData.need }}</p>
        <p><strong>Área medida?</strong><br />{{ adData.area }}</p>
      </div>

      <div v-if="activeTab === 'material'" class="tab-content">
        <p><strong>Materiais necessários?</strong><br />{{ adData.requiredMaterials }}</p>
        <p><strong>Material em posse?</strong><br />{{ adData.materialsOnHand }}</p>
      </div>

      <div v-if="activeTab === 'team'" class="tab-content">
        <p><strong>Arquiteto ou arquiteto responsável?</strong><br />{{ adData.architect }}</p>
        <p><strong>Engenheiro ou engenheiro responsável?</strong><br />{{ adData.engineer }}</p>
        <p><strong>Equipe?</strong><br />{{ adData.team }}</p>
      </div>

      <!-- Botões dinâmicos -->
      <div class="button-group">
        <IonButton
          v-if="isDoador"
          expand="block"
          color="primary"
          @click="editInfo"
        >
          Editar Informações
        </IonButton>
        <IonButton
          v-else
          expand="block"
          color="success"
          @click="requestDonation"
        >
          Pegar Doação
        </IonButton>
      </div>
    </div>
  </IonContent>
</template>

<script>
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonButton,
} from '@ionic/vue';

export default {
  components: {
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonButton,
  },

  props: {
    isDoador: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      activeTab: 'description', // Tab ativa
      adData: this.getAdDataFromRoute(), // Dados carregados da rota
    };
  },

  methods: {
    getAdDataFromRoute() {
      try {
        const data = this.$route.query.data ? JSON.parse(this.$route.query.data) : {};
        return {
          images: data.images || [],
          donorPhoto: data.donorPhoto || 'https://via.placeholder.com/50',
          donorName: data.donorName || 'Não informado',
          location: data.location || 'Não informado',
          need: data.need || 'Não informado',
          area: data.area || 'Não informado',
          requiredMaterials: data.requiredMaterials || 'Não informado',
          materialsOnHand: data.materialsOnHand || 'Não informado',
          architect: data.architect || 'Não informado',
          engineer: data.engineer || 'Não informado',
          team: data.team || 'Não informado',
        };
      } catch (error) {
        console.error('Erro ao carregar dados do anúncio:', error);
        return {};
      }
    },

    editInfo() {
      console.log('Editar informações clicado.');
      this.$router.push({
        path: `/cadastrar`,
        query: { data: JSON.stringify(this.adData) },
      });
    },

    requestDonation() {
      console.log('Doação solicitada:', this.adData);
      alert('Doação solicitada com sucesso!');
      this.$router.push('/solicitacoes');
    },
  },
};
</script>
<style scoped>
.content {
  --background: #f9f6e2;
  padding: 0;
}

.details-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 16px;
}

/* Estilo para o carrossel de imagens */
.image-carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0 16px;
}

.image-carousel img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

/* Informações do cabeçalho */
.header-info {
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 1rem;
  background-color: #30757a;
  border-radius: 8px;
  color: #fff;
}

.donor-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.donor-info h2 {
  margin: 0;
  font-size: 1.2rem;
}

.message-button {
  margin-left: auto;
  background-color: #f9f6e2;
  color: #30757a;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
}

/* Tabs e conteúdo das tabs */
.tabs-container {
  margin-top: 16px;
  padding: 0 16px;
}

.tab-content {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.tab-content p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;
}

/* Botão de ação */
.action-button {
  margin: 16px;
  width: calc(100% - 32px);
  height: 48px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #30757a;
  border-radius: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-button:hover {
  background-color: #285d65;
}
</style>
