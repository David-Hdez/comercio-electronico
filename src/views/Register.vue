<template>
    <BasicLayout>
        <div class="register">
            <h2>Registro de usuario</h2>
            <form class="ui form">
                <div class="field">
                    <input type="text" placeholder="Nombre de usuario">
                </div>
                <div class="field">
                    <input type="email" placeholder="Correo electrónico">
                </div>
                <div class="field">
                    <input type="password" placeholder="Contraseña">
                </div>
                <button type="submit" class="ui button fluid primary">Crear usuario</button>
            </form>

            <router-link to="/iniciar-sesion">Iniciar sesión</router-link>
        </div>
    </BasicLayout>
</template>

<script>
import BasicLayout from '../layouts/BasicLayout'

export default {
    name: 'Register',
    components: {
        BasicLayout
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
