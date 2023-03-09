import { createRouter, createWebHistory } from 'vue-router'
import ListRestaurantsView from '@/views/ListRestaurantsView.vue'
// import useCart from '@/composables/useCart'

// const { orderSummary } = useCart()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListRestaurantsView
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      children: [
        {
          path: ':restaurantId',
          name: 'restaurant',
          component: () => import('@/views/RestaurantDetailsView.vue')
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/order_recap',
      name: 'summary',
      component: () => import('@/views/SummaryView.vue'),
      beforeEnter: (to, from, next) => {
        const hasAccessSummary = localStorage.getItem('orderSummary') === 'true'
        if (hasAccessSummary) next()
        else next({ name: 'home' })
      }
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (to.name !== 'summary') localStorage.setItem('orderSummary', 'false')
})

export default router
