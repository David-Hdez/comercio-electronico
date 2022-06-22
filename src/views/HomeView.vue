<template>
  <BasicLayout>
    <h1>Últimos productos</h1>
    <div class="ui grid">
      <div class="sixten wide mobile eight wide tablet four wide computer column" v-for="product in products"
        :key="product.id">
        <Product :product="product"/>
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from '../layouts/BasicLayout'
import { ref, onMounted } from 'vue'
import Product from '../components/Product.vue'

export default {
  name: 'Home',
  components: {
    BasicLayout, Product
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
