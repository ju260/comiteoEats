<script setup lang="ts">
import { ref } from 'vue'
import useCart from '@/composables/useCart'
import dayjs from 'dayjs'
import { formatPrice } from '@/helpers/transformations'
const { orderSummary } = useCart()

console.log('orderSummary ', orderSummary)
const creationOrderTime = dayjs(orderSummary.value.created_at)
const deliveryEstimationTime = dayjs(orderSummary.value.delivery_eta)
const diffBetweenTimes = ref(deliveryEstimationTime.diff(creationOrderTime, 'minute'))
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="mb-5 text-3xl font-bold" data-testid="restaurantName">Récapitulatif</h1>
    <div class="grid gap-y-4 grid-cols-1">
      <p>
        <span class="text-sm">nom: </span>
        <span class="font-bold text-sky-900">{{ orderSummary.last_name }}</span>
      </p>
      <p>
        <span class="text-sm">prénom: </span>
        <span class="font-bold text-sky-900">{{ orderSummary.first_name }}</span>
      </p>
      <p>
        <span class="text-sm">Adresse de livraison: </span>
        <span class="font-bold text-sky-900">{{ orderSummary.delivery_street_address }} <br/>{{ orderSummary.delivery_zip_code }}
          {{ orderSummary.delivery_city }}</span>
      </p>
      <div>
        <span class="text-sm">list des plats: </span>
        <ul>
          <li
            v-for="item in orderSummary?.items?.data"
            :key="`${item.price}${item.quantity}${item.name}`"
          >
            <span class="font-bold text-sky-900"
              >{{ item.quantity }}X {{ item.name }}</span
            >)
          </li>
        </ul>
      </div>
      <p>
        <span class="text-sm">Sous-total des plats: </span
        ><span class="font-bold text-sky-900">{{ formatPrice(orderSummary.total_amount) }}</span>
      </p>
      <p>
        <span class="text-sm">Montant des frais de livraison: </span
        ><span class="font-bold text-sky-900">{{ formatPrice(orderSummary.delivery_fee) }}</span>
      </p>
      <p>
        <span class="text-sm">Montant total de la commande: </span
        ><span class="font-bold text-sky-900">{{ formatPrice(orderSummary.total_amount) }}</span>
      </p>
      <p>
        <span class="text-sm">livraison prévu à: </span
        ><span class="font-bold text-sky-900">{{
          dayjs(orderSummary.delivery_eta).locale('fr').format('DD/MM/YYYY H[h]mm')
        }}</span>
      </p>
      <p>
        <span class="text-sm">temps d'attente estimé pour la livraison: </span>
        <span class="font-bold text-sky-900">{{ diffBetweenTimes }} minutes</span>
      </p>
    </div>
  </div>
</template>
