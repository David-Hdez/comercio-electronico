<template>
    <div class="ui secondary menu">
        <div class="ui container">
            <div class="left menu">
                <router-link class="item" to="/">
                    <img class="iu small image" src="../assets/logo.png" alt="Comercio">
                    <p>Categorias...</p>
                </router-link>
            </div>
            <div class="right menu">
                <router-link class="item" to="/iniciar-sesion" v-if="!jwt">Iniciar sesión</router-link>
                <template v-if="jwt">
                    <router-link class="item" to="/orden">Pedidos</router-link>
                    <span class="ui item cart">
                        <i class="shopping cart icon"></i>
                    </span>
                    <span class="ui item logout">
                        <i class="sign-out icon"></i>
                    </span>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'Menu',
    setup() {
        const jwt = Cookies.get('jwt');

        return { jwt }
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
