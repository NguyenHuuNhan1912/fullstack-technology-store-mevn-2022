<template>
    <header class="header">
        <nav class="nav-header">
            <nav class="nav-function">
                <nav class="nav-logo">
                    <router-link :to="{name: 'Homepage'}">
                        <img src="../assets/imgs/logo/logo.png" alt="logo">
                    </router-link>
                </nav>
                <nav class="nav-search">
                    <section class="category-search">
                        <input type="text" placeholder="Nhập sản phẩm cần tìm . . ." id="search">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="icon" />
                    </section>
                </nav>
                <nav class="nav-other">
                    <nav class="sign-system" v-if="isUser">
                        <router-link to="/signin" class="signin">
                            <article class="sign-head">
                                <img src="../assets/imgs/header/user.png" alt="" class="icon">
                            </article>
                            <article class="sign-body">
                                <p>Đăng nhập</p>
                                <p>Đăng kí</p>
                            </article>
                        </router-link>
                    </nav>
                    <nav class="sign-system" v-else>
                        <router-link to="#" class="signin" @click="showInforUser">
                            <article class="sign-head">
                                <img src="../assets/imgs/avt/me.jpg" alt="" class="icon">
                            </article>
                            <article class="sign-body">
                                <p>Xin chào</p>
                                <p>{{ name }}</p>
                            </article>
                        </router-link>
                        <section class="infor-user" v-show="isShow">
                            <font-awesome-icon icon="fa-solid fa-caret-up" class="icon-caret" />
                            <section class="infor-user__body">
                                <ul class="nav-list">
                                    <li class="nav-item">
                                        <a href="#">
                                            <font-awesome-icon icon="fa-solid fa-user" class="icon" />
                                            <span>Thông tin tài khoản</span>
                                        </a>
                                        <a href="#">
                                            <font-awesome-icon icon="fa-solid fa-bag-shopping" class="icon" />
                                            <span>Quản lý đơn hàng</span>
                                        </a>
                                        <a href="#">
                                            <font-awesome-icon icon="fa-solid fa-bell" class="icon" />
                                            <span>Thông báo</span>
                                        </a>
                                    </li>
                                </ul>
                            </section>
                            <button class="btn btn--logout" ref="logout" @click="logoutEvent">
                                <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="icon"/>
                                <span>đăng xuất</span>
                            </button>
                        </section>
                    </nav>
                    <nav class="hotline">
                        <a href="tel:0342040063" class="hotline-me">
                            <article class="hotline-head">
                                <img src="../assets/imgs/header/hotline.png" alt="" class="icon">
                            </article>
                            <article class="hotline-body">
                                <p>Hotline</p>
                                <p>0342 040 063</p>
                            </article>
                        </a>
                    </nav>
                    <nav class="cart">
                        <router-link to="/cart" class="cart-product">
                            <article class="card-head">
                                <img src="../assets/imgs/header/cart.png" alt="" class="icon">
                            </article>
                            <article class="card-body">
                                <p>Giỏ hàng</p>
                                <p>của bạn</p>
                            </article>
                        </router-link>
                    </nav>
                </nav>
            </nav>
            <nav class="nav-info">
                <section class="wrap-category">
                    <section class="category">
                        <article class="category-select">
                            <font-awesome-icon icon="fa-solid fa-braille" class="icon" />
                            <p>Danh mục sản phẩm</p>
                        </article>
                        <article class="category-menu">
                            <!-- Reder product -->
                            <section class="product" v-for="(item, index) in dataCategory" :key="index">
                                <section class="product-select">
                                    <div class="product-select__head">
                                        <font-awesome-icon :icon="item.iconProduct" class="icon" />
                                        <p>{{ item.nameProduct }}</p>
                                    </div>
                                    <div class="product-select__body">
                                        <font-awesome-icon icon="fa-solid fa-arrow-right" class="icon" />
                                    </div>
                                </section>
                                <section :class="`product-menu product-menu--${item.classNameProduct} p-3`">
                                    <div class="row g-3">
                                        <div class="col-xl-3 col-3" v-for="(item, index) in item.childProduct"
                                            :key="index">
                                            <ul :class="`product-list product-list--${item.classChild}`">
                                                <item-header :dataItemHeader="item.dataChild" />
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </section>
                        </article>
                    </section>
                </section>
                <ul class="nav-list">
                    <li class="nav-item" v-for="(item, index) in linkHeader" :key="index">
                        <router-link :to="{name: item.name}" class="nav-link">
                            <font-awesome-icon :icon="item.icon" class="icon" />
                            <span>{{ item.title }}</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </nav>
    </header>
