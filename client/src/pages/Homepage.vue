<template>
    <main class="main">
        <SelectSpeed></SelectSpeed>
        <section class="homepage-slider">
            <SliderProductIntroduce />
        </section>
        <section class="product">
            <section :class="`product-list product-list--${item.className}`" v-for="(item, index) in dataHomepage"
                :key="index">
                <article class="product-item">
                    <div class="product-head">
                        <h1 class="product-head__title">{{ item.title }}</h1>
                        <ul class="nav-list">
                            <li class="nav-item" v-for="(item, index) in item.brand" :key="index">
                                <RouterLink
                                    :to="{ name: 'Product', params: { type: item.url.type, name: item.url.name } }"
                                    class="nav-link">
                                    <img :src="item.dirImg" alt="img-logo">
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                    <div class="product-body">
                        <SliderProduct :dataSlider="item.dataSlider" :className="item.className" />
                    </div>
                </article>
            </section>
        </section>
    </main>
</template>
<script>
import SelectSpeed from '../components/SelectSpeed.vue';
import SliderProduct from '../components/SliderProduct.vue';
import SliderProductIntroduce from '../components/SliderProductIntroduce.vue';
import ProductService from "@/services/product.service";

export default {
    name: "Homepage",
    components: { SelectSpeed, SliderProduct, SliderProductIntroduce },
    data() {
        const dataHomepage = [
            {
                className: 'laptop',
                title: 'LAPTOP',
                brand: [
                    { 'dirImg': '/src/assets/imgs/product/logo/apple.png', url: { type: 'laptop', name: 'apple'},},
                    { 'dirImg': '/src/assets/imgs/product/logo/asus.png', url: { type: 'laptop', name: 'asus'}},
                    { 'dirImg': '/src/assets/imgs/product/logo/dell.png', url: { type: 'laptop', name: 'dell'}},
                    { 'dirImg': '/src/assets/imgs/product/logo/huawei.jpg', url: { type: 'laptop', name: 'huawei'}},
                    { 'dirImg': '/src/assets/imgs/product/logo/lenovo.jpg', url: { type: 'laptop', name: 'lenovo'}},
                    { 'dirImg': '/src/assets/imgs/product/logo/msi.png', url: { type: 'laptop', name: 'msi'}},
                ],
                dataSlider: [
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'laptop', nameUrl: "apple" },
                ]
            },
            {
                className: 'mobile',
                title: 'ĐIỆN THOẠI',
                brand: [
                    { dirImg: '/src/assets/imgs/product/logo/apple.png', url: { type: 'mobile', name: 'apple'},},
                    { dirImg: '/src/assets/imgs/product/logo/oppo.jpg', url: { type: 'mobile', name: 'oppo'}},
                    { dirImg: '/src/assets/imgs/product/logo/realme.png', url: { type: 'mobile', name: 'realme'}},
                    { dirImg: '/src/assets/imgs/product/logo/xiaomi.png', url: { type: 'mobile', name: 'xiaomi'}},
                    { dirImg: '/src/assets/imgs/product/logo/samsung.png', url: { type: 'mobile', name: 'samsung'}},
                ],
                dataSlider: [
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'mobile', nameUrl: "apple" },
                ]
            },
            {
                className: 'tablet',
                title: 'MÁY TÍNH BẢNG',
                brand: [
                    { dirImg: '/src/assets/imgs/product/logo/apple.png', url: { type: 'tablet', name: 'apple'},},
                    { dirImg: '/src/assets/imgs/product/logo/huawei.jpg', url: { type: 'tablet', name: 'huawei'},},
                    { dirImg: '/src/assets/imgs/product/logo/lenovo.jpg', url: { type: 'tablet', name: 'lenovo'}},
                    { dirImg: '/src/assets/imgs/product/logo/samsung.png', url: { type: 'tablet', name: 'samsung'}},
                ],
                dataSlider: [
                    { dirImg: '', name: '.', price: 0, type: 'tablet', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'tablet', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'tablet', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'tablet', nameUrl: "apple" },
                    { dirImg: '', name: '.', price: 0, type: 'tablet', nameUrl: "apple" },
                ]
            },
            {
                className: 'mouse',
                title: 'Chuột',
                brand: [
                    { dirImg: '/src/assets/imgs/product/logo/dareu.png', url: { type: 'mouse', name: 'dareu'},},
                    { dirImg: '/src/assets/imgs/product/logo/logitech.jpeg', url: { type: 'mouse', name: 'logitech'}},
                    { dirImg: '/src/assets/imgs/product/logo/microsoft.jpeg', url: { type: 'mouse', name: 'microsoft'}},
                    { dirImg: '/src/assets/imgs/product/logo/rapoo.png', url: { type: 'mouse', name: 'rapoo'}},
                    { dirImg: '/src/assets/imgs/product/logo/zadez.jpg', url: { type: 'mouse', name: 'zadez'}},
                ],
                dataSlider: [
                    { dirImg: '', name: '.', price: 0, type: 'mouse', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'mouse', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'mouse', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'mouse', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'mouse', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'mouse', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'mouse', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'mouse', nameUrl: "logitech" },
                ]
            },
            {
                className: 'keyboard',
                title: 'Bàn phím',
                brand: [
                    { dirImg: '/src/assets/imgs/product/logo/logitech.jpeg', url: {type: 'keyboard', name: 'logitech'},},
                    { dirImg: '/src/assets/imgs/product/logo/microsoft.jpeg', url: {type: 'keyboard', name: 'microsoft'}},
                    { dirImg: '/src/assets/imgs/product/logo/razer.jpeg', url: {type: 'keyboard', name: 'razer'}},
                ],
                dataSlider: [
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                    { dirImg: '', name: '.', price: 0, type: 'keyboard', nameUrl: "logitech" },
                ]
            },
            {
                className: 'smartwatch',
                title: 'đồng hồ thông minh',
                brand: [
                    { dirImg: '/src/assets/imgs/product/logo/amazfit.png', url: { type: 'smartwatch', name: 'amazfit'},},
                    { dirImg: '/src/assets/imgs/product/logo/befit.png', url: { type: 'smartwatch', name: 'befit'}},
                    { dirImg: '/src/assets/imgs/product/logo/samsung.png', url: { type: 'smartwatch', name: 'samsung'}},
                    { dirImg: '/src/assets/imgs/product/logo/xiaomi.png', url: { type: 'smartwatch', name: 'xiaomi'}},
                ],
                dataSlider: [
                    { dirImg: '', name: '.', price: 0, type: 'smartwatch', nameUrl: "amazfit" },
                    { dirImg: '', name: '.', price: 0, type: 'smartwatch', nameUrl: "amazfit" },
                    { dirImg: '', name: '.', price: 0, type: 'smartwatch', nameUrl: "amazfit" },
                    { dirImg: '', name: '.', price: 0, type: 'smartwatch', nameUrl: "amazfit" },
                    { dirImg: '', name: '.', price: 0, type: 'smartwatch', nameUrl: "amazfit" },
                    { dirImg: '', name: '.', price: 0, type: 'smartwatch', nameUrl: "amazfit" },
                    { dirImg: '', name: '.', price: 0, type: 'smartwatch', nameUrl: "amazfit" },
                    { dirImg: '', name: '.', price: 0, type: 'smartwatch', nameUrl: "amazfit" },
                    { dirImg: '', name: '.', price: 0, type: 'smartwatch', nameUrl: "amazfit" },
                ]
            }
        ];
        return {
            dataHomepage,
            homepage: [],
        };
    },
    methods: {
        getData(type, trademark) {
            var data = this.homepage.filter((item) => {
                if (item.type === type && item.trademark === trademark) {
                    return item;
                }
            })
            return data;
        },
        async retrieveHomepage() {
            try {
                this.homepage = await ProductService.getAll();
                var arrDataLaptop = [
                    this.getData('laptop', 'apple'),
                    this.getData('mobile', 'apple'),
                    this.getData('tablet', 'samsung'),
                    this.getData('mouse', 'logitech'),
                    this.getData('keyboard', 'logitech'),
                    this.getData('smartwatch', 'befit'),
                ];
                this.dataHomepage.forEach((item, index) => {
                    item.dataSlider.forEach((item2, index2) => {
                        item2.name = arrDataLaptop[index][index2].name;
                        item2.price = Number(arrDataLaptop[index][index2].price).toLocaleString();
                        item2.dirImg = "data:image/png;base64," + arrDataLaptop[index][index2].img;
                    });
                });

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveHomepage();
        }
    },
    mounted() {
        const bgColorPrev = ['white', 'blue', '$main-color', 'black', 'rgb(229,43,43)', '#f042f0', '#ed742e'];
        const bgColorNext = ['white', 'blueviolet', 'rgb(1,1,29)', 'grey', 'blue', '#11cee3', '#F7CE68'];
        const swiperPrev = document.querySelectorAll('.swiper-button-prev');
        const swiperNext = document.querySelectorAll('.swiper-button-next');
        swiperPrev.forEach((item, index) => {
            item.style = `background-color: ${bgColorPrev[index]}`;
        });
        swiperNext.forEach((item, index) => {
            item.style = `background-color: ${bgColorNext[index]}`;
        });
        this.refreshList();
    },
}
</script>
<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/variable.scss';

