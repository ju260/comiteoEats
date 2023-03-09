import { ref } from 'vue'
import type { Dish, OrderSummary } from '@/components/types/types'

const cartItems = ref<Dish[]>([])
const orderSummary = ref<OrderSummary>(undefined)

export default () => {
  function addToCart(dish: Dish) {
    cartItems.value.push(dish)
  }

  function setOrderSummary(orderSummaryArg: OrderSummary) {
    orderSummary.value = orderSummaryArg
  }

  return {
    orderSummary,
    setOrderSummary,
    addToCart,
    cartItems
  }
}
