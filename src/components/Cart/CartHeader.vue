<template>
    <div class="cart-header">
        <p>Carrito</p>
        <i class="close icon" @click="shrink" />
    </div>
</template>

<script>
export default {
    name: 'CartHeader',
    props: {
        shrink: Function
    }
}
</script>

<style scoped lang="scss">
.cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    border-bottom: 1px solid #000;
    padding: 10px 20px;

    p,
    i {
        margin: 0;
    }

    i:hover {
        cursor: pointer;
    }
}
</style>