.main {
    .homepage-slider {
        position: relative;

        .swiper:hover [class^="swiper-button-"] {
            opacity: 0.5;
        }

        .swiper {
            .swiper-slide {
                img {
                    display: block;
                    width: 100%;
                    height: 550px;
                }
            }

            [class^="swiper-button-"] {
                transition: all 0.2s linear;
                opacity: 0;
                padding: 20px;
                background-color: white;

                &:hover {
                    opacity: 1;
                }

                &::after {
                    font-size: 20px;
                    color: $main-color;
                    font-weight: bold;
                }
            }

            .swiper-button-prev {
                @include swiperButton(150px, 0, 0, 100px, 100px, 0, $swiper-button-prev);
            }

            .swiper-button-next {
                @include swiperButton(0, 150px, 100px, 0, 0, 100px, $swiper-button-next);
            }

            .swiper-pagination {
                transform: translateY(-380%);
            }

            .swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
            .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
                background-color: white;
                width: 11px;
                height: 11px;
            }
        }
    }

    .product {
        margin: 80px;

        .product-list {
            padding: 20px;
            background-color: $main-color;
            border-radius: 4px;

            .product-item {
                .product-head {
                    font-size: 10px;
                    @include flexLayout();
                    justify-content: space-between;
                    margin-bottom: 20px;

                    // border: 1px solid red;
                    .product-head__title {
                        font-size: 2.5em;
                        background-color: white;
                        color: $main-color;
                        padding: 8px 16px;
                        border-radius: 4px;
                        text-transform: uppercase;
                    }

                    .nav-list {
                        // border: 1px solid red;
                        @include flexLayout();
                        flex-wrap: wrap;

                        .nav-item {
                            .nav-link {
                                img {
                                    transition: all 0.2s linear;
                                    width: 120px;
                                    background-color: white;
                                    padding: 5px;
                                    border-radius: 4px;
                                    display: block;
                                    height: 100%;

                                    &:hover {
                                        @include buttonHover(#fff, white);
                                    }
                                }

                            }

                        }

                        .nav-item+.nav-item {
                            margin-left: 20px;
                        }
                    }
                }

                .product-body {
                    .swiper:hover [class^="swiper-button-"] {
                        opacity: 0.5;
                    }

                    // Important
                    display: flex;

                    .swiper {
                        border-radius: 4px;

                        .swiper-slide {
                            border-radius: 4px;
                            overflow: hidden;
                            background-color: white;

                            .main-product {
                                display: flex;
                                flex-direction: column;
                                // border: 1px solid black;
                                height: 100%;
                                cursor: pointer;
                                font-size: 10px;

                                div {
                                    overflow: hidden;

                                    .img {
                                        transition: all 0.3s linear;
                                        width: 100%;
                                        display: block;

                                        // border: 1px solid red;
                                        &:hover {
                                            transform: scale(1.1);
                                        }
                                    }

                                    .img--laptop {
                                        padding: 0 5px;
                                    }

                                    .img--mobile {
                                        border: 1px solid red;
                                        padding: 30px 0;
                                        transform: scale(1.1);

                                        &:hover {
                                            transform: scale(1.2);
                                        }
                                    }

                                    .img--tablet {
                                        padding: 20px 10px;
                                    }

                                    .img--smartwatch {
                                        padding: 15px;
                                    }

                                    .img--mouse {
                                        padding: 18px;
                                    }
                                }

                                .name,
                                .price {
                                    background-color: $main-color;
                                    color: white;
                                    padding: 8px;
                                    font-size: 1.5em;
                                    border-radius: 4px;
                                    transition: all 0.3s linear;

                                    &:hover {
                                        transform: scale(1.1);
                                    }
                                }

                                .name {
                                    margin: 0 20px 20px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }

                                .price {
                                    margin: auto auto 20px 20px;
                                }

                                .name--laptop,
                                .price--laptop {
                                    background: $bg-product-laptop;
                                }

                                .name--mobile,
                                .price--mobile {
                                    background: $bg-product-mobile;
                                }

                                .name--tablet,
                                .price--tablet {
                                    background: $bg-product-tablet;
                                }

                                .name--mouse,
                                .price--mouse {
                                    background: $bg-product-mouse;

                                }

                                .name--keyboard,
                                .price--keyboard {
                                    background: $bg-product-keyboard;
                                }

                                .name--smartwatch,
                                .price--smartwatch {
                                    background: $bg-product-smartwatch;
                                }
                            }
                        }

                        [class^="swiper-button-"] {
                            transition: all 0.2s linear;
                            opacity: 0;
                            padding: 20px;
                            background-color: $main-color;

                            &:hover {
                                opacity: 1;
                            }

                            &::after {
                                font-size: 20px;
                                color: white;
                                font-weight: bold;
                            }
                        }

                        .swiper-button-prev {
                            @include swiperButton(-10px, 0, 0, 100px, 100px, 0, $swiper-button-prev);
                        }

                        .swiper-button-next {
                            @include swiperButton(0, -10px, 100px, 0, 0, 100px, $swiper-button-next);
                        }
                    }
                }
            }
        }

        @for $i from 1 through length($class-name-product) {
            #{nth($class-name-product,$i)} {
                background: linear-gradient(to right, nth($bg-linear-first-product, $i), nth($bg-linear-end-product, $i));
            }
        }

        .product-list+.product-list {
            margin-top: 80px;
        }
    }
}

