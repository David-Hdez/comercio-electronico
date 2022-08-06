<template>
    <div class="cart" :class="{ open: cart.open }">
        <h1>Carrito</h1>
        <button>Cerrar</button>
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cart'

export default {
    name: 'Cart',
    setup() {
        const cart = useCartStore();

        function shrink() {
            cart.close();
        }

        return { cart }
    }
}
</script>

<style scoped lang="scss">
.cart {
    position: fixed;
    right: 0;
    top: 0;
    width: 400px;
    height: 100vh;
    background-color: #fff;
    box-shadow: 0px 0px 26px 5px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: translateX(150%);

    &.open {
        transform: translateX(0);
    }
}
</style>
