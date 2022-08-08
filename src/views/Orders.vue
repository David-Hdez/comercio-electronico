<template>
  <BasicLayout>
    <h1>Mis pedidos</h1>

    <h3 v-if="!orders">No tienes pedidos</h3>

    <template v-if="orders">
      <div class="orders" v-for="order in orders" :key="order.id">
        <div class="header-order">
          <span class="date-order">{{ formatDate(order.created_at) }}</span>
          <p>Orden {{ order.id }}</p>
          <p>Total ${{ order.totalPayment }}</p>
        </div>

        <div class="products">
          <div class="product" v-for="product in order.detail" :key="product.id">
            <div>
              <img :src="api_url + product.logo.url" :alt="product.name" class="ui image">
              <p>{{ product.name }}</p>
            </div>
            <div>
              {{ product.quantity }} x ${{ product.price }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import BasicLayout from '../layouts/BasicLayout';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import moment from 'moment';

export default {
  name: 'Orders',
  components: { BasicLayout },
  setup() {
    const orders = ref();
    const api_url = process.env.VUE_APP_API_URL;

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

    const formatDate = (order) => {
      return moment(order).format('L [a las] LT')
    }

    return { orders, formatDate, api_url }
  }
}
</script>

<style lang="scss" scoped>
.orders {
  border: 1px solid #000;
  margin-bottom: 20px;
  margin-top: 40px;

  .header-order {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    p {
      margin: 0;
    }

    span {
      position: absolute;
      top: -20px;
      left: 0;
      font-size: 12px;
    }
  }

  .products {
    border-top: 1px solid #000;

    .product {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 30px;

      /* div at the first level */
      >div {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .ui.image {
      width: 50px;
      padding: 2px;
    }
  }
}
</style>
