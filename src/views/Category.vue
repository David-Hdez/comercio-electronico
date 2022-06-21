<template>
  <BasicLayout>
    <h1>This is Category</h1>
  </BasicLayout>
</template>

<script>
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
        console.debug(toParams)
      }
    )
  },
}
</script>
