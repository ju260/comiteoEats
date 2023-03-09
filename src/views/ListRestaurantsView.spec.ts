import ListRestaurantsView from '@/views/ListRestaurantsView.vue'
import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { useRestaurants } from '@/composables/useRestaurants'
import listRestaurants from './__tests__/fixtures'

const getRestaurants = vi.fn()
vi.mock('@/composables/useRestaurants', () => ({
  useRestaurants: vi.fn()
}))

let wrapper

describe('Given ListRestaurantsView', () => {
  describe('When component is mounted', () => {
    beforeEach(async () => {
      useRestaurants.mockReturnValue({
        getRestaurants,
        listRestaurants
      })
      wrapper = shallowMount(ListRestaurantsView)
      await wrapper.vm.$nextTick()
    })
    it('Then it should call getRestaurants', () => {
      expect(getRestaurants).toHaveBeenCalled()
    })
    it('Then it should show ListRestaurants component if listRestaurants not null', () => {
      expect(wrapper.find('[data-testcomponent]').exists()).toBe(true)
    })
    it('Then it should hide ListRestaurants component if listRestaurants null', () => {
      useRestaurants.mockReturnValue({
        getRestaurants,
        listRestaurants: null
      })
      wrapper = shallowMount(ListRestaurantsView)
      expect(wrapper.find('[data-testcomponent]').exists()).toBe(false)
    })
  })
})
