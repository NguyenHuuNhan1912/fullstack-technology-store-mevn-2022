<template>
    <main class="main">
        <SelectSpeed></SelectSpeed>
        <section class="product-detail">
            <section class="row">
                <section class="col-lg-4 img-wrapper">
                    <div>
                        <img :src="detail.img" alt="img-detail"
                            :class="`img-product img-product--${detail.type}-${detail.trademark}`">
                    </div>
                </section>
                <section class="col-lg-5">
                    <ul class="information-list-detail">
                        <li class="information-item information-item--name">{{ detail.name }}</li>
                        <!-- <li class="information-item">Thương hiệu | {{ detail.type?.toUpperCase() }}</li> -->
                        <li class="information-item-detail">Thương hiệu | {{ detail.trademark?.charAt(0).toUpperCase() +
                                detail.trademark?.slice(1)
                        }}</li>
                        <li class="information-item-detail information-item-detail--price">
                            {{ Number(detail.price)?.toLocaleString() }} VNĐ</li>
                        <li v-if="detail.storage" class="information-item-detail">Lưu trữ: {{ detail.storage }}</li>
                        <li v-if="detail.cpu" class="information-item-detail">CPU: {{ detail.cpu }}</li>
                        <li v-if="detail.screen" class="information-item-detail">Màn hình: {{ detail.screen }}</li>
                        <li v-if="detail.ram" class="information-item-detail">RAM: {{ detail.ram }}</li>
                        <li v-if="detail.graphics" class="information-item-detail">Đồ họa: {{ detail.graphics }}</li>
                        <li v-if="detail.os" class="information-item-detail">Hệ điều hành: {{ detail.os }}</li>
                        <li v-if="detail.pin" class="information-item-detail">PIN: {{ detail.pin }}</li>
                        <li v-if="detail.mass" class="information-item-detail">Khối lượng: {{ detail.mass }}</li>
                        <li v-if="detail.chip" class="information-item-detail">Chip: {{ detail.chip }}</li>
                        <li v-if="detail.cameraAfter" class="information-item-detail">Camera sau: {{ detail.cameraAfter
                        }}</li>
                        <li v-if="detail.cameraBefore" class="information-item-detail">Camera trước: {{
                                detail.cameraBefore
                        }}
                        </li>
                        <li v-if="detail.connect" class="information-item-detail">Kiểu kết nối: {{ detail.connect }}
                        </li>
                        <li v-if="detail.led" class="information-item-detail">Led: {{ detail.led }}</li>
                        <li v-if="detail.keyboardType" class="information-item-detail">Loại bàn phím: {{
                                detail.keyboardType
                        }}
                        </li>
                        <li v-if="detail.keyboardSwitch" class="information-item-detail">Switch: {{
                                detail.keyboardSwitch
                        }}
                        </li>
                        <li v-if="detail.face" class="information-item-detail">Mặt đồng hồ: {{ detail.face }}</li>
                        <li v-if="detail.feature" class="information-item-detail">Tính năng: {{ detail.feature }}</li>
                    </ul>
                    <section class="product-add-cart">
                        
                        <div @click="buyProduct">
                            <button class="btn btn-animation">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span>THÊM VÀO GIỎ HÀNG</span>
                            </button>
                        </div>
                    </section>
                </section>
                <section class="col-lg-3">
                    <div class="service-product-wrapper">
                        <div class="service-title">
                            <h1>Chính sách bán hàng</h1>
                        </div>
                        <ul class="service-product">
                            <li v-for="(item, index) in dataList" :key="index">
                                <font-awesome-icon :icon="item.icon" class="icon" />
                                <span>{{ item.des }}</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
        </section>
    </main>
