<template>
  <IonContent class="content">
    <div class="flex justify-start items-center gap-1 p-2">
      <button
        v-for="category in categories"
        :key="category.value"
        @click="filterDonations(category.value)"
        :class="{
          'text-[#30757A] border border-[#30757A]': selectedCategory === category.value,
          'bg-[#30757A]': selectedCategory !== category.value,
        }"
        class="py-2 px-4 rounded-2xl text-white"
      >
        {{ category.label }}
      </button>
    </div>

    <IonList class="donation-list bg-primaryBgColor">
      <IonItem
        v-for="donation in filteredDonations"
        :key="donation.id"
        lines="none"
        class="ionitem"
        @click="goToDetails(donation)"
      >
        <DonationCard 
          :itemPhotos="donation.photos"
          :donorPhoto="donation.donorPhoto" 
          :donorName="donation.donorName"
        />
      </IonItem>
    </IonList>

    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton @click="navigateToAddPage" class="add-button">
        +
      </IonFabButton>
    </IonFab>
  </IonContent>
</template>


<script>
import {
  IonContent,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
} from '@ionic/vue';
import DonationCard from '@/components/DonationCard.vue';
import DonationsMock, { DonationCategory } from '@/data/DonationsMock';

export default {
  components: {
    IonContent,
    IonList,
    IonItem,
    DonationCard,
    IonFab,
    IonFabButton,
  },

  data() {
    return {
      donations: DonationsMock,
      categories: [
        { value: DonationCategory.APPLIANCES, label: 'Eletrodomésticos' },
        { value: DonationCategory.CONSTRUCTION, label: 'Materiais de construção' },
        { value: DonationCategory.OTHER, label: 'Outros' },
      ],
      selectedCategory: null,
      filteredDonations: DonationsMock,
    };
  },

  methods: {
    filterDonations(categoryValue) {
      this.selectedCategory = categoryValue;
      this.filteredDonations = this.donations.filter(
        (donation) => donation.category === categoryValue || !categoryValue
      );
    },

    navigateToAddPage() {
      this.$router.push('/cadastrar');
    },

    goToDetails(donation) {
      this.$router.push({
        path: `/detalhes/${donation.id}`,
        query: { data: JSON.stringify(donation) },
      });
    },
  },
};
</script>

<style scoped>
.donation-list {
  display: flex;
  align-items: center;
  justify-self: center;
  flex-direction: column;
  gap: 1rem;
}

.content {
  padding: 0;
  height: 100%;
  --background: #F9F6E2;
}

.donation-item {
  border-bottom: none;
  background-color: transparent;
}

.ionitem {
  --padding-start: 0px;
  --inner-padding-end: 0px;
}

.add-button {
  --background: #30757A;
}

.content {
  padding: 0;
  height: 100%;
  --background: #F9F6E2;
}
</style>
