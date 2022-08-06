<template>
    <div class="cart-dimmer" :class="{ open: cart.open }" @click="shrink" />
    <div class="cart" :class="{ open: cart.open }">
        <h1>Carrito</h1>
        <button @click="shrink">Cerrar</button>
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

        return { cart, shrink }
    }
}
</script>

<style scoped lang="scss">
.cart-dimmer {
    opacity: 0;
    transition: transform 0.5 ease;

    &.open {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.7;
    }
}

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
    transition: transform 0.9s ease;
    transform: translateX(150%);

    &.open {
        transform: translateX(0);
    }
}
</style>
