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
          @click.stop="currentIndex = index"
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
  width: 20.5rem;
  height: 13.5rem;
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
  align-items: center;
  background-color: #626266;
  padding: 12px 8px;
  width: 112px;
  height: 24px;
  border-radius: 12px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 6px;
}

.indicator {
  width: 10px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  margin: 0 4px;
  cursor: pointer;
}

.indicator.active {
  background-color: #000000;
}

.donor-data {
  display: flex;
  align-items: center;
  background-color: #30757A;
  height: 3.18rem;
  border-radius: 0 0 20px 20px;
  color: #FAFAFA;
  font-size: 0.75rem;
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