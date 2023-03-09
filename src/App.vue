<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="border-b-[2px] p-6">
    <nav class="flex justify-between">
      <RouterLink to="/">Liste restaurants</RouterLink>
      <RouterLink to="/cart"
        ><span class="text-lg text-sky-400"
          ><font-awesome-icon :icon="['fas', 'cart-shopping']" /></span
      ></RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
