import Restaurant from '@/components/Restaurant/Restaurant.vue'
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

describe('Given Restaurant', () => {
  const restaurant = {
    name: 'Test Restaurant',
    city: 'Test City',
    ratings_average: 4.5,
    category: 'Test Category'
  }

  describe('When a restaurant is displayed', () => {
    it('Then it should fetch restaurants', async () => {
      const wrapper = shallowMount(Restaurant, {
        propsData: {
          restaurant: restaurant
        }
      })

      const name = wrapper.find('[data-testid="restaurantName"]')
      expect(name.text()).toBe(restaurant.name)

      const city = wrapper.find('[data-testid="restaurantCity"]')
      expect(city.text()).toBe(restaurant.city)

      const rating = wrapper.find('[data-testid="restaurantRating"]')
      expect(rating.text()).toBe(restaurant.ratings_average.toString())

      const category = wrapper.find('[data-testid="restaurantCategory"]')
      expect(category.text()).toBe(restaurant.category)
    })
  })
})
