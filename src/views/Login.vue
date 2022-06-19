<template>
    <BasicLayout>
        <div class="login">
            <h2>Iniciar sesión</h2>
            <form class="form ui" @submit.prevent="login">
                <div class="field">
                    <input type="email" placeholder="Correo" v-model="user.identifier"
                        :class="{ error: validations.identifier }">
                </div>
                <div class="field">
                    <input type="password" placeholder="Contraseña" v-model="user.password"
                        :class="{ error: validations.password }">
                </div>
                <button type="submit" class="ui button fluid primary" :class="{ loading }">Entrar</button>
                <div v-if="api_error?.show" class="ui negative message">
                    <i class="close icon"></i>
                    <div class="header">
                        Se ha producido un error
                    </div>
                    <p>{{ api_error.description }}</p>
                </div>
            </form>

            <router-link to="/registro">Crear cuenta</router-link>
        </div>
    </BasicLayout>
</template>

<script>
import { ref, reactive } from 'vue'
import BasicLayout from '../layouts/BasicLayout'
import * as yup from 'yup';
import { loginApi } from '../api/user'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export default {
    name: 'Login',
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
            identifier: yup.string().email().required(),
            password: yup.string().required(),
        });
        let loading = ref(false);
        let api_error = reactive({
            show: false,
            description: 'Inténtelo más tarde'
        });
        const router = useRouter()

        const login = async () => {
            validations.value = {};
            loading.value = true;

            try {
                await schema.validate(user.value, { abortEarly: false });

                try {
                    const response = await loginApi(user.value);

                    if (!response?.jwt) {
                        api_error.description = 'Correo o contraseña incorrectos';

                        throw 'Correo o contraseña incorrectos'
                    }

                    Cookies.set('jwt', response.jwt)

                    router.push('/');
                } catch (error) {
                    console.error(error)

                    api_error.show = true;
                }
            } catch (error) {
                console.error(error);

                error.inner.forEach((element) => {
                    validations.value[element.path] = element.message;
                });

                api_error.description = 'Ingrese los datos requeridos';

                api_error.show = true;
            }

            loading.value = false;
        }

        return {
            user, login, validations, loading, api_error
        }
    }
}
</script>

<style scoped lang="scss">
.login {
    text-align: center;

    >h2 {
        margin: 50px 0 30px 0;
    }

    .ui.form {
        max-width: 300px !important;
        margin: 0 auto;
        margin-bottom: 10px;

        input.error {
            border-color: #faa;
            background-color: #ffeded;
        }
    }
}
</style>
