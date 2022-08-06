<template>
    <div class="cart-dimmer" :class="{ open: cart.open }" @click="shrink" />
    <div class="cart" :class="{ open: cart.open }">
        <div>
            <CartHeader :shrink="shrink" />
            <CartBody :products="products" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import CartHeader from './CartHeader';
import CartBody from './CartBody'

export default {
    name: 'Cart',
    components: {
        CartHeader,
        CartBody
    },
    setup() {
        const cart = useCartStore();
        let products = ref();

        function shrink() {
            cart.close();
        }

        async function productsList() {
            const response = await cart.listing();
            products.value = response;
        }

        cart.$onAction(
            ({
                name, // name of the action
                store, // store instance, same as `someStore`
                args, // array of parameters passed to the action
                after, // hook after the action returns or resolves
                onError, // hook if the action throws or rejects
            }) => {
                if (name == 'show') {
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

        return { cart, shrink, products }
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
