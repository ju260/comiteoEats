<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRestaurants } from '@/composables/useRestaurants'

const ListRestaurants = defineAsyncComponent(
  () => import('@/components/ListRestaurants/listRestaurants.vue')
)

const { listRestaurants, getRestaurants } = useRestaurants()

getRestaurants()
</script>

<template>
  <main>
    <ListRestaurants
      data-testcomponent="true"
      v-if="listRestaurants?.length"
      :list-restaurants="listRestaurants"
    />
  </main>
</template>
