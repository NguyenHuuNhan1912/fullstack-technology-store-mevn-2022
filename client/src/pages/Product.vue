<template>
    <main class="main">
        <SelectSpeed></SelectSpeed>
        <section class="wrapper-product">
            <section class="product-all">
                <section class="product-filter">
                    <h1 class="product-filter-title">Lọc</h1>
                    <section class="filter-price" v-if="urlType==='laptop'">
                        <h1 class="filter-price-title">Theo giá</h1>
                        <ul class="filter-price-list">
                            <li class="filter-price-item">
                                <input type="checkbox" name="checkbox">
                                <span>Dưới 10 triệu</span>
                            </li>
                            <li class="filter-price-item">
                                <input type="checkbox" name="checkbox">
                                <span>Từ 10 triệu đên 20 triệu</span>
                            </li>
                            <li class="filter-price-item">
                                <input type="checkbox" name="checkbox">
                                <span>Từ 20 triệu đến 30 triệu</span>
                            </li>
                            <li class="filter-price-item">
                                <input type="checkbox" name="checkbox">
                                <span>Từ 30 triệu đến 40 triệu</span>
                            </li>
                            <li class="filter-price-item">
                                <input type="checkbox" name="checkbox">
                                <span>Trên 40 triệu</span>
                            </li>
                        </ul>
                    </section>
                    <section class="filter-color">
                        <h1 class="filter-color-title">Theo màu sắc</h1>
                        <ul class="filter-color-list">
                            <li class="filter-color-item">
                                <input type="checkbox" name="checkbox">
                                <span>Màu bạc</span>
                            </li>
                            <li class="filter-color-item">
                                <input type="checkbox" name="checkbox">
                                <span>Màu vàng</span>
                            </li>
                            <li class="filter-color-item">
                                <input type="checkbox" name="checkbox">
                                <span>Màu đen</span>
                            </li>
                            <li class="filter-color-item">
                                <input type="checkbox" name="checkbox">
                                <span>Màu Midnight</span>
                            </li>
                        </ul>
                    </section>
                    <section class="filter-ram">
                        <h1 class="filter-ram-title">Theo RAM</h1>
                        <ul class="filter-ram-list">
                            <li class="filter-ram-item">
                                <input type="checkbox" name="checkbox">
                                <span>64 GB</span>
                            </li>
                            <li class="filter-ram-item">
                                <input type="checkbox" name="checkbox">
                                <span>128 GB</span>
                            </li>
                            <li class="filter-ram-item">
                                <input type="checkbox" name="checkbox">
                                <span>256 GB</span>
                            </li>
                            <li class="filter-ram-item">
                                <input type="checkbox" name="checkbox">
                                <span>500 GB</span>
                            </li>
                        </ul>
                    </section>
                    <section class="filter-screen">
                        <h1 class="filter-screen-title">Theo kích thuớc màn hình</h1>
                        <ul class="filter-screen-list">
                            <li class="filter-screen-item">
                                <input type="checkbox" name="checkbox">
                                <span>13.3""</span>
                            </li>
                            <li class="filter-screen-item">
                                <input type="checkbox" name="checkbox">
                                <span>14"</span>
                            </li>
                            <li class="filter-screen-item">
                                <input type="checkbox" name="checkbox">
                                <span>15"</span>
                            </li>
                            <li class="filter-screen-item">
                                <input type="checkbox" name="checkbox">
                                <span>16"</span>
                            </li>
                        </ul>
                    </section>
                </section>
                <article class="product-list row">
                    <article class="product-wrapper-item col-lg-3" v-for="(item, index) in product" :key="index">
                        <ProductItem :data='item' />
                    </article>
                </article>
            </section>
        </section>
    </main>
    
</template>
<script>
import SelectSpeed from '../components/SelectSpeed.vue';
import ProductItem from '../components/ProductItem.vue';
import ProductService from "@/services/product.service";
export default {
    name: "Product",
    components: { SelectSpeed, ProductItem },
    data() {
        const urlType = this.$route.params.type;
        const urlName = this.$route.params.name;
        const arrUrl = [
            { type: 'laptop', name: 'macbook' },
            { type: 'laptop', name: 'asus' },
            { type: 'laptop', name: 'dell' },
            { type: 'laptop', name: 'huawei' },
            { type: 'laptop', name: 'lenovo' },
            { type: 'laptop', name: 'msi' },
        ];
        return {
            urlType,
            urlName,
            arrUrl,
            product: [],
        }
    },
    methods: {
        getData(type, trademark) {
            var data = this.product.filter((item) => {
                if (item.type === type && item.trademark === trademark) {
                    return item;
                }
            })
            return data;
        },
        replaceData(arr, data) {
            arr.forEach((item, index) => {
                item.name = data[index].name;
                item.price = Number(data[index].price);
            });
        },
        async retrieveProduct() {
            try {
                // this.product = await ProductService.getAll();
                this.product = await ProductService.filter({ name: this.urlName, type: this.urlType });
                // console.log(this.product);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProduct();
        }
    },
    mounted() {
        this.refreshList();
    },

}
</script>
<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

.main {
    .wrapper-product {
        .product-all {
            // border: 5px solid red;
            padding: 80px;
            display: flex;
            align-items: flex-start;
            .product-filter {
                width: 25%;
                margin-right: 20px;
                // border: 1px solid red;
                font-size: 10px;

                .product-filter-title {
                    padding: 10px;
                    text-transform: uppercase;
                    font-size: $main-fs;
                    color: white;
                    background-color: $main-color;
                    border-radius: 5px;
                }
                [class^='filter-'] {
                    h1 {
                        font-size: 1.7em;
                        text-transform: uppercase;
                        background-color: blueviolet;
                        color: white;
                        padding: 10px;
                        border-radius: 5px;
                    }
                    ul {
                        li {
                            margin-top: 15px;
                            input {
                                cursor: pointer;
                            }
                            span {
                                font-size: 1.4em;
                                margin-left: 8px;
                            }
                        }
                    }
                }
                .filter-price, .filter-color, .filter-ram, .filter-screen {
                    margin: 15px;
                }
            }

            .row {
                --bs-gutter-x: 20px;
                --bs-gutter-y: 20px;
            }

            .product-list {
                width: 75%;

                .product-item {
                    border-radius: 5px;
                    box-shadow: 0 0 5px 1px grey;
                    padding: 10px;
                    font-size: 10px;
                    @include flexLayout();
                    flex-direction: column;
                    align-items: initial;
                    height: 100%;

                    div {
                        overflow: hidden;

                        img {
                            width: 100%;
                            transition: all 0.4s linear;
                            display: block;
                            padding: 15px;
                            // border: 1px solid red;
                            &:hover {
                                transform: scale(1.1);
                            }
                        }
                    }

                    .name,
                    .price {
                        // margin: 0 10px 10px;
                        font-size: 1.3em;
                    }

                    .name {
                        // white-space: nowrap;
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                        margin: 0 10px 10px;
                    }

                    .price {
                        color: red;
                        font-size: 1.5em;
                        margin: auto 10px 10px;
                        margin: auto 10px 10px;
                        
                    }

                    .name--apple,
                    .name--asus,
                    .name--dell,
                    .name--huawei,
                    .name--lenovo,
                    .name--msi {
                        margin: 0 10px 10px;
                    }

                    .price--apple,
                    .price--asus,
                    .price--dell,
                    .price--huawei,
                    .price--lenovo,
                    .price--msi {
                        margin: auto 10px 10px;
                        // border: 1px solid red;

                    }
                }
            }
        }
    }
}
</style>