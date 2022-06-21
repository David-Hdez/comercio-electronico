<template>
  <BasicLayout>
    <h2>Estamos en la Home</h2>
  </BasicLayout>
</template>

<script>
import BasicLayout from '../layouts/BasicLayout'
import { ref, onMounted } from 'vue'

export default {
  name: 'Home',
  components: {
    BasicLayout
  },
  setup() {
    let products = ref()

    onMounted(async () => {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/products?_sort=created_at:desc`);

        const result = await response.json()
        console.debug(result);
        products.value = result;
      } catch (error) {
        console.error(error)
      }
    })

    return { products }
  }
}
</script>
