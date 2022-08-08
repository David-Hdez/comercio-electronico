<template>
  <BasicLayout>
    <h1>Mis pedidos</h1>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import BasicLayout from '../layouts/BasicLayout';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

export default {
  name: 'Orders',
  components: { BasicLayout },
  setup() {
    const orders = ref();

    onMounted(async () => {
      const jwt = Cookies.get('jwt');
      const { id } = jwt_decode(jwt);

      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/orders?_where[users_permissions_user]=${id}&_sort=created_at:desc`);

        const result = await response.json();

        orders.value = result;
      } catch (error) {
        console.error(error);
      }
    })

    return { orders }
  }
}
</script>

<style lang="scss" scoped>
.product-action {
  text-align: center;
  cursor: pointer;
}
</style>