// Responsive
// Large
@include responsive_main_lg__ {
    .main {
        .homepage-slider {
            .swiper {
                .swiper-slide {
                    img {
                        height: 500px;
                    }
                }

                .swiper-pagination {
                    transform: translateY(-350%);
                }

                .swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
                .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
                    background-color: white;
                    width: 10px;
                    height: 10px;
                }
            }

        }

        .product {
            margin: 60px;

            .product-list {
                .product-item {
                    .product-head {
                        // border: 1px solid red;
                        font-size: 9px;

                        .nav-list {

                            .nav-item {
                                @include flexLayout();

                                .nav-link {
                                    img {
                                        width: 95px;
                                    }
                                }
                            }
                        }
                    }

                    .product-body {
                        .swiper {
                            .swiper-slide {
                                .main-product {
                                    font-size: 9px;
                                }
                            }

                            [class^="swiper-button-"] {
                                padding: 15px;

                                &::after {
                                    font-size: 15px;
                                }
                            }
                        }
                    }
                }
            }

            .product-list+.product-list {
                margin-top: 60px;
            }
        }
    }
}

// Medium
@include responsive_main_md__ {
    .main {
        .homepage-slider {
            .swiper {
                .swiper-slide {
                    img {
                        height: 450px;
                    }
                }

                .swiper-pagination {
                    transform: translateY(-330%);
                }

                .swiper-button-prev {
                    @include swiperButton(80px, 0, 0, 100px, 100px, 0, $swiper-button-prev);
                }

                .swiper-button-next {
                    @include swiperButton(0, 80px, 100px, 0, 0, 100px, $swiper-button-next);
                }
            }


        }

        .product {
            margin: 50px;

            .product-list {
                .product-item {
                    .product-head {
                        font-size: 8px;

                        .product-head__title {
                            padding: 8px 12px;
                            border-radius: 3px;
                        }

                        flex-direction: column;

                        .nav-list {
                            // border: 1px solid red;
                            margin-top: 20px;

                            .nav-item {
                                .nav-link {
                                    img {
                                        width: 90px;
                                        border-radius: 3px;
                                    }
                                }
                            }

                            .nav-item+.nav-item {
                                margin-left: 10px;
                            }
                        }
                    }

                    .product-body {
                        .swiper {
                            .swiper-slide {
                                .main-product {
                                    font-size: 8px;
                                }
                            }

                            [class^="swiper-button-"] {
                                padding: 0px;
                            }
                        }
                    }
                }
            }

            .product-list+.product-list {
                margin-top: 50px;
            }
        }
    }
}

