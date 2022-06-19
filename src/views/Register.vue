<template>
    <BasicLayout>
        <div class="register">
            <h2>Registro de usuario</h2>
            <div v-if="api_error?.show" class="ui negative message">
                <i class="close icon"></i>
                <div class="header">
                    Se ha producido un error
                </div>
                <p>{{ api_error.description }}</p>
            </div>
            <form class="ui form" @submit.prevent="store">
                <div class="field">
                    <input type="text" placeholder="Nombre de usuario" v-model="user.username"
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
                <button type="submit" class="ui button fluid primary" :class="{ loading }">Crear usuario</button>
            </form>

            <router-link to="/iniciar-sesion">Iniciar sesión</router-link>
        </div>
    </BasicLayout>
</template>

<script>
import { ref, reactive } from 'vue'
import BasicLayout from '../layouts/BasicLayout'
import * as yup from 'yup';
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

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
            username: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
        });
        let loading = ref(false);
        let api_error = reactive({
            show: false,
            description: 'Inténtelo más tarde'
        });
        const router = useRouter()

        const store = async () => {
            validations.value = {};
            loading.value = true;

            try {
                await schema.validate(user.value, { abortEarly: false });

                try {
                    const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/local/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user.value)
                    });

                    const result = await response.json()

                    if (!result?.jwt) {
                        throw result
                    }

                    Cookies.set('jwt', result.jwt)

                    router.push('/');
                } catch (error) {
                    console.error(error)

                    api_error.show = true;
                }
            } catch (error) {
                error.inner.forEach((element) => {
                    validations.value[element.path] = element.message;
                });
            }

            loading.value = false;
        }

        return {
            user, store, validations, loading, api_error
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

    .ui.negative.message {
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
