<template>
    <main class="main">
        <SelectSpeed></SelectSpeed>
        <section class="product-cart">
            <ul class="cart-message">
                <li class="cart-message__title">
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" class="icon" />
                    <h1>GIỎ HÀNG</h1>
                </li>
                <li v-if="goCartCheck" class="cart-message__go">
                    <a href="http://127.0.0.1:1010">{{ goCart }}</a>
                </li>
                <li v-if="messageCheck" class="cart-message__mess">
                    <a href="http://127.0.0.1:1010/signin">{{ message }}</a>
                </li>
            </ul>
            <section class="wrap-cart-list">
                <section class="cart-list" v-if="checkCartList">
                    <table>
                        <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in productAll" :key="index">
                                <td>
                                    <div>
                                        <img :src="convertImg(item.img)" alt="img-product">
                                    </div>
                                </td>
                                <td class="name-product">{{ item.name }}</td>
                                <td>{{ `${Number(item.price).toLocaleString()} VNĐ` }}</td>
                                <td>
                                    <ul class="product-quaility">
                                        <li class="minus-quaility" @click="minusQuality(item._id)">
                                            <font-awesome-icon icon="fa-solid fa-circle-minus" class="icon" />
                                        </li>
                                        <li class="show-total"><span>{{ `${getQuality(item._id)}`}}</span></li>
                                        <li class="plus-quaility" @click="plusQuality(item._id)">
                                            <font-awesome-icon icon="fa-solid fa-circle-plus" class="icon" />
                                        </li>
                                    </ul>

                                </td>
                                <td>
                                    <font-awesome-icon icon="fa-solid fa-circle-xmark" class="icon icon--delete"
                                        @click="deleteProduct(item._id)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <form action="#" class="form form--transport" v-if="checkCartList">
                    <div class="form-group">
                        <h1 class="form-title">Thông tin đơn hàng</h1>
                    </div>
                    <div class="form-group">
                        <h1 class="name-user">Tên khách hàng</h1>
                        <input type="text" v-model="order.userName">
                    </div>
                    <div class="form-group">
                        <h1 class="phone-user">Số điện thoại</h1>
                        <input type="text" v-model="order.phone" placeholder="Nhập số điện thoại(*)">
                    </div>
                    <div class="form-group">
                        <h1 class="address-user">Địa chỉ giao hàng</h1>
                        <textarea name="input-address" v-model="order.address" id="" cols="30" rows="7"
                            placeholder="Nhập địa chỉ giao hàng của bạn"></textarea>
                        <p class="form-message hide"></p>
                    </div>
                    <div class="form-group">
                        <h1 class="total-user">Thành tiền</h1>
                        <input type="text" v-model="order.totalProduct">
                    </div>
                    <div class="form-group">
                        <a href="#" @click="submit">
                            <button class="btn btn-animation">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span>Thanh toán</span>
                            </button>
                        </a>
                    </div>
                </form>
            </section>
        </section>
    </main>
</template>