// sm
@include responsive_main_sm__ {
    .main {
        .homepage-slider {
            .swiper {
                .swiper-slide {
                    img {
                        height: 350px;
                    }
                }

                .swiper-pagination {
                    transform: translateY(-200%);
                }

                [class^="swiper-button-"] {
                    padding: 10px;

                    &::after {
                        font-size: 20px;
                    }
                }

                .swiper-button-prev {
                    @include swiperButton(40px, 0, 0, 100px, 100px, 0, $swiper-button-prev);
                }

                .swiper-button-next {
                    @include swiperButton(0, 40px, 100px, 0, 0, 100px, $swiper-button-next);
                }
            }
        }

        .product {
            margin: 20px;
            margin-top: calc(20px + 32px);

            .product-list {

                .product-item {

                    .product-head {
                        // border: 1px solid red;
                        font-size: 7px;

                        .nav-list {
                            .nav-item {
                                .nav-link {

                                    img {
                                        width: 85px;
                                        border-radius: 3px;
                                    }
                                }
                            }

                            .nav-item+.nav-item {
                                margin-left: 5px;
                            }
                        }
                    }

                    .product-body {
                        .swiper {
                            .swiper-slide {
                                .main-product {
                                    font-size: 7px;
                                }
                            }
                        }
                    }
                }
            }

            .product-list+.product-list {
                margin-top: 20px;
            }
        }
    }
}

