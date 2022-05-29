<template>
    <BasicLayout>
        <div class="register">
            <h2>Registro de usuario</h2>
            <form class="ui form" @submit.prevent="store">
                <div class="field">
                    <input type="text" placeholder="Nombre de usuario" v-model="user.name">
                </div>
                <div class="field">
                    <input type="email" placeholder="Correo electrónico" v-model="user.email">
                </div>
                <div class="field">
                    <input type="password" placeholder="Contraseña" v-model="user.password">
                </div>
                <button type="submit" class="ui button fluid primary">Crear usuario</button>
            </form>

            <router-link to="/iniciar-sesion">Iniciar sesión</router-link>
        </div>
    </BasicLayout>
</template>

<script>
import { ref } from 'vue'
import BasicLayout from '../layouts/BasicLayout'

export default {
    name: 'Register',
    components: {
        BasicLayout
    },
    setup() {
        let user = ref({});

        const store = () => {
            console.log('To store');
            console.debug(user.value);
        }

        return {
            user, store
        }
    }
}
</script>

<style scoped lang="scss">
.register {
    text-align: center;

    >h2 {
        margin: 50px 0 30px 0;
    }

    .ui.form {
        max-width: 300px !important;
        margin: 0 auto;
        margin-bottom: 10px;
    }

    input.error {
        border-color: #faa;
        background-color: #ffeded;
    }
}
</style>
