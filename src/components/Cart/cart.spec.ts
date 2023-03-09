import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ListMenu from '@/components/RestaurantDetails/_subs/listMenu.vue'
import { useRestaurants } from '@/composables/useRestaurants'
import Cart from '@/components/Cart/cart.vue'

vi.mock('@/composables/useRestaurants', () => ({
  useRestaurants: vi.fn()
}))

describe('Given Cart', () => {
    describe('When component is mounted with cartItems not empty', () => {
      let wrapper
  
      const displayMenu = vi.fn(() => [
        { type: 'starter', items: [{ name: 'Salad', price: 8 }] },
        { type: 'main', items: [{ name: 'Pizza', price: 12 }] },
        { type: 'dessert', items: [{ name: 'Ice Cream', price: 5 }] }
      ])
  
      beforeEach(() => {
        displayMenu.mockClear()
  
        useRestaurants.mockReturnValue({
          displayMenu
        })
  
        const props: Props = {
          cartItems: [
            { name: 'Salad', price: 8, type: 'starter' },
            { name: 'Pizza', price: 12, type: 'main' },
            { name: 'Ice Cream', price: 5, type: 'dessert' }
          ]
        }
        wrapper = mount(Cart, { props })
      })
      it('Then it should call displayMenu', () => {
        expect(displayMenu).toHaveBeenCalledWith({ dishes: wrapper.props().cartItems })
      })
      it('Then it should display the correct menu', () => {
        expect(wrapper.findComponent(ListMenu).props().menu).toEqual([
          { type: 'starter', items: [{ name: 'Salad', price: 8 }] },
          { type: 'main', items: [{ name: 'Pizza', price: 12 }] },
          { type: 'dessert', items: [{ name: 'Ice Cream', price: 5 }] }
        ])
      })
    })
    describe('When menu is null', () => {
      let wrapper
  
      beforeEach(() => {
        useRestaurants.mockReturnValue({
          displayMenu: vi.fn(() => null)
        })
  
        const props: Props = {
          cartItems: []
        }
        wrapper = mount(Cart, { props })
      })
  
      it('Then it should not display listMenu', () => {
        expect(wrapper.findComponent(ListMenu).exists()).toBe(false)
      })
    })
  })