// xm
@include responsive_main_xm__ {
    .main {
        .homepage-slider {
            margin: 15px;

            .swiper {
                .swiper-slide {
                    img {
                        border-radius: 4px;
                        height: 250px;
                    }
                }

                .swiper-pagination {
                    transform: translateY(-120%);
                }

                .swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
                .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
                    background-color: white;
                    width: 8px;
                    height: 8px;
                }
            }

        }

        .product {
            margin: 15px;

            .product-list {
                padding: 15px;

                .product-item {
                    .product-head {
                        // border: 1px solid red;

                        margin-bottom: calc(15px - 5px);

                        .nav-list {
                            margin-top: calc(15px - 5px);
                            justify-content: center;

                            // border: 1px solid red;
                            .nav-item {

                                // border: 1px solid red;
                                .nav-link {

                                    // border: 1px solid red;
                                    img {
                                        width: 80px;
                                        // border-radius: 3px;
                                    }
                                }
                            }

                            .nav-item+.nav-item {
                                margin-left: 5px;
                            }

                            .nav-item {
                                margin: 5px;
                            }
                        }
                    }

                    .product-body {
                        margin-top: 0;

                        .swiper {

                            // border: 1px solid red;
                            .swiper-slide {
                                .main-product {
                                    .name {
                                        margin: 0 15px 15px;
                                    }

                                    .price {
                                        margin: auto auto 15px 15px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .product-list+.product-list {
                margin-top: 15px;
            }
        }
    }
}

@include responsive_xxm {
    .main {
        .homepage-slider {
            margin: 10px;

            .swiper {
                .swiper-slide {
                    img {
                        border-radius: 4px;
                        height: 250px;
                    }
                }

                .swiper-pagination {
                    transform: translateY(-120%);
                }

                .swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
                .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
                    background-color: white;
                    width: 8px;
                    height: 8px;
                }
            }

        }

        .product {
            margin: 10px;

            .product-list {
                padding: 10px;

                .product-item {
                    .product-head {
                        // border: 1px solid red;
                        font-size: 6.7px;

                        .product-head__title {
                            padding: 6px 8px;
                        }

                        margin-bottom: calc(10px - 5px);

                        .nav-list {
                            margin-top: calc(10px - 5px);

                            .nav-item {
                                .nav-link {

                                    // border: 1px solid red;
                                    img {
                                        width: 75px;
                                        // border-radius: 3px;
                                    }
                                }
                            }
                        }
                    }

                    .product-body {
                        .swiper {

                            // border: 1px solid red;
                            .swiper-slide {
                                .main-product {
                                    .name {
                                        margin: 0 10px 10px;
                                    }

                                    .price {
                                        margin: auto auto 10px 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .product-list+.product-list {
                margin-top: 10px;
            }
        }
    }
}
</style>