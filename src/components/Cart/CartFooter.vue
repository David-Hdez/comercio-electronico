<template>
    <div class="cart-footer">
        <p>Total: ${{ cart.total }}</p>

        <router-link to="/carrito">
            <button class="ui button primary fluid btn-buy" @click="shrink">Comprar</button>
        </router-link>
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cart';

export default {
    name: 'CartFooter',
    setup() {
        const cart = useCartStore();

        const shrink = () => {
            cart.close();
        }

        return {
            cart, shrink
        }
    }
}
</script>

<style scoped lang="scss">
.cart-footer {
    padding: 10px;
}
</style>
