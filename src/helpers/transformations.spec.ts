import { groupObjectByType, sortObject, formatPrice } from '@/helpers/transformations.js'
import { describe, it, expect } from 'vitest'

describe('given transformations helpers', () => {
  describe('When method groupObjectByType is used', () => {
    it('then the function should transform an object array into an object grouped by a key', () => {
      const input = [
        { name: 'Qui dolor alias adipisci.', type: 'main', price: 2798, id: '1__Qui dolor alias adipisci.__main__2798' },
        { name: 'Non labore et voluptatem.', type: 'main', price: 2019, id: '1__Non labore et voluptatem.__main__2019' },
        { name: 'Explicabo fugiat velit.', type: 'drink', price: 929, id: '1__Explicabo fugiat velit.__drink__929' },
        { name: 'Sint impedit eum in.', type: 'starter', price: 1217, id: '1__Sint impedit eum in.__starter__1217' },
        { name: 'Labore totam et.', type: 'dessert', price: 2337, id: '1__Labore totam et.__dessert__2337' },
        { name: 'Qui enim earum minima fuga.', type: 'starter', price: 2362, id: '1__Qui enim earum minima fuga.__starter__2362' }
      ]
      const expectedOutput = {
        starter: [
          {
            name: 'Sint impedit eum in.',
            type: 'starter',
            price: 1217,
            id: '1__Sint impedit eum in.__starter__1217'
          },
          {
            name: 'Qui enim earum minima fuga.',
            type: 'starter',
            price: 2362,
            id: '1__Qui enim earum minima fuga.__starter__2362'
          }
        ],
        main: [
          {
            name: 'Qui dolor alias adipisci.',
            type: 'main',
            price: 2798,
            id: '1__Qui dolor alias adipisci.__main__2798'
          },
          {
            name: 'Non labore et voluptatem.',
            type: 'main',
            price: 2019,
            id: '1__Non labore et voluptatem.__main__2019'
          }
        ],
        dessert: [
          {
            name: 'Labore totam et.',
            type: 'dessert',
            price: 2337,
            id: '1__Labore totam et.__dessert__2337'
          }
        ],
        drink: [
          {
            name: 'Explicabo fugiat velit.',
            type: 'drink',
            price: 929,
            id: '1__Explicabo fugiat velit.__drink__929'
          }
        ]
      }
      const output = groupObjectByType(input, 'type')
      expect(output).toEqual(expectedOutput)
    })
  })
})
describe('When method sortObject', () => {
  test('then it should sorts object properties by order array', () => {
    const input = {
      dessert: [
        { name: 'plat 1', type: 'type1' },
        { name: 'plat 3', type: 'type1' }
      ],
      entrée: [{ name: 'plat 2', type: 'type2' }]
    }
    const order = ['entrée', 'desserts']
    const expectedOutput = {
      entrée: [{ name: 'plat 2', type: 'type2' }],
      dessert: [
        { name: 'plat 1', type: 'type1' },
        { name: 'plat 3', type: 'type1' }
      ]
    }
    const output = sortObject(input, order)
    expect(output).toEqual(expectedOutput)
  })
})

describe('formatPrice', () => {
  test('formats a price in centimes to a string with € symbol', () => {
    const input = 999
    const expectedOutput = '9.99 €'
    const output = formatPrice(input)
    expect(output).toEqual(expectedOutput)
  })
})
