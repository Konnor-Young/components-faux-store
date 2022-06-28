const API_URL = "https://fakestoreapi.com";

Vue.component ('product', {
    props: [
        "cart",
        "item"
    ],
    template: `<div class="product-holder">
                    <img class="product-image" v-bind:src="item.image">
                    <div class="item-description">
                        <h1>{{ item.title }}</h1>
                        <p>{{ item.description }}</p>
                        <h2>$ {{ item.price }}</h2>
                        <button v-on:click="addToCart(item)">Add To Cart</button>
                    </div>
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
        "money",
        "buy"
    ],
    template: `<div class="cart-container">
                    <div class="product-holder" v-for="(item, index) in cart">
                        <img class="product-image" v-bind:src="item.image">
                        <div class="item-description">
                            <h1>{{ item.title }}</h1>
                            <h2>$ {{ item.price }}</h2>
                            <button v-on:click="removeFromCart(index)">Remove</button>
                        </div>
                    </div>
                    <h2>Total: $ {{money}}</h2>
                    <button v-on:click="buy">Proceed to Checkout</button>
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
Vue.component ('credit-card-page', {
    props: [
        "money"
    ],
    template: `<div id="credit-card-grid">
                    <div class="total-area">
                        <h3>Items in cart: $ {{money}}</h3>
                        <h3>Tax: $ {{tax}}</h3>
                        <label>How many miles away do you live?</label>
                        <input type="number" v-model="distance">
                        <h3>Shipping: $ {{shipping}}</h3>
                        <h2>Total: $ {{total}}</h2>
                    </div>
                    <div class="credit-info">
                        <h3>credit card here</h3>
                    </div>
                </div>`,
    data: function () {return{distance: 0}},
    methods: {},
    computed: {
        tax: function(){
            let taxAmount = this.money * .08;
            return Math.round(taxAmount * 100)/100;
        },
        shipping: function(){
            let shippingAmount = this.distance * .035;
            return Math.round(shippingAmount * 100)/100;
        },
        total: function(){
            let totalAmount = this.money + this.tax + this.shipping;
            return Math.round(totalAmount * 100)/100;
        }
    }
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
        },
        checkoutPage: function () {
            this.showPage = 'payment';
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
            return Math.round(price*100)/100;
        }
    }
});