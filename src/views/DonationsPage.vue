<template>
  <IonContent class="content">
    <IonList class="donation-list bg-primaryBgColor">
      <IonItem v-for="donation in donations" :key="donation.id" lines="none" class="ionitem">
        <DonationCard 
          :itemPhotos="donation.photos"
          :donorPhoto="donation.donorPhoto" 
          :donorName="donation.donorName" 
        />
      </IonItem>
    </IonList>
  </IonContent>
</template>

<script>
import { IonContent, IonList, IonItem } from '@ionic/vue';
import DonationCard from '@/components/DonationCard.vue';
import DonationsMock from '@/data/DonationsMock';

export default {
  components: {
    IonContent,
    IonList,
    IonItem,
    DonationCard
  },

  data() {
    return {
      donations: DonationsMock
    };
  }
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

</style>
