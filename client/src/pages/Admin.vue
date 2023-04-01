<template>
    <main class="main">
        <div v-if="activeProduct" class="information-detail-product">
            <ProductCard :product="activeProduct" @exitProductDetail="exitProductDetail" />
        </div>
        <div class="overlay hide" @click="toggleOver"></div>
        <section class="admin">
            <section class="row">
                <article class="col-lg-2">
                    <aside class="admin__directional" ref="admin__directional">
                        <div class="directional-head">
                            <font-awesome-icon icon="fa-solid fa-server" class="icon" />
                            <h1>ADMIN</h1>
                        </div>
                        <div class="directional-body">
                            <ul class="directional-list">
                                <li class="directional-item" v-for="(item, index) in dataDirectionalHead" :key="index">
                                    <a href="#" class="directional-link">
                                        <div class="directional-link__head">
                                            <font-awesome-icon :icon="item.icon" class="icon" />
                                            <span>{{ item.name }}</span>
                                        </div>
                                        <font-awesome-icon icon="fa-solid fa-caret-down" class="icon" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </article>
                <article class="col-lg-10" ref="parent_admin__main">
                    <article class="admin__main">
                        <nav class="admin-nav">
                            <section class="nav-left">
                                <font-awesome-icon icon="fa-solid fa-bars-staggered" class="icon" @click="toggleEvent" />
                            </section>
                            <section class="nav-center">
                                <input type="text" placeholder="Nhập sản phẩm cần tìm..." v-model="searchText">
                                <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="search-icon" />
                            </section>
                            <ul class="nav-right">
                                <li class="nav-right-item">
                                    <a href="#" class="nav-right-link">
                                        <font-awesome-icon icon="fa-solid fa-house" class="icon" @click="gotoHomepage" />
                                    </a>
                                </li>
                                <li class="nav-right-item">
                                    <a href="#" class="nav-right-link">
                                        <font-awesome-icon icon="fa-solid fa-bell" class="icon" />
                                    </a>
                                </li>
                                <li class="nav-right-item">
                                    <a href="#" class="nav-right-link nav-right-link--me">
                                        <img src="../assets/imgs/avt/me.jpg" alt="me" class="me">
                                        <div class="infor">
                                            <h1>{{ nameAdmin }}</h1>
                                            <font-awesome-icon icon="fa-solid fa-caret-down" class="icon" />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <nav class="admin-feature">
                            <section class="feature-title">
                                <h1>DANH SÁCH SẢN PHẨM</h1>
                            </section>
                            <ul class="nav-list">
                                <li class="nav-item">
                                    <div class="nav-link nav-link--add" @:click="addProduct">
                                        <span>thêm sản phẩm</span>
                                        <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div href="#" class="nav-link nav-link--fill">
                                        <span>lọc sản phẩm</span>
                                        <font-awesome-icon icon="fa-solid fa-filter" class="icon" />
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div href="#" class="nav-link nav-link--ref" @click="refreshList">
                                        <span>làm mới</span>
                                        <font-awesome-icon icon="fa-solid fa-rotate-right" class="icon" />
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <ProductList v-if="filteredProductCount > 0" :product="filteredProduct"
                            v-model:activeIndex="activeIndex" @showDetail="showDetail" />
                        <p class="error-message-product" v-else>KHÔNG CÓ SẢN PHẨM NÀO TƯƠNG ỨNG VỚI TÊN Ở TRÊN</p>
                    </article>
                </article>
            </section>
        </section>
    </main>
