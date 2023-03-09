<script setup lang="ts">
import type { Restaurant } from '@/components/types/types'

export interface Props {
  restaurant: Restaurant
}
const props = defineProps<Props>()
</script>

<template>
  <router-link :to="`/restaurants/${restaurant.id}`">
    <img
      src="https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&h=300&q=50"
      class="rounded-md"
    />
    <div class="relative m-8 -mt-8 rounded-md bg-white p-4">
      <h2 class="text-3xl font-bold" data-testid="restaurantName">{{ props.restaurant.name }}</h2>
      <div data-testid="restaurantCity">{{ props.restaurant.city }}</div>
      <span
        class="absolute top-2 right-2 block h-8 w-8 rounded-full bg-slate-300 text-center"
        data-testid="restaurantRating"
        >{{ props.restaurant.ratings_average }}</span
      >
      <div data-testid="restaurantCategory">{{ props.restaurant.category }}</div>
    </div>
  </router-link>
</template>
