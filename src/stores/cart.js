import { uniqBy, countBy } from 'lodash';
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            products: [],
            open: false
        }
    },
    actions: {
        addProduct(id) {
            this.products.push(id);
        },
        async show() {
            this.open = true;
            let products_details = [];

            try {
                for await (const product of this.products) {
                    const response = await fetch(`${process.env.VUE_APP_API_URL}/products/${product}`);
                    const result = await response.json();

                    products_details.push(result);
                }

                const product_count = countBy(products_details, (product) => {
                    return product.name
                });
                const combined = uniqBy(products_details, (product) => {
                    const productTemp = product;
                    // Count product in cart
                    productTemp.quantity = product_count[product.name];

                    return productTemp.name
                })

                return combined
            } catch (error) {
                console.error(error);
                return
            }
        },
        close() {
            this.open = false;
        }
    },
})
