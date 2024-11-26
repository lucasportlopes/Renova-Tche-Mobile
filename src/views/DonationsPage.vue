<template>
  <IonContent class="content">
    <div class="flex justify-start items-center gap-1 p-2">
      <button
        v-for="category in categories"
        :key="category.value"
        @click="filterDonations(category.value)"
        :class="{
          'category-selected border border-[#30757A]': selectedCategory === category.value,
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
          :donor_photo="donation.donorPhoto"
          :donor_name="donation.donorName"
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

<script lang="ts" setup>
import {
  IonContent,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
} from '@ionic/vue';
import { DonationCategory, Donation } from '@/data/DonationsMock';
import { onMounted, ref, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import DonationCard from '@/components/DonationCard.vue';

const donations = ref<Donation[]>([]);

const selectedCategory = ref<string | null>(null);

const categories = [
  { value: DonationCategory.APPLIANCES, label: 'Eletrodomésticos' },
  { value: DonationCategory.CONSTRUCTION, label: 'Materiais de construção' },
  { value: DonationCategory.OTHER, label: 'Outros' },
];

const filteredDonations = computed(() =>
  selectedCategory.value
    ? donations.value.filter((donation) => donation.category === selectedCategory.value)
    : donations.value
);

async function fetchDonations() {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select(`
        id,
        donor_photo,
        donor_name,
        item_name,
        item_amount,
        address,
        status,
        category,
        donation_photos(photo_url)
      `);

    if (error) {
      console.error('Erro ao buscar doações:', error.message);
      return;
    }

    if (data) {
      donations.value = data.map((donation) => ({
        id: donation.id,
        donorPhoto: donation.donor_photo,
        donorName: donation.donor_name,
        itemName: donation.item_name,
        itemAmount: donation.item_amount,
        photos: donation.donation_photos.map((photo) => photo.photo_url),
        address: donation.address,
        status: donation.status,
        category: donation.category,
      })) as Donation[]; // Casting para garantir a tipagem
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

function filterDonations(categoryValue: string | null) {
  selectedCategory.value = categoryValue;
}

function navigateToAddPage() {
  window.location.href = '/cadastrar';
}

function goToDetails(donation: Donation) {
  window.location.href = `/detalhes/${donation.id}?data=${encodeURIComponent(JSON.stringify(donation))}`;
}

onMounted(() => {
  fetchDonations();
});
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
  --background: #f9f6e2;
}

.ionitem {
  --padding-start: 0px;
  --inner-padding-end: 0px;
}

.add-button {
  --background: #30757a;
  height: 3.5rem;
  width: 3.5rem;
  --border-radius: 12px;
  font-size: 1rem;
}

.category-selected {
  color: #30757a;
}
</style>
