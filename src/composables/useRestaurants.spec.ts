import { useRestaurants } from '@/composables/useRestaurants'
import { describe, it, expect } from 'vitest'

describe('useToDo', () => {
  let list
  let addIdToDish
  let getRestaurantById

  function init() {
    const { listRestaurants, addIdToDish: add, getRestaurantById: getRestaurant } = useRestaurants()
    list = listRestaurants
    addIdToDish = add
    getRestaurantById = getRestaurant
  }

  describe('When addIdToDish is called', () => {
    beforeEach(() => {
      init()
    })
    it('adds an id to each dish based on restaurant id, name, type, and price', () => {
      const dishes = [
        { name: 'Dish A', type: 'starter', price: 10 },
        { name: 'Dish B', type: 'main', price: 20 },
        { name: 'Dish C', type: 'dessert', price: 5 }
      ]
      const restaurantId = 1
      const expectedDishes = [
        { name: 'Dish A', type: 'starter', price: 10, id: '1__Dish A__starter__10' },
        { name: 'Dish B', type: 'main', price: 20, id: '1__Dish B__main__20' },
        { name: 'Dish C', type: 'dessert', price: 5, id: '1__Dish C__dessert__5' }
      ]
      const result = addIdToDish({ dishes, restaurantId })
      expect(result).toEqual(expectedDishes)
    })
  })

  describe('getRestaurantById', () => {
    let restaurants
    restaurants = useRestaurants()
    
    beforeEach(() => {
      init()
    })
    it('returns a restaurant with matching id', async () => {
      restaurants.listRestaurants.value = [
        { id: 1, name: 'Restaurant A' },
        { id: 2, name: 'Restaurant B' }
      ]
      const restaurant = await getRestaurantById(1)
      expect(restaurant).toEqual({ id: 1, name: 'Restaurant A' })
    })
  })
})
