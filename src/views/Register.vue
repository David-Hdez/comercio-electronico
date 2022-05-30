<template>
    <BasicLayout>
        <div class="register">
            <h2>Registro de usuario</h2>
            <form class="ui form" @submit.prevent="store">
                <div class="field">
                    <input type="text" placeholder="Nombre de usuario" v-model="user.name"
                        :class="{ error: validations.name }">
                </div>
                <div class="field">
                    <input type="email" placeholder="Correo electrónico" v-model="user.email"
                        :class="{ error: validations.email }">
                </div>
                <div class="field">
                    <input type="password" placeholder="Contraseña" v-model="user.password"
                        :class="{ error: validations.password }">
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
import * as yup from 'yup';

export default {
    name: 'Register',
    components: {
        BasicLayout
    },
    setup() {
        let user = ref({});
        /** yup validations */
        let validations = ref({});
        /**
         * Form validation
         * 
         * @see {@link https://www.npmjs.com/package/yup} for further information.
         */
        let schema = yup.object().shape({
            name: yup.string().required(true),
            email: yup.string().email(true).required(true),
            password: yup.string().required(true),
        });

        const store = async () => {
            validations.value = {};

            try {
                await schema.validate(user.value, { abortEarly: false })
            } catch (error) {
                error.inner.forEach((element) => {
                    validations.value[element.path] = element.message;
                });
            }
        }

        return {
            user, store, validations
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
