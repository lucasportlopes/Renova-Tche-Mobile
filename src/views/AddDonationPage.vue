<template>
  <IonContent class="content">
    <form @submit.prevent="submitForm" class="form-container">
      <h1 class="title">Cadastrar Doação</h1>

      <!-- Campos do formulário -->
      <IonItem class="form-item">
        <IonLabel position="stacked">O que deseja doar?</IonLabel>
        <IonInput
          v-model="form.itemName"
          placeholder="Digite o nome do item"
          required
        />
      </IonItem>

      <IonItem class="form-item">
        <IonLabel position="stacked">Quantidade</IonLabel>
        <IonInput
          v-model="form.itemAmount"
          type="number"
          placeholder="Digite a quantidade"
          required
        />
      </IonItem>

      <IonItem class="form-item">
        <IonLabel position="stacked">Unidade de Medida</IonLabel>
        <IonSelect v-model="form.unit" placeholder="Escolher unidade" interface="popover">
          <IonSelectOption value="kg">Kilograma (kg)</IonSelectOption>
          <IonSelectOption value="g">Grama (g)</IonSelectOption>
          <IonSelectOption value="l">Litro (l)</IonSelectOption>
          <IonSelectOption value="ml">Mililitro (ml)</IonSelectOption>
          <IonSelectOption value="un">Unidade (un)</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem class="form-item">
        <IonLabel position="stacked">Precisa de ajuda para buscar?</IonLabel>
        <IonSelect v-model="form.needsHelp" placeholder="Escolher" interface="popover">
          <IonSelectOption value="yes">Preciso de ajuda</IonSelectOption>
          <IonSelectOption value="no">Tenho ajuda</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem class="form-item" v-if="form.needsHelp === 'yes'">
        <IonLabel position="stacked">Onde é o local para buscar?</IonLabel>
        <IonInput
          v-model="form.address"
          placeholder="Ex: Rua A, Bairro B, Cidade C"
          required
        />
      </IonItem>

      <!-- Upload de imagens -->
      <div class="image-upload">
        <h2>Adicionar imagens</h2>
        <div class="images-container">
          <div v-for="(image, index) in form.images" :key="index" class="image-preview">
            <img :src="image" alt="Pré-visualização" />
            <button type="button" @click="removeImage(index)" class="remove-button">X</button>
          </div>
          <div
            v-if="form.images.length < maxImages"
            class="add-image-button"
            @click="addImage"
          >
            <IonIcon name="add" />
          </div>
        </div>
        <p v-if="form.images.length >= maxImages">Máximo de {{ maxImages }} imagens permitido.</p>
      </div>

      <!-- Botões de ação -->
      <div class="button-group">
        <IonButton @click="goBack" color="danger" expand="block">
          Voltar
        </IonButton>
        <IonButton
          type="submit"
          :disabled="!isFormValid"
          color="primary"
          expand="block"
        >
          Confirmar
        </IonButton>
      </div>
    </form>
  </IonContent>
</template>

<script>
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon
} from '@ionic/vue';

export default {
  components: {
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon
  },

  data() {
    return {
      form: {
      itemName: '',
      itemAmount: '',
      unit: null, // Nova propriedade para unidade de medida
      needsHelp: null,
      address: '',
      images: [] // Armazena as URLs das imagens carregadas
    },
      maxImages: 4 // Limite de imagens permitidas
    };
  },

  computed: {
    isFormValid() {
      return (
        this.form.itemName &&
        this.form.itemAmount &&
        this.form.unit && // Validação da unidade de medida
        (this.form.needsHelp === 'no' || this.form.address) &&
        this.form.images.length > 0
      );
    }
  },

  methods: {
    goBack() {
      this.$router.back();
    },

    submitForm() {
      console.log('Form Submitted:', this.form);
      this.$router.push({
        path: '/confirmacao',
        query: {
          data: JSON.stringify(this.form) // Envia os dados do formulário para a próxima tela
        }
      });
    },

    addImage() {
      // Simulação de carregamento de imagem (substitua por um input de arquivo real)
      const fakeImageUrl = `https://via.placeholder.com/150?text=Image+${
        this.form.images.length + 1
      }`;
      this.form.images.push(fakeImageUrl);
    },

    removeImage(index) {
      this.form.images.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.content {
  padding: 16px;
  --background: #f9f6e2;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 16px;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #30757a;
}

.form-item {
  --padding-start: 0;
}

.image-upload {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.images-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.image-preview {
  position: relative;
  width: 100px;
  height: 100px;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.remove-button {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.add-image-button {
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
}

.add-image-button:hover {
  background-color: #d9d9d9;
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
