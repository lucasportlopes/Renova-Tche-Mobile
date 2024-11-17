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
