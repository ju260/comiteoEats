import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ShippingForm from '@/components/Shipping/shipping.vue'

describe('Given ShippingForm', () => {
  it('Then renders all input fields', async () => {
    const wrapper = mount(ShippingForm)
    await wrapper.vm.$nextTick()
    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(5)
  })
})
