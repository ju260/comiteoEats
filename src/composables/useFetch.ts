import { ref } from 'vue'
const response = ref(null)
export default () => {
  const isFetching = ref(false)

  const fetchData = async ({ url, options }: { url: string; options?: object }) => {
    isFetching.value = true
    try {
      const res = await fetch(url, options)
      response.value = await res.json()
    } catch (errors) {
      console.error('error during fetch datas', errors)
      throw errors
    }
  }
  return { response, isFetching, fetchData }
}
