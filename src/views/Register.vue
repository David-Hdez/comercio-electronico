<template>
    <BasicLayout>
        <h2>Estamos en la Register</h2>
        <router-link to="/iniciar-sesion">Iniciar sesión</router-link>
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
