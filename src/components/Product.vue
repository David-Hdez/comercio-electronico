<template>
    <p>{{ product.name }}</p>
</template>

<script>
export default {
    name: 'Product',
    props: {
        product: Object
    }
}
</script>
