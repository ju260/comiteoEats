<script setup lang="ts">
import { computed } from 'vue'
import listMenu from '@/components/RestaurantDetails/_subs/listMenu.vue'
import type { Restaurant } from '@/components/types/types'
import { useRestaurants } from '@/composables/useRestaurants'

export interface Props {
  restaurant: Restaurant
}
const props = defineProps<Props>()

const { displayMenu } = useRestaurants()

const menu = computed(
  () =>
    displayMenu({
      dishes: props.restaurant?.dishes?.data,
      restaurantId: props.restaurant?.id
    }) || null
)
</script>

<template>
  <div>
    <img
      src="https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&h=300&q=50"
      class=""
    />
    <div>
      <h1 class="text-3xl font-bold" data-testid="restaurantName">{{ restaurant.name }}</h1>
      <div data-testid="restaurantCity">
        <p>{{ restaurant.street_address }}</p>
        <p data-testid="restaurantCity">{{ restaurant.zip_code }} {{ restaurant.city }}</p>
      </div>
    </div>
    <div class="mt-5">
      <h2 class="text-2xl font-bold">Menu</h2>
      <listMenu v-if="menu" :menu="menu" />
    </div>
  </div>
</template>
