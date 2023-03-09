<script setup lang="ts">
import { DishesTitle } from '@/constantes/restaurant'
import { formatPrice } from '@/helpers/transformations'
import useCart from '@/composables/useCart'
import type { Menu } from '@/components/types/types'

export interface Props {
  menu: Menu
  canAddToCard?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  canAddToCard: true
})

const { addToCart } = useCart()
</script>

<template>
  <div>
    <dl v-if="menu">
      <template v-for="(dishes, type) in menu" :key="type">
        <div class="mb-5 p-5 shadow-md">
          <dt class="mb-3 text-xl font-bold">{{ DishesTitle[type] }}</dt>
          <template v-for="dish, indexDishes in dishes" :key="`${dish.name}__${indexDishes}`">
            <dd class="mb-2">
              {{ dish.name }} - {{ formatPrice(dish.price) }}
              <button
                v-if="props.canAddToCard"
                class="rounded-md bg-sky-500 px-4 py-1 text-sm font-semibold text-white opacity-100 shadow-sm hover:bg-sky-600"
                @click="addToCart(dish)"
              >
                add to cart
              </button>
            </dd>
          </template>
        </div>
      </template>
    </dl>
  </div>
</template>