</template>
<script>
import ItemHeader from './ItemHeader.vue';
export default {
    name: "Header",
    components: { ItemHeader },
    data() {
        const linkHeader = [
            { name: 'Homepage', title: 'Trang chủ', icon: 'fa-solid fa-house',},
            { name: 'Introduce', title: 'Giới thiệu', icon: 'fa-solid fa-circle-info'},
            { name: 'Promotion', title: 'Khuyến mãi', icon: 'fa-solid fa-hand-holding-dollar',},
            { name: 'Recruit', title: 'Tuyển dụng', icon: 'fa-solid fa-user-plus'},
            { name: 'Contact', title: 'Liên hệ', icon: 'fa-solid fa-circle-nodes'}
        ];
        const dataCategory = [
            {
                iconProduct: 'fa-solid fa-laptop',
                classNameProduct: 'laptop',
                nameProduct: 'laptop',
                childProduct: [
                    {
                        classChild: 'trademark',
                        dataChild: [
                            {
                                class: 'first-item', name: 'Theo thương hiệu', icon: 'fa-solid fa-trademark',
                                url: { type: 'laptop', name: 'apple'}
                            },
                            {
                                class: 'item', name: 'Apple', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'apple'}
                            },
                            {
                                class: 'item', name: 'Asus', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'asus'}
                            },
                            {
                                class: 'item', name: 'Dell', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'dell'}
                            },
                            {
                                class: 'item', name: 'Huawei', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'huawei'}
                            },
                            {
                                class: 'item', name: 'Lenovo', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'lenovo'}
                            },
                            {
                                class: 'item', name: 'MSI', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                        ]
                    },
                    {
                        classChild: 'config',
                        dataChild: [
                            {
                                class: 'first-item', name: 'Theo cấu hình', icon: 'fa-solid fa-gear',
                                url: { type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Intel Pentium', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Intel Core i3', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Intel Core i5', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Intel Core i7', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: 'AMD Ryzen 3', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: 'AMD Ryzen 5', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: 'AMD Ryzen 7', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop',name: 'msi'}
                            },
                        ]
                    },
                    {
                        classChild: 'demand',
                        dataChild: [
                            {
                                class: 'first-item', name: 'Theo nhu cầu', icon: 'fa-solid fa-circle-question',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Laptop Gaming', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Laptop đồ họa', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Laptop 2 trong 1' ,
                                icon: 'a-solid fa-circle-check', url: { type: 'laptop',name: 'msi'
                                }
                            },
                            {
                                class: 'item', name: 'Laptop văn phòng', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Laptop mỏng nhẹ', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Laptop Workstation', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Laptop mini', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                        ]
                    },
                    {
                        classChild: 'price',
                        dataChild: [
                            {
                                class: 'first-item', name: 'Theo giá',
                                icon: 'fa-solid fa-sack-dollar', 
                                url: {type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: '10 triệu',
                                icon: 'a-solid fa-circle-check', 
                                url: {type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: '10 - 15 triệu',
                                icon: 'a-solid fa-circle-check', 
                                url: {type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: '15 - 20 triệu',
                                icon: 'a-solid fa-circle-check', 
                                url: {type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: '20 - 25 triệu',
                                icon: 'a-solid fa-circle-check', 
                                url: {type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: '25 - 30 triệu',
                                icon: 'a-solid fa-circle-check', 
                                url: {type: 'laptop',name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Trên 30 triệu', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                        ]
                    },
                ]
            },
            {
                iconProduct: 'fa-solid fa-mobile',
                classNameProduct: 'mobile',
                nameProduct: 'điện thoại',
                childProduct: [
                    {
                        classChild: 'trademark',
                        dataChild: [
                            {
                                class: 'first-item', name: 'Theo thương hiệu', icon: 'fa-solid fa-trademark',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Apple', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Oppo', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Realme', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Xiaomi', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Samsung', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                        ]
                    },
                    {
                        classChild: 'accessory',
                        dataChild: [
                            { class: 'first-item', name: 'Theo phụ kiện', icon: 'fa-solid fa-headphones-simple', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Tai nghe', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Tai nghe không dây', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Sạc không dây', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Bao da - ốp lưng', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Cáp sạc', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Cục sạc', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    },
                    {
                        classChild: 'price',
                        dataChild: [
                            { class: 'first-item', name: 'Theo giá', icon: 'fa-solid fa-sack-dollar', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '10 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '10 - 15 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '15 - 20 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '20 - 25 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '25 - 30 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Trên 30 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    },
                ]
            },
            {

                iconProduct: 'fa-solid fa-tablet-screen-button',
                classNameProduct: 'tablet',
                nameProduct: 'máy tính bảng',
                childProduct: [
                    {
                        classChild: 'trademark',
                        dataChild: [
                            {
                                class: 'first-item', name: 'Theo thương hiệu', icon: 'fa-solid fa-trademark',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Apple', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Huewei', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Lenovo', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Samsung', icon: 'a-solid fa-circle-check',
                                url: { type: 'laptop', name: 'msi'}
                            },
                        ]
                    },
                    {
                        classChild: 'price',
                        dataChild: [
                            {
                                class: 'first-item', name: 'Theo giá', icon: 'fa-solid fa-sack-dollar',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: '10 triệu', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: '10 - 15 triệu', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: '15 - 20 triệu', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: '20 - 25 triệu', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: '25 - 30 triệu', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Trên 30 triệu', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                        ]
                    },
                    {
                        classChild: 'demand',
                        dataChild: [
                            {
                                class: 'first-item', name: 'Theo nhu cầu', icon: 'fa-solid fa-circle-question',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Giải trí', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Học tập', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                            {
                                class: 'item', name: 'Làm việc', icon: 'a-solid fa-circle-check',
                                url: {type: 'laptop', name: 'msi'}
                            },
                        ]
                    },
                ]
            },
            {
                iconProduct: 'fa-solid fa-computer-mouse',
                classNameProduct: 'mouse',
                nameProduct: 'chuột',
                childProduct: [
                    {
                        classChild: 'trademark',
                        dataChild: [
                            { class: 'first-item', name: 'Theo thương hiệu', icon: 'fa-solid fa-trademark', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Dareu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Logitech', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Microsoft', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Rapoo', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Zadez', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    },
                    {
                        classChild: 'price',
                        dataChild: [
                            { class: 'first-item', name: 'Theo giá', icon: 'fa-solid fa-sack-dollar', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Dưới 1 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '1 - 3 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '5 - 7 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '7 - 10 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Trên 10 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    },
                    {
                        classChild: 'demand',
                        dataChild: [
                            { class: 'first-item', name: 'Theo nhu cầu', icon: 'fa-solid fa-circle-question', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Lập trình viên', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Game thủ', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Văn phòng', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Có dây', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Không dây', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    },
                ]
            },
            {

                iconProduct: 'fa-solid fa-keyboard',
                classNameProduct: 'keyboard',
                nameProduct: 'Bàn phím',
                childProduct: [
                    {
                        classChild: 'trademark',
                        dataChild: [
                            { class: 'first-item', name: 'Theo thương hiệu', icon: 'fa-solid fa-trademark', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Logitech', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Microfoft', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Razer', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    },
                    {
                        classChild: 'price',
                        dataChild: [
                            { class: 'first-item', name: 'Theo giá', icon: 'fa-solid fa-sack-dollar', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Dưới 1 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '1 - 3 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '5 - 7 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '7 - 10 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Trên 10 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    },
                    {
                        classChild: 'demand',
                        dataChild: [
                            { class: 'first-item', name: 'Theo nhu cầu', icon: 'fa-solid fa-circle-question', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Lập trình viên', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Game thủ', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Văn phòng', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Có dây', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Không dây', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    }
                ]
            },
            {

                iconProduct: 'fa-solid fa-clock',
                classNameProduct: 'smartwatch',
                nameProduct: 'Đồng hồ',
                childProduct: [
                    {
                        classChild: 'trademark',
                        dataChild: [
                            { class: 'first-item', name: 'Theo thương hiệu', icon: 'fa-solid fa-trademark', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Amazfit', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Befit', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Samsung', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Xiaomi', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    },
                    {
                        classChild: 'price',
                        dataChild: [
                            { class: 'first-item', name: 'Theo giá', icon: 'fa-solid fa-sack-dollar', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '10 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '10 - 15 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '15 - 20 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '20 - 25 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: '25 - 30 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                            { class: 'item', name: 'Trên 30 triệu', icon: 'a-solid fa-circle-check', url: { type: 'laptop', name: 'msi' } },
                        ]
                    },

                ]
            },
        ]
        const name = JSON.parse(localStorage.getItem("user"));
        return {
            name,
            isUser: true,
            isShow: false,
            linkHeader,
            dataCategory
        };
    },
    watch: {
        $route(to, from) {
            if (this.name !== null) {
                this.isUser = false;
            }
        },
    },
    methods: {
        logoutEvent() {
            localStorage.removeItem("user");
            // localStorage.removeItem("arrProductId");
            location.replace("http://127.0.0.1:1010/");
        },
        showInforUser() {
            this.isShow = !this.isShow;
        }
    }
}
</script>
<style lang="scss">
@import '../assets/scss/header.scss';
</style>