</template>
<script>
import SelectSpeed from '../components/SelectSpeed.vue';
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";
export default {
    name: "ProductDetail",
    components: { SelectSpeed },
    data() {
        const nameProduct = this.$route.params.id;
        const convertUrl = nameProduct.replaceAll('-', ' ');
        const dataList = [
            { icon: "fa-solid fa-thumbs-up", des: "Sản phẩm đạt chuẩn", },
            { icon: "fa-solid fa-shield-heart", des: "Cam kết chính hãng 100%", },
            { icon: "fa-solid fa-rotate", des: "Đổi trả trong vòng 10 ngày", },
            { icon: "fa-solid fa-gear", des: "Sửa chữa đồng giá 150.000đ", },
            { icon: "fa-solid fa-hand-sparkles", des: "Vệ sinh máy tính, laptop", },
            { icon: "fa-solid fa-dollar-sign", des: "Giá cực ưu đãi", },
            { icon: "fa-solid fa-circle-question", des: "Giải đáp thắc mắc khách hàng", },
            { icon: "fa-solid fa-handshake-angle", des: "Hỗ trợ trả góp lãi suất 0%", },
        ]
        return {
            convertUrl,
            detail: {},
            dataList,
            cart: {
            },
            getCart: [],
        }
    },
    methods: {
        async retrieveCart() {
            try {
                this.getCart = await CartService.getAll();
                var username = JSON.parse(localStorage.getItem('user'));
                var compare = this.getCart.find((item, index) => {
                    if (username === item.userName) {
                        return item;
                    }
                })
                this.cart = compare;
                // if(this.cart.product === undefined) {
                //     this.cart.product = [];
                // }
                // console.log(this.cart);
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
        addProduct() {
            var obj = {
                productId: this.$route.params.id,
                quality: 1,
            }
            if(this.cart.product.length===0){
                this.cart.product.push(obj);
            }
            else {
                var check = this.cart.product.every((item, index) => {
                    return this.$route.params.id  !== item.productId;
                })
                if(check === true) {
                    this.cart.product.push(obj);
                }
            }
        },
        async updateCart(data) {
            try {
                await CartService.update(this.cart._id, data);
                this.$swal('GIỎ HÀNG', 'Thêm sản phẩm vào giỏ hàng thành công', 'success');
                // console.log(this.cart);
            } catch (error) {
                console.log(error);
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
            this.cart.totalProduct = total;
        },
        buyProduct() {
            var username = JSON.parse(localStorage.getItem('user'));
            if (username === null) {
                this.$swal('ĐĂNG NHẬP', 'Bạn cần đăng nhập trước khi mua hàng', 'info');
            }
            else {
                this.addProduct();
                this.totalMoney();
                this.updateCart(this.cart);
            }
        },

        async getDetail() {
            try {
                const id = this.$route.params.id;
                this.detail = await ProductService.get(id);
                this.detail.img = "data:image/png;base64," + this.detail.img;
                // console.log(this.detail);
            }
            catch (err) {
                console.log(err);
            }

        }
    },
    mounted() {
        this.getDetail();
        this.refreshList();
    }
}
</script>
<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

.product-detail {
    // border: 1px solid red;
    padding: 80px;

    .row {
        --bs-gutter-x: 20px;
        --bs-gutter-y: 20px;
        // align-items: center;
    }

    .img-wrapper {
        align-self: center;

        div {
            // border: 1px solid red;
            overflow: hidden;
        }

        .img-product {
            // border: 1px solid red;
            display: block;
            margin: 0 auto;
            transition: all 0.3s linear;
            transform: initial;
            width: 400px;
            padding: 30px;

            &:hover {
                transform: scale(1.1);
            }
        }

        .img-product--laptop-apple,
        .img-product--laptop-asus,
        .img-product--laptop-dell,
        .img-product--laptop-huawei,
        .img-product--laptop-lenovo,
        .img-product--laptop-msi {
            width: initial;
            padding: initial;
            transform: scale(1.3);

            &:hover {
                transform: scale(1.5);
            }
        }
    }

    .information-list-detail {
        font-size: 10px;

        // border: 1px solid red;
        .information-item--name {
            font-size: 2.4em;
            color: rgb(31, 27, 27);
        }

        .information-item-detail--price {
            font-size: 1.9em;
            color: red;
        }

        li {
            font-size: 1.5em;
            line-height: 1.4;
        }

        li:first-child {
            margin-bottom: 20px;
        }
    }

    .product-add-cart {
        // .product-quaility {
        //     @include flexLayout();
        //     margin: 20px 0;
        //     font-size: 10px;

        //     li {
        //         color: $main-color;

        //         .icon {
        //             font-size: 2.5em;
        //             transition: all 0.3s linear;
        //             cursor: pointer;

        //             &:hover {
        //                 color: blue;
        //                 transform: scale(1.1);
        //             }
        //         }

        //         span {
        //             font-size: $main-fs;
        //             margin: 0 10px;
        //         }
        //     }
        // }

        div {
            margin-top: 30px;
            .btn-animation {
                @include buttonAnimation(16px, 1.7rem, 8rem, 40%);
            }
        }
    }

    .service-product-wrapper {
        font-size: 10px;

        .service-title {
            font-size: 2.2em;
            color: $main-color;
            text-transform: uppercase;
        }

        .service-product {
            font-size: 1.5em;

            li {
                padding: 8px;
                background-color: $main-color;
                color: white;

                span {
                    margin-left: 8px;
                }

                border-radius: 4px;
                margin-top: 15px;
                transition: all 0.3s ease-in-out;

                &:hover {
                    background-color: rgb(24, 2, 44);
                }
            }
        }
    }
}
</style>