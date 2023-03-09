<script setup lang="ts">
import cart from '@/components/Cart/cart.vue'
import shipping from '@/components/Shipping/shipping.vue'
import useCart from '@/composables/useCart'
import useFetch from '@/composables/useFetch'
import type { Dish, ShippingAddress, ItemOrder } from '@/components/types/types'
import { useRouter } from 'vue-router'

const { cartItems, setOrderSummary } = useCart()
const { fetchData, response } = useFetch()
const router = useRouter()

function createItemOder(dishes: Dish[]): ItemOrder[] {
  const itemOrder: ItemOrder[] = []

  dishes.forEach((Dish) => {
    const foundItem = itemOrder.find((item) => item.id === Dish.id)
    if (foundItem) {
      foundItem.quantity += 1
    } else {
      itemOrder.push({ id: String(Dish.id), quantity: 1 })
    }
  })

  return itemOrder
}

async function submitOrder(shippingAddress: ShippingAddress) {
  const items = createItemOder(cartItems.value)
  const order = { ...shippingAddress, items }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  }

  try {
    await fetchData({ url: `${import.meta.env.VITE_API_URL}/orders`, options: requestOptions })
    setOrderSummary(response.value?.data)
    await localStorage.setItem('orderSummary', 'true')
    router.push({ name: 'summary' })
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <main class="p-2">
    <h1 class="text-2xl font-bold">Récapitulatif</h1>
    <section><cart :cart-items="cartItems" /></section>
    <section><shipping @submit-shipping-form="submitOrder" /></section>
  </main>
</template>
