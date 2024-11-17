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
            <IonButton size="small" color="primary" @click="editInfo">Editar Info</IonButton>
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
          <p><strong>Local?</strong><br />{{ adData.location }}</p>
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
  
        <!-- Botão de Concluir -->
        <IonButton expand="block" color="success" @click="finishAction">Concluir Ação</IonButton>
      </div>
    </IonContent>
  </template>
  
  <script>
  import {
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonButton
  } from '@ionic/vue';
  
  export default {
    components: {
      IonContent,
      IonSegment,
      IonSegmentButton,
      IonButton
    },
  
    data() {
      return {
        activeTab: 'description', // Tab ativa
        adData: {
          images: [
            'https://via.placeholder.com/300x200?text=Imagem+1',
            'https://via.placeholder.com/300x200?text=Imagem+2'
          ],
          donorPhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
          donorName: 'Júlio S. de Oliveira',
          location: 'Rua x, bairro y, Porto Alegre, RS',
          need: 'Banheiro',
          area: '6 comprimento x 4 largura (em metros)',
          requiredMaterials: 'Engenheiro em falta',
          materialsOnHand: 'A definir material necessário',
          architect: 'Não possui',
          engineer: 'Não possui',
          team: 'Equipe em aberto'
        }
      };
    },
  
    methods: {
      editInfo() {
        // Lógica para editar informações
        console.log('Editar informações clicado.');
      },
  
      finishAction() {
        // Lógica para concluir ação
        console.log('Ação concluída.');
      }
    }
  };
  </script>
  
  <style scoped>
  .content {
    padding: 16px;
    --background: #f9f6e2;
  }
  
  .details-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .image-carousel {
    display: flex;
    overflow-x: scroll;
    gap: 1rem;
  }
  
  .image-carousel img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .header-info {
    display: flex;
    align-items: center;
    gap: 1rem;
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
  </style>
  