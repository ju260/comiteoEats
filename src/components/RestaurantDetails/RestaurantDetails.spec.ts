import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import RestaurantDetails from '@/components/RestaurantDetails/RestaurantDetails.vue'
import listMenu from '@/components/RestaurantDetails/_subs/listMenu.vue'

describe('Given RestaurantDetails component', () => {
  const restaurant = {
    id: 1,
    name: 'Test Restaurant',
    street_address: '123 avenue foch',
    zip_code: '12345',
    city: 'Test City',
    dishes: {
      data: [
        {
          id: 1,
          name: 'Test Dish',
          description: 'A delicious test dish',
          price: 10.99
        }
      ]
    }
  }

  it('Then should renders the restaurant name', () => {
    const wrapper = shallowMount(RestaurantDetails, {
      props: {
        restaurant
      }
    })
    const name = wrapper.find('[data-testid="restaurantName"]')
    expect(name.text()).toBe('Test Restaurant')
  })

  it('Then should renders the restaurant city', () => {
    const wrapper = shallowMount(RestaurantDetails, {
      props: {
        restaurant
      }
    })
    const city = wrapper.find('[data-testid="restaurantCity"]')
    expect(city.text()).toBe('123 avenue foch12345 Test City')
  })

  it('Then should renders the menu', () => {
    const wrapper = shallowMount(RestaurantDetails, {
      props: {
        restaurant
      }
    })
    const menu = wrapper.findComponent(listMenu)
    expect(menu.exists()).toBe(true)
  })
})
