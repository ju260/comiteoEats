import { ref } from 'vue'
import type { Restaurant, Dish, Menu } from '@/components/types/types'
import useFetch from '@/composables/useFetch'
import { groupObjectByType, sortObject } from '@/helpers/transformations'
import { Dishes } from '@/constantes/restaurant'

const { fetchData, response } = useFetch()

const listRestaurants = ref<Restaurant[]>([])

export const useRestaurants = () => {
  async function getRestaurants() {
    try {
      await fetchData({ url: `${import.meta.env.VITE_API_URL}/restaurants` })
      listRestaurants.value = response.value?.data
    } catch (error) {
      console.error('error during fetch restaurants', error)
      throw error
    }
  }

  async function getRestaurantById(id: number): Promise<Restaurant | null> {
    if (!listRestaurants.value.length) await getRestaurants()
    return listRestaurants.value.filter((restaurant) => restaurant.id === id)?.[0] || null
  }

  function addIdToDish({ dishes, restaurantId }: { dishes: Dish[]; restaurantId: number }): Dish[] {
    return dishes.map((item) => {
      const id = `${restaurantId}__${item.name}__${item.type}__${item.price}`
      return { ...item, id }
    })
  }

  const orderDisplayedOnMenu = [Dishes.starter, Dishes.main, Dishes.dessert, Dishes.drink]

  function displayMenu({ dishes, restaurantId }: { dishes: Dish[]; restaurantId?: number }): Menu {
    let newDishes = dishes
    if (restaurantId) newDishes = addIdToDish({ dishes, restaurantId })
    const menuGroupedByType = groupObjectByType(newDishes, 'type')
    return sortObject(menuGroupedByType, orderDisplayedOnMenu)
  }

  return {
    addIdToDish,
    displayMenu,
    listRestaurants,
    getRestaurants,
    getRestaurantById
  }
}
