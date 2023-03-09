<script setup lang="ts">
import restaurant from '@/components/Restaurant/Restaurant.vue'
import type { Restaurant } from '@/components/types/types'

export interface Props {
  listRestaurants: Restaurant[]
}
const props = defineProps<Props>()
</script>

<template>
  <div>
    <ul class="grid grid-cols-2 gap-5 p-5">
      <li v-for="restaurant in listRestaurants" :key="restaurant.id">
        <restaurant :restaurant="restaurant" />
      </li>
    </ul>
  </div>
</template>