</template>
<script >
import FormAdmin from '../components/FormAdmin.vue';
import ProductList from '../components/ProductList.vue';
import ProductService from '../services/product.service';
import ProductCard from '../components/ProductCard.vue';
export default {
    name: "Admin",
    data() {

        const urlAdmin = this.$route.path;
        var nameAdmin = JSON.parse(localStorage.getItem("admin"));
        const dataDirectionalHead = [
            { name: 'Quản lý', icon: 'fa-solid fa-book' },
            { name: 'Việc cần làm', icon: 'fa-solid fa-list-ol' },
            { name: 'Sản phẩm', icon: 'fa-brands fa-product-hunt' },
            { name: 'Thống kê', icon: 'fa-solid fa-chart-simple' },
            { name: 'Đơn hàng', icon: 'fa-solid fa-truck' },
        ];
        return {
            searchText: "",
            dataDirectionalHead,
            getProduct: [],
            urlAdmin,
            activeIndex: -1,
            nameAdmin
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Tra ve mang chua tat ca cac name cua product duoi dang chuoi
        productStrings() {
            var result = this.getProduct.map((item, index) => {
                return [item.name].join("");
            });
            return result;
        },
        filteredProduct() {
            if (this.searchText === '') {
                return this.getProduct;
            }
            // Tra ve tat ca product co name giong voi searchtext
            var result = this.getProduct.filter((item, index) => {
                // console.log(this.productStrings[index]);
                return this.productStrings[index].includes(this.searchText);
            }
            );
            return result;
        },
        activeProduct() {
            return this.activeIndex < 0 ? null : this.filteredProduct[this.activeIndex];
        },
        // Neu product ton tai nhieu hon 1 san pham thi tra ve nguoc lai khong co san pham
        filteredProductCount() {
            // console.log(this.filteredProduct);
            return this.filteredProduct.length;
        }
    },
    methods: {
        gotoHomepage() {
            location.replace("http://127.0.0.1:1010/");
        },
        showDetail() {
            const node = document.querySelector('.information-detail-product');
            const nodeOver = document.querySelector('.overlay');
            node.style = 'transform: translate(0); opacity: 1;';
            nodeOver.classList.toggle('hide');
        },
        exitProductDetail() {
            const nodeOver = document.querySelector('.overlay');
            const node = document.querySelector('.information-detail-product');
            node.style = 'transform: translate(100%); opacity: 0;';
            nodeOver.classList.toggle('hide');
        },
        toggleOver() {
            const node = document.querySelector('.information-detail-product');
            const nodeOver = document.querySelector('.overlay');
            nodeOver.classList.toggle('hide');
            node.style = 'transform: translate(100%)';
        },
        toggleEvent() {
            const parentNode = this.$refs.parent_admin__main;
            const nodeToggle = this.$refs.admin__directional;
            if (nodeToggle.classList.contains('hide') === true) {
                nodeToggle.classList.toggle('hide');
                parentNode.className = 'col-lg-10';
            }
            else {
                nodeToggle.classList.toggle('hide');
                parentNode.className = 'col-lg-12';
                parentNode.style = 'margin: 0 0 0 0;';
            }
        },
        standPrice(string) {
            return string.toLocaleString();
        },
        addProduct() {
            this.$router.push({ name: "AdminAdd" });
        },
        async retrieveProduct() {
            try {
                this.getProduct = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProduct();
            if (this.urlAdmin === '/admin') {
                const headerNode = document.querySelector('.header');
                const footerNode = document.querySelector('.footer');
                headerNode.style = 'display: none';
                footerNode.style = 'display: none';
            }
            this.activeIndex = -1;
        },
    },
    mounted() {
        this.refreshList();
    },
    components: { FormAdmin, ProductList, ProductCard }
}
</script>
<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/variable.scss';

.main {
    .information-detail-product {
        position: fixed;
        top: 0;
        right: 0;
        background-color: #293042;
        color: white;
        z-index: 3;
        height: 100%;
        width: 50%;
        transform: translate(100%);
        transition: all 0.5s ease-in-out;
    }

    .overlay {
        position: fixed;
        inset: 0;
        background-color: rgba($color: #000000, $alpha: 0.9);
        z-index: 2;
        animation: overlay 0.5s linear 1;
    }

    @keyframes overlay {
        0% {
            opacity: 0;
        }

        50% {
            opacity: 0.5;
        }

        100% {
            opacity: 1;
        }
    }

    a {
        color: inherit;
    }

    .hide {
        display: none;
    }

    .admin {
        position: relative;
        padding: 20px;

        .row {
            --bs-gutter-x: 20px;
        }

        .admin__directional {
            background-color: #293042;
            color: white;
            height: 100%;
            transition: all 0.5s linear;
            margin: -20px 0 0 -20px;
            height: 100%;

            .directional-head {
                padding: 20px;
                // border: 1px solid red;
                @include flexLayout();
                justify-content: center;
                font-size: 10px;

                .icon {
                    font-size: 3.5em;
                    margin-right: 15px;
                }

                h1 {
                    text-transform: uppercase;
                    font-size: $main-fs;
                }
            }

            .directional-body {
                .directional-list {
                    .directional-link {
                        @include flexLayout();
                        justify-content: space-between;
                        padding: 20px;

                        .directional-link__head {
                            .icon {
                                margin-right: 6px;
                            }
                        }
                    }
                }
            }
        }

        .admin__main {

            // border: 1px solid red;
            .error-message-product {
                background-color: red;
                padding: 15px;
                border-radius: 5px;
                color: white;
                text-align: center;
            }

            height: 100%;
            padding: 20px;
            margin: -20px -20px 0px -20px;

            .admin-nav {
                // border: 1px solid red;
                font-size: 10px;
                @include flexLayout();
                justify-content: space-between;

                .nav-left {
                    // border: 1px solid red;
                    @include flexLayout();

                    .icon {
                        font-size: 3em;
                        cursor: pointer;
                        color: $main-color;
                        transition: all 0.4s linear;

                        &:hover {
                            transform: scale(1.2);
                        }
                    }
                }

                .nav-center {
                    position: relative;

                    .search-icon {
                        font-size: 1.8em;
                        position: absolute;
                        top: 5px;
                        right: 5px;
                        background-color: $main-color;
                        color: white;
                        padding: 5px;
                        border-radius: 5px;

                    }

                    input {
                        @include formInput(grey, 10px, 10px, 5px, 1.4em);
                        width: 500px;
                    }
                }

                .nav-right {
                    // border: 1px solid red;
                    @include flexLayout();
                    justify-content: flex-end;

                    .nav-right-link {
                        margin-right: 20px;
                        font-size: 10px;
                        color: $main-color;

                        .icon {
                            font-size: 2.3em;
                        }

                        .me {
                            width: 55px;
                            border-radius: 100px;
                            border: 3px solid $main-color;
                        }
                    }

                    .nav-right-link--me {
                        @include flexLayout();
                        margin-right: 0px;

                        .me {
                            margin-right: 20px;
                        }

                        .infor {
                            background-color: $main-color;
                            padding: 8px;
                            color: white;
                            border-radius: 5px;
                            @include flexLayout();

                            h1 {
                                font-size: 1.7em;
                            }

                            .icon {
                                margin-left: 8px;
                            }

                            // margin-right: 20px;
                        }
                    }
                }
            }

            .admin-feature {
                // border: 1px solid red;
                font-size: 10px;
                margin: 50px 0;
                @include flexLayout();
                justify-content: space-between;

                .feature-title {
                    h1 {
                        font-size: $main-fs;
                        color: #fff;
                        background-color: #293042;
                        padding: 8px 16px;
                        border-radius: 4px;
                    }
                }

                .nav-list {
                    @include flexLayout();

                    .nav-item {
                        .nav-link {
                            @include flexLayout();
                            padding: 8px 16px;
                            background-color: $main-color;
                            color: white;
                            border-radius: 4px;
                            transition: all 0.4s linear;
                            cursor: pointer;

                            span {
                                font-size: 1.4em;
                                text-transform: uppercase;
                            }

                            .icon {
                                font-size: 1.5em;
                                margin-left: 5px;
                            }

                            &:hover {
                                background-color: #293042;
                                transform: scale(1.1);
                            }
                        }

                        .nav-link--add {
                            background-color: rgb(60, 60, 248);
                        }

                        .nav-link--fill {
                            background-color: blueviolet;
                        }

                        .nav-link--ref {
                            background-color: green;
                        }
                    }

                    .nav-item+.nav-item {
                        margin-left: 20px;
                    }
                }
            }

            .admin-product {

                // border: 1px solid red;
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
                            }

                            .type-product {
                                text-transform: uppercase;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>