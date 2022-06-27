const API_URL = "https://fakestoreapi.com";

Vue.component ('product', {
    props: [
        "cart",
        "item"
    ],
    template: `<div class="product-holder">
                    <img class="product-image" v-bind:src="item.image">
                    {{ item.title }}
                    {{ item.description }}
                    {{ item.price }}
                    <button v-on:click="addToCart(item)">Add To Cart</button>
                </div>`,
    data: function (){
        return {}
    },
    methods: {
        addToCart: function (item) {
            this.cart.push(item)
        }
    }
});
Vue.component ('view-customer-cart', {
    props: [
        "cart",
        "money"
    ],
    template: `<div class="cart-container">
                    <div class="cart-item" v-for="(item, index) in cart">
                        <img class="product-image" v-bind:src="item.image">
                        {{ item.title }}
                        {{ item.price }}
                        <button v-on:click="removeFromCart(index)">Remove</button>
                    </div>
                    <h2>Total: $ {{money}}</h2>
                </div>`,
    data: function () {
        return {}
    },
    methods: {
        removeFromCart: function (index) {
            this.cart.splice(index, 1);
        }
    },
});

var app = new Vue ({
    el: "#app",
    data: {
        showPage: 'welcome',
        storeFilter: 'none',
        list: [],
        customerCart: [],
        menClothingFilter : [],
        jeweleryFilter: [],
        electronicsFilter: [],
        womenClothingFilter: [],
    },
    methods: {
        enterStore: function () {
            this.showPage = 'store';
        },
        viewCart: function () {
            this.showPage = 'cart';
        }
    },
    created: async function () {
        let response = await fetch(API_URL + "/products");
        let data = await response.json();
        console.log(data);
        this.list = data;
        this.list.forEach((item) => {
            let tempItem = item;
            if(tempItem.category == "jewelery"){
                this.jeweleryFilter.push(tempItem);
            }if(tempItem.category == "electronics"){
                this.electronicsFilter.push(tempItem);
            }if(tempItem.category == "men's clothing"){
                this.menClothingFilter.push(tempItem);
            }if(tempItem.category == "women's clothing"){
                this.womenClothingFilter.push(tempItem);
            }
        });
    },
    computed: {
        customerTotal: function () {
            let price = 0;
            this.customerCart.forEach((item)=>{
                price += item.price;
            })
            return price;
        }
    }
});