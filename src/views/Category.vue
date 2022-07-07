<template>
  <BasicLayout>
    <h1>This is Category</h1>
  </BasicLayout>
</template>

<script>
import { onMounted } from 'vue'
import BasicLayout from '../layouts/BasicLayout'

export default {
  name: 'Category',
  components: {
    BasicLayout
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
        console.debug('react to route changes', toParams)
      }
    )
  },
  setup() {
    onMounted(async () => {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/products?_where[category.slug]=cereales&_sort=created_at:desc`);

        const result = await response.json()

        console.debug('by category', result);
      } catch (error) {
        console.error(error)
      }
    })
  }
}
</script>
