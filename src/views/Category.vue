<template>
  <BasicLayout>
    <div class="ui grid">
      <div class="sixten wide mobile eight wide tablet four wide computer column" v-for="product in productsData"
        :key="product.id">
        <Product :product="product" />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import Product from '../components/Product.vue';
import BasicLayout from '../layouts/BasicLayout';

export default {
  name: 'Category',
  components: {
    BasicLayout,
    Product
  },
  setup() {
    const route = useRoute();
    let productsData = ref();

    watch(
      () => route.params.category,
      async newCategory => {
        products(newCategory);
      }
    )

    onMounted(() => {
      products(route.params.category);
    })

    /**
     * @see {@link https://router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup}
     * @see {@link https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes}
     */
    const products = async (category) => {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/products?_where[category.slug]=${category}&_sort=created_at:desc`);

        const result = await response.json();

        productsData.value = result;
      } catch (error) {
        console.error(error)
      }
    }

    return { productsData }
  }
}
</script>
