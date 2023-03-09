<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useRestaurants } from '@/composables/useRestaurants'
import RestaurantDetails from '@/components/RestaurantDetails/RestaurantDetails.vue'

const route = useRoute()
const { getRestaurantById } = useRestaurants()
const restaurantSelectedById = ref(null)

watchEffect(async () => {
  restaurantSelectedById.value = await getRestaurantById(Number(route.params.restaurantId))
})
</script>

<template>
  <main class="p-2">
    <RestaurantDetails v-if="restaurantSelectedById" :restaurant="restaurantSelectedById" />
  </main>
</template>
