<template>
    <div class="ui secondary menu">
        <div class="ui container">
            <div class="left menu">
                <router-link class="item" to="/">
                    <img class="iu small image" src="../assets/logo.png" alt="Comercio">
                    <template v-for="category in categories" :key="category.id">
                        <router-link class="item" :to="category.slug">{{ category.title }}</router-link>
                    </template>
                </router-link>
            </div>
            <div class="right menu">
                <router-link class="item" to="/iniciar-sesion" v-if="!jwt">Iniciar sesión</router-link>
                <template v-if="jwt">
                    <router-link class="item" to="/orden">Pedidos</router-link>
                    <span class="ui item cart" @click="expandCart">
                        <i class="shopping cart icon"></i>
                    </span>
                    <span class="ui item logout" @click="logout">
                        <i class="sign-out icon"></i>
                    </span>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import { useCartStore } from '@/stores/cart'

export default {
    name: 'Menu',
    setup() {
        const jwt = Cookies.get('jwt');
        let categories = ref()
        const cart = useCartStore();
        let products = ref();

        const logout = () => {
            Cookies.remove('jwt');

            // Will reload the page
            location.replace('/')
        }

        async function expandCart() {
            const response = await cart.show();
            products.value = response;
        }

        onMounted(async () => {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_URL}/categories`);

                const result = await response.json()

                categories.value = result;
            } catch (error) {
                console.error(error)
            }
        })

        return { jwt, logout, categories, expandCart }
    }
}
</script>

<style lang="scss" scoped>
.ui.menu.secondary {
    background-color: #16202b;

    .item {
        color: #fff;

        &:hover {
            color: #1fa1f1;
        }
    }

    .menu.left {
        width: 50%;

        .ui.image {
            width: 40px;
        }
    }

    .menu.right {
        width: 50%;
        justify-content: flex-end;

        .logout,
        .cart {
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
