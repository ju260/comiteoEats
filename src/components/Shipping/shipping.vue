<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import useFetch from '@/composables/useFetch'
import type { DeliveryMethod } from '@/components/types/types'
import * as Yup from 'yup'

const { handleSubmit, controlledValues, meta } = useForm()

const { fetchData, response } = useFetch()

const deliveryMethods = ref<DeliveryMethod[]>([])

async function getDeliveryMethods() {
  await fetchData({ url: `${import.meta.env.VITE_API_URL}/delivery_methods` })

  deliveryMethods.value = selectBikeByDefault(response.value)
}

function selectBikeByDefault(deliveryMethods: DeliveryMethod[]) {
  const bikeDeliveryMethod = deliveryMethods.find((method) => method.value === 'bike')
  if (bikeDeliveryMethod) meta.value.initialValues.deliveryMethods = 'bike'
  return deliveryMethods
}

onMounted(() => {
  getDeliveryMethods()
})
const schema = {
  fields: [
    {
      label: 'Prénom:',
      name: 'first_name',
      as: 'input',
      type: 'text',
      rules: Yup.string().required()
    },
    {
      label: 'Nom:',
      name: 'last_name',
      as: 'input',
      type: 'text',
      rules: Yup.string().required()
    },
    {
      label: 'Adresse:',
      name: 'delivery_street_address',
      as: 'input',
      type: 'text',
      rules: Yup.string().required()
    },
    {
      label: 'Code postal:',
      name: 'delivery_zip_code',
      as: 'input',
      type: 'number',
      rules: Yup.string().required()
    },
    {
      label: 'Ville:',
      name: 'delivery_city',
      as: 'input',
      type: 'text',
      rules: Yup.string().required()
    }
  ]
}
const emit = defineEmits(['submitShippingForm'])

const onSubmit = handleSubmit(async () => {
  emit('submitShippingForm', controlledValues.value)
})
</script>

<template>
  <h2 class="text-xl font-bold">Livraison</h2>
  <form @submit.prevent="onSubmit" class="w-full max-w-lg">
    <div
      class="mb-6 md:flex md:items-center"
      v-for="{ as, name, label, ...attrs } in schema.fields"
      :key="name"
    >
      <div class="md:w-1/3">
        <label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right" :for="name"
          ><span class="after:ml-0.5 after:text-red-500 after:content-['*']">{{
            label
          }}</span></label
        >
      </div>
      <div class="md:w-2/3">
        <Field
          data-testid="fieldName"
          class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
          :as="as"
          :id="name"
          :name="name"
          v-bind="attrs"
        />
        <ErrorMessage data-testid="errorFieldName" :name="name" />
      </div>
    </div>
    <template v-if="response?.length">
      <div class="md:items-top mb-6 md:flex">
        <div class="md:w-1/3">
          <div class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
            modes de<br />
            livraison
          </div>
        </div>
        <div class="md:w-2/3">
          <div
            class="mb-3 md:flex md:items-center"
            v-for="{ value, label } in deliveryMethods"
            :key="value"
          >
            <Field
              class="mr-3"
              name="deliveryMethods"
              :id="value"
              type="radio"
              :value="value"
            />
            <label :for="value">{{ label }}</label>
          </div>
        </div>
      </div>
    </template>
    <button
      class="mt-4 rounded-full bg-sky-500 px-4 py-1 text-sm font-semibold text-white opacity-100 shadow-sm hover:bg-sky-600"
      type="submit"
    >
      Submit
    </button>
  </form>
</template>
