<template>
    <BasicLayout>
        <h2>Estamos en Login</h2>
        <router-link to="/registro">Crear cuenta</router-link>
    </BasicLayout>
</template>

<script>
import BasicLayout from '../layouts/BasicLayout'

export default {
    name: 'Login',
    components: {
        BasicLayout
    }
}
</script>
