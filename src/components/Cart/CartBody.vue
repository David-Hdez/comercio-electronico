<template>
    <div class="cart-body" v-if="products">
        <div class="product" v-for="product in products" :key="product.id">
            <img :src="apiUrl + product.logo.url" :alt="product.name" class="ui image fluid">
            <div class="info">
                <p>{{ product.name }}</p>
                <div class="price">
                    <p>${{ product.price }}</p>
                    <div class="quantity">
                        <button class="ui button primary" size="large"
                            @click="increaseProductCart(product.id)">+</button>
                        <p>{{ product.quantity }}</p>
                        <button class="ui button primary" size="large">-</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cart';

export default {
    name: 'CartBody',
    props: {
        products: Array
    },
    setup() {
        const apiUrl = process.env.VUE_APP_API_URL;
        const cart = useCartStore();

        const increaseProductCart = (id) => {
            cart.addProduct(id);
        }

        return { apiUrl, increaseProductCart }
    }
}
</script>

<style scoped lang="scss">
.cart-body {
    padding: 20px 10px;
    overflow-y: scroll;
    height: calc(100vh - 50px - 90px);

    &::-webkit-scrollbar {
        display: none;
    }

    .product {
        display: flex;

        .ui.image.fluid {
            width: 100px !important;
        }

        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
        }

        .price {
            display: flex;
            justify-content: space-between;

            p {
                margin: 0;
            }
        }

        .quantity {
            display: flex;
            align-items: center;

            p {
                margin: 0 10px;
            }

            button {
                padding: 4px 10px;
            }
        }
    }
}
</style>
