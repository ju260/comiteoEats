<script setup lang="ts">
import { computed } from 'vue'
import listMenu from '@/components/RestaurantDetails/_subs/listMenu.vue'
import { useRestaurants } from '@/composables/useRestaurants'
import type { Dish } from '@/components/types/types'

export interface Props {
  cartItems: Dish[]
}
const { displayMenu } = useRestaurants()

const props = defineProps<Props>()

const menu = computed(() => displayMenu({ dishes: props.cartItems }) || null)
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-5 p-5">
      <listMenu v-if="menu" :menu="menu" :canAddToCard="false" />
    </div>
  </div>
</template>
