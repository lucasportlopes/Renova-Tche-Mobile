<template>
  <div class="donation-card">
    <div class="donation-item-photos">
      <div class="carousel">
        <img :src="itemPhotos[currentIndex]" alt="Item Photo" />
      </div>

      <div class="carousel-indicators">
        <span
          v-for="(_, index) in itemPhotos"
          :key="index"
          :class="['indicator', { active: index === currentIndex }]"
          @click="currentIndex = index"
        ></span>
      </div>
    </div>

    <div class="donor-data">
      <img :src="donorPhoto" alt="Donor Profile Picture" />
      <p class="donor-name">{{ donorName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationCard',
  props: {
    itemPhotos: {
      type: Array,
      required: true
    },
    donorPhoto: {
      type: String,
      required: true
    },
    donorName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
}
</script>

<style scoped>
.donation-card {
  display: flex;
  flex-direction: column;
  width: 75vw;
  height: 30vh;
  background-color: #F9F6E2;
}

.donation-item-photos {
  width: 100%;
  height: 80%;
  position: relative;
}

.carousel {
  width: 100%;
  height: 100%;
}

.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: -12px;
}

.indicator {
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  margin: 0 4px;
  cursor: pointer;
}

.indicator.active {
  background-color: #30757A;
}

.donor-data {
  display: flex;
  align-items: center;
  background-color: #30757A;
  height: 20%;
  border-radius: 0 0 20px 20px;
}

.donor-data img {
  width: 40px; 
  height: 40px;
  border-radius: 50%;
  margin: 0 8px;
}

.donor-name {
  font-weight: bold;
}
</style>