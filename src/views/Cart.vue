<template>
  <BasicLayout>
    <h1>Carrito</h1>
    <table class="ui celled table" v-if="products">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.quantity }}</td>
          <td>${{ product.price }}</td>
          <td class="product-action">
            <i class="close icon" @click="cart.removeArticle(product.id, product.price)"></i>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>Total:</td>
          <td colspan="2">${{ cart.total }}</td>
        </tr>
      </tbody>
    </table>

    <button class="ui button primary fluid" v-if="products" @click="createOrder">Generar Pedido</button>

    <h3 v-if="!products">No tienes productos en el carrito</h3>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout';
import { useCartStore } from '@/stores/cart';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

export default {
  name: 'Cart',
  components: { BasicLayout },
  setup() {
    const router = useRouter();
    const cart = useCartStore();
    let products = ref();

    onMounted(async () => {
      await productsList();
    })

    const productsList = async () => {
      const response = await cart.listing();
      products.value = response;
    }

    const createOrder = async () => {
      const jwt = Cookies.get('jwt');
      const { id } = jwt_decode(jwt);
      const order = {
        users_permissions_user: id,
        totalPayment: cart.total,
        detail: products.value
      }

      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
        });

        const result = await response.json();

        cart.products = [];

        router.push('/ordenes');

        return result;
      } catch (error) {
        console.error(error);
        return;
      }
    }

    cart.$onAction(
      ({
        name, // name of the action
        store, // store instance, same as `someStore`
        args, // array of parameters passed to the action
        after, // hook after the action returns or resolves
        onError, // hook if the action throws or rejects
      }) => {
        const startTime = Date.now()

        if (name == 'removeArticle') {
          productsList()
        }

        // this will trigger if the action throws or returns a promise that rejects
        onError((error) => {
          console.warn(
            `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
          )
        })
      }
    )

    return { products, cart, createOrder }
  }
}
</script>

<style lang="scss" scoped>
.product-action {
  text-align: center;
  cursor: pointer;
}
</style>
