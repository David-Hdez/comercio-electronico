<template>
    <div class="ui card product">
        <div class="image marco">
            <img :src="api_url + product.logo.url" :alt="product.name" class="logo">
        </div>
        <div class="content">
            <div class="header">{{ product.name }}</div>
            <div class="description">${{ product.price }}</div>
        </div>
        <div class="ui button primary">Comprar</div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'Product',
    props: {
        product: Object
    },
    setup(props) {
        const api_url = ref(process.env.VUE_APP_API_URL);

        return { api_url }
    }
}
</script>

<style scoped lang="scss">
.product {
    &:hover {
        .ui.button {
            min-height: 36px;
        }
    }

    .ui.button {
        max-height: 0;
        min-height: 0;
        overflow: hidden;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: min-height 0.6s ease;
    }
}

.marco {
    height: 150px;
}

.logo {
    max-height: 100%;
    max-width: 100%;
}
</style>
