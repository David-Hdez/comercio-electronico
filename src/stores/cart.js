import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => {
        return { products: [] }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        addProduct(id) {
            this.products.push(id);
        }
    },
})