<script>
import CartService from '../services/cart.service';
import ProductService from '../services/product.service';
import SelectSpeed from '../components/SelectSpeed.vue';
import OrderService from '../services/order.service';
export default {
    name: 'Cart',
    components: { SelectSpeed },
    data() {
        return {
            goCart: '',
            message: '',
            userName: '',
            totalProduct: '',
            goCartCheck: false,
            messageCheck: false,
            checkCartList: false,
            getProduct: [],
            getCart: [],
            productUser: [],
            listIdProduct: [],
            productAll: [],
            product: {},
            order: {},
            cart: {},
        };
    },
    methods: {
        async updateCart(data) {
            try {
                await CartService.update(this.cart._id, data);
                this.$swal('THANH TOÁN', 'Đơn hàng của bạn đã được thanh toán, cảm ơn bạn rất nhiều !', 'success');
            } catch (error) {
                console.log(error);
            }
        },
        async updateCartDelete(data) {
            try {
                await CartService.update(this.cart._id, data);
                this.$swal('GIỎ HÀNG', 'Bạn vừa xóa thành công một sản phẩm', 'success');
                window.onclick = function () {
                    location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateCartPlus(data) {
            try {
                await CartService.update(this.cart._id, data);
                this.$swal('GIỎ HÀNG', 'Bạn vừa tăng số lượng của sản phẩm', 'success');
                window.onclick = function () {
                    location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateCartMinus(data) {
            try {
                await CartService.update(this.cart._id, data);
                this.$swal('GIỎ HÀNG', 'Bạn vừa giảm số lượng của sản phẩm', 'success');
                window.onclick = function () {
                    location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async uploadOrder() {
            try {
                await OrderService.create(this.order);
                this.updateCart({ userName: this.userName, product: [], totalProduct: String(0) });
                window.onclick = function () {
                    location.replace('http://127.0.0.1:1010');
                }
            }
            catch (error) {
                console.log(error)
            }
        },
        getQuality(id) {
            var findItem = this.cart.product.find((item, index) => {
                if (item.productId === id) {
                    return item;
                }
            })
            this.cart.product.forEach((item, index) => {
                if(item.productId === id) {
                    item.quality = findItem.quality;
                } 
            })

            return findItem.quality;
        },
        minusQuality(id) {
            var check = true;
            this.cart.product.forEach((item, index) => {
                if(item.productId === id) {
                    if(item.quality >= 2) {
                        item.quality -= 1;
                    }
                    else {
                        check = false;
                    }
                } 
            })
            if(check === true) {
                this.totalMoney();
                this.updateCartMinus(this.cart);
            }
            else {
                this.$swal('GIỎ HÀNG', 'Không thể giảm số lượng sản phẩm được nữa', 'info');
            }
        },
        plusQuality(id) {
            this.cart.product.forEach((item, index) => {
                if(item.productId === id) {
                    item.quality += 1;
                } 
            })
            this.totalMoney();
            this.updateCartPlus(this.cart);
        },
        submit(e) {
            e.preventDefault();
            this.order.time = new Date();
            // console.log(this.order);
            this.uploadOrder();
        },
        convertImg(img) {
            return "data:image/png;base64," + img;
        },
        async getProductId(id) {
            try {
                this.product = await ProductService.get(id);
                this.productAll.push(this.product);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        findPrice(id) {
            var find = this.getProduct.find((item, index) => {
                if (item._id === id) {
                    return item;
                }
            })
            return Number(find.price);
        },
        totalMoney() {
            var total = 0;
            this.cart.product.forEach((item, index) => {
                let price = this.findPrice(item.productId) * item.quality;
                total += price;
            })
            this.cart.totalProduct = String(total);
            this.order.totalProduct = String(total);
        },
        deleteProduct(idProduct) {
            var itemIndex = null;
            this.productAll.forEach((item, index) => {
                if(item._id === idProduct) {
                    itemIndex = index;
                }
            })
            this.productAll.splice(itemIndex, 1);
            this.cart.product.splice(itemIndex, 1);
            if(this.cart.product.length === 0) {
                this.order.totalProduct = String(0);
            }
            else {
                this.totalMoney();
            }
            this.cart.totalProduct = String(this.order.totalProduct);
            this.updateCartDelete(this.cart);   
        },
        async retrieveCart() {
            try {
                this.getCart = await CartService.getAll();
                const username = JSON.parse(localStorage.getItem('user'));
                // console.log(username);
                if (username === null) {
                    this.message = "ĐĂNG NHẬP ĐỂ MUA HÀNG";
                    this.messageCheck = !this.messageCheck;
                }
                else {
                    this.checkCartList = !this.checkCartList;
                    this.userName = username;
                    this.order.userName = username;
                    var check = this.getCart.some((item, index) => {
                        return username === item.userName;
                    })
                    if (check === true) {

                        var cartUser = this.getCart.find((item, index) => {
                            if (username === item.userName) {
                                return item;
                            }
                        })

                        this.cart = cartUser;
                        this.order.product = this.cart.product;
                        this.productUser = this.cart.product;
                        // console.log(this.cart);
                        // Get money
                        this.totalProduct = this.cart.totalProduct;
                        this.order.totalProduct = `${Number(this.cart.totalProduct).toLocaleString()} VNĐ`;
                        if (this.productUser.length === 0) {
                            this.goCart = "GIỎ HÀNG CHƯA CÓ SẢN PHẨM, VUI LÒNG QUAY LẠI TRANG CHỦ ĐỂ MUA HÀNG"
                            this.checkCartList = !this.checkCartList;
                            this.goCartCheck = !this.goCartCheck;
                        }
                        else {
                            this.listIdProduct = this.productUser.map((item, index) => {
                                return item.productId;
                            })
                            this.listIdProduct.forEach((item, index) => {
                                this.getProductId(item);
                            })
                            // console.log(this.listIdProduct);
                        }
                        // console.log(this.cart._id);
                    }

                }
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveProduct() {
            try {
                this.getProduct = await ProductService.getAll();
                // console.log(this.getProduct);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveCart();
            this.retrieveProduct();
        },
    },
    mounted() {
        this.refreshList();
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

.main {
    .hide {
        display: none;
    }

    .product-cart {
        margin: 40px 80px;

        .cart-message {
            display: flex;
            flex-direction: column;
            align-items: center;

            .cart-message__title {
                width: 300px;
                text-align: center;
                margin-right: auto;
                background-image: linear-gradient(to right, blue, blueviolet);
                @include flexLayout();
                justify-content: center;

                h1 {
                    margin-left: 10px;
                }
            }

            .cart-message__go,
            .cart-message__mess {
                cursor: pointer;
                transition: all 0.3s linear;

                &:hover {
                    background-color: rgb(2, 66, 2);
                }
            }

            li {
                background-color: $main-color;
                color: white;
                border-radius: 4px;
                padding: 15px;
            }

            li+li {
                margin-top: 40px;
            }
        }

        .wrap-cart-list {
            margin-top: 40px;
            display: flex;
            align-items: flex-start;
            .cart-list {
                width: 70%;

                table,
                th,
                td {
                    border-collapse: collapse;
                    border-bottom: 1px solid grey;
                    text-align: center;
                }

                table {
                    width: 100%;
                    font-size: 10px;

                    thead {
                        th {
                            padding: 5px 0;
                            font-size: 1.6em;
                            text-transform: uppercase;
                            color: $main-color;
                        }
                    }

                    tbody {
                        tr {
                            td {
                                font-size: 1.5em;

                                div {
                                    padding: 10px;
                                    overflow: hidden;

                                    img {
                                        display: block;
                                        margin: 0 auto;
                                        width: 70px;
                                        transition: all 0.2s linear;

                                        &:hover {
                                            transform: scale(1.1);
                                        }
                                    }
                                }

                                .icon {
                                    font-size: 1.2em;
                                    cursor: pointer;
                                    transition: all 0.3s linear;

                                    &:hover {
                                        color: blue;
                                        transform: scale(1.3);
                                    }
                                }

                                .icon--delete {
                                    &:hover {
                                        color: red;
                                        transform: scale(1.3);
                                    }
                                }

                                .product-quaility {
                                    display: flex;
                                    justify-content: space-evenly;
                                }
                            }

                            .type-product {
                                text-transform: uppercase;
                            }
                        }
                    }
                }
            }

            .form--transport {
                width: 30%;
                margin-left: 40px;
                padding: 15px;
                border-radius: 5px;
                border: 1px solid grey;
                box-shadow: 0 0 3px 3px grey;

                .form-group {
                    font-size: 10px;

                    .form-title {
                        text-transform: uppercase;
                        text-align: center;
                        font-size: 2em;
                        color: $main-color;
                    }

                    .name-user,
                    .address-user,
                    .total-user,
                    .phone-user {
                        text-transform: uppercase;
                        font-size: 1.5em;
                        margin-bottom: 5px;
                        color: blue;
                    }

                    input,
                    select,
                    textarea {
                        @include formInput(grey, 12px, 12px, 4px, 1.5em);
                    }

                    a {
                        .btn-animation {
                            width: 100%;
                            @include buttonAnimation(16px, 1.7rem, 8rem, 20%);
                        }
                    }
                }

                .form-group+.form-group {
                    margin-top: 15px;
                }
            }
        }

    }
}
</style>