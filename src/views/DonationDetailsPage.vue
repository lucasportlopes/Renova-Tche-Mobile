<template>
  <IonContent class="content">
    <div class="details-container">
      <!-- Imagens -->
      <!-- <div class="image-carousel">
        <img v-for="(image, index) in adData.images" :key="index" :src="image" alt="Imagem do Anúncio" />
      </div> -->

      <ImageCarousel :itemPhotos="adData.images" />

      <!-- Informações do Anúncio -->
      <div class="header-info">
        <img :src="adData.donorPhoto" alt="Foto do Doador" class="donor-photo" />
        <div class="donor-info">
          <h2>{{ adData.donorName }}</h2>
          <IonButton fill="outline" class="message-button">Mensagem</IonButton>
        </div>
      </div>

      <!-- Tabs -->
      <IonSegment v-model="activeTab" color="primary">
        <IonSegmentButton value="description">Descrição</IonSegmentButton>
      </IonSegment>

      <!-- Conteúdo das Tabs -->
      <div v-if="activeTab === 'description'" class="tab-content">
        <p><strong>O que seria?</strong><br />{{ adData.itemName }} ({{ adData.itemAmount }})</p>
        <p><strong>Qual o endereço?</strong><br />{{ adData.address }}</p>
        <p><strong>Precisa de transporte?</strong><br />{{ adData.needsHelp }}</p>
      </div>

      <!-- Botões dinâmicos -->
      <div class="button-group">
        <IonButton
          v-if="adData.isDoador"
          expand="block"
          color="primary"
          @click="editInfo"
        >
          Editar Informações
        </IonButton>
        <IonButton
          v-else
          expand="block"
          class="get-donation-btn"
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
import ImageCarousel from '@/components/ImageCarousel.vue';
import { supabase } from '@/lib/supabase';
import { inject } from 'vue';

export default {
  components: {
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonButton,
    ImageCarousel,
  },

  setup() {
    const user = inject('user');
    console.log('global user is:', user);
    return { user };
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
        console.log("data", data)
        return {
          id: data.id || null,
          images: data.photos.length ? data.photos : [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9TasrMLbQv5QaV-dm15tLfNA3mKh8kS0Tig&s',
            'https://telhanorte.vtexassets.com/arquivos/ids/1234903/1402951.jpg?v=637957654629930000',
            'https://imgs.casasbahia.com.br/55056727/1g.jpg',
            'https://d5gag3xtge2og.cloudfront.net/producao/34360658/G/blocos_18.jpg',
          ],
          donorPhoto: data.donorPhoto || 'https://via.placeholder.com/50',
          donorName: data.donorName || 'Não informado',
          itemName: data.itemName || 'Não informado',
          itemAmount: data.itemAmount || 'Não informado',
          address: data.address || 'Não informado',
          needsHelp: data.needsHelp || 'Não informado',
          isDoador: data.donorId === this.user.id,
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

    async requestDonation() {
      console.log('Doação solicitada:', this.adData);
      alert('Doação solicitada com sucesso!');

      // Atualiza o status da doação para "Solicitado"
      const { error } = await supabase
        .from('donations')
        .update({ status: 'PENDING', request_user_id: this.user.id })
        .eq('id', this.adData.id);

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
  justify-content: space-between;
  padding: 0 16px;
  gap: 1rem;
  background-color: #30757a;
  border-radius: 8px;
  color: #fff;
  padding: .25rem;
}

.donor-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.donor-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.donor-info h2 {
  margin: 0;
  font-size: 1.2rem;
}

.message-button {
  background-color: #30757a;
  color: #fff;
  margin-left: auto;
  --background: #30757a;
  --border-color: #fff;
  --color: #fff;
}

.button-group {
  display: flex;
  justify-content: center;
}

.get-donation-btn {
  background-color: #30757a;
  color: #fff;
  --background: #30757a;
  --border-color: #fff;
  --color: #fff;
  width: 10rem;
  border-radius: 0.5rem;
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
