<template>
    <footer class="footer">
        <section class="footer__content">
            <section class="row g-0">
                <section class="col-xl-4 col-lg-12 col-md-12">
                    <article class="my-store">
                        <article class="my-store-title">
                            <p>Cửa hàng công nghệ - Hữu Nhân</p>
                        </article>
                        <ul class="my-store-list">
                            <!-- Render -->
                            <ItemFooter v-for="(item, index) in itemsMystore" :key="index" :classItem="item.classItem"
                                :icon="item.icon" :des="item.des" />
                        </ul>
                    </article>
                </section>
                <section class="col-xl-4 col-lg-12 col-md-12">
                    <article class="hotline">
                        <h1>Gọi ngay</h1>
                        <p>0342 040 063</p>
                    </article>
                </section>
                <section class="col-xl-4 col-lg-6 col-md-6">
                    <article class="support">
                        <article class="support-title">
                            <p>Tổng đài hỗ trợ</p>
                        </article>
                        <ul class="support-list">
                            <ItemFooter v-for="(item, index) in itemsSupport" :key="index" :classItem="item.classItem"
                                :icon="item.icon" :des="item.des" />
                        </ul>
                    </article>
                </section>
                <section class="col-xl-4 col-lg-6 col-md-6">
                    <article class="contact-us">
                        <article class="contact-us-title">
                            <p>Liên hệ với chúng tôi</p>
                        </article>
                        <ul class="contact-us-list">
                            <ItemFooter v-for="(item, index) in itemsContact" :key="index" :classItem="item.classItem"
                                :icon="item.icon" />
                        </ul>
                    </article>
                </section>
                <section class="col-xl-4 col-lg-6 col-md-6">
                    <article class="method-pay">
                        <article class="method-pay-title">
                            <p>Phương thức thanh toán</p>
                        </article>
                        <ul class="method-pay-list">
                            <ItemFooter v-for="(item, index) in itemsMethodPay" :key="index" :classItem="item.classItem"
                                :icon="item.icon" :des="item.des" />
                        </ul>
                    </article>
                </section>
                <section class="col-xl-4 col-lg-6 col-md-6">
                    <article class="branch">
                        <article class="branch-title">
                            <p>Các chi nhánh của cửa hàng</p>
                        </article>
                        <ul class="branch-list">
                            <!-- Render -->
                            <ItemFooter 
                                v-for="(item, index) in itemsBranch" 
                                :key="index" 
                                :classItem="item.classItem"
                                :icon="item.icon" 
                                :des="item.des" 
                            />
                        </ul>
                    </article>
                </section>
            </section>
        </section>
        <section class="footer__copyright">
            <section class="copyright">
                <h1>© Copyright 2022 Huu Nhan. All rights reserved.</h1>
            </section>
        </section>
    </footer>
</template>
<script>
import ItemFooter from './ItemFooter.vue';
export default {
    name: "Footer",
    components: { ItemFooter },
    data() {
        return {
            itemsMystore: [
                { classItem: 'my-store-item', icon: 'fa-solid fa-map-location-dot', des: 'Xem đường đi chi tiết'},
                { classItem: 'my-store-item', icon: 'fa-solid fa-square-phone', des: 'Điện thoại: 0342040063'},
                { classItem: 'my-store-item', icon: 'fa-solid fa-location-pin', des: 'Địa chỉ: Đường 1010, thị trấn Phú Hòa huyện Thoại Sơn, tỉnh An Giang'},
                { classItem: 'my-store-item', icon: 'fa-solid fa-clock', des: 'Thời gian mở cửa: 8h - 23h các ngày trong tuần'},
            ],
            itemsSupport: [
                {classItem: 'support-item', icon: 'fa-solid fa-cart-flatbed', des: 'Mua hàng: 0342040064'},
                {classItem: 'support-item', icon: 'fa-solid fa-comment-dots', des: 'Hỗ Trợ KH: 0342040065'},
                {classItem: 'support-item', icon: 'fa-solid fa-compress', des: 'Khiếu nại: 0342040066'},
                {classItem: 'support-item', icon: 'fa-solid fa-shield-heart', des: 'Bảo hành: 0342040067'},
            ],
            itemsContact: [
                {classItem: 'contact-us-item', icon: 'fa-brands fa-facebook', },
                {classItem: 'contact-us-item', icon: 'fa-solid fa-square-phone', },
                {classItem: 'contact-us-item', icon: 'fa-brands fa-square-instagram', },
                {classItem: 'contact-us-item', icon: 'fa-brands fa-youtube', },
                {classItem: "contact-us-item", icon: "fa-solid fa-envelope", },
            ],
            itemsMethodPay: [
                {classItem: 'method-pay-item', icon: 'fa-solid fa-qrcode', des: 'QR code'},
                {classItem: 'method-pay-item', icon: 'fa-solid fa-money-bill', des: 'Tiền mặt'},
                {classItem: 'method-pay-item', icon: 'fa-solid fa-clock-rotate-left', des: 'Trả góp'},
                {classItem: 'method-pay-item', icon: 'fa-solid fa-building-columns', des: 'Banking'},
            ],
            itemsBranch: [
                {classItem: 'branch-item', des: 'Thành phố Long Xuyên - An Giang', icon: "fa-solid fa-chalkboard-user"},
                {classItem: 'branch-item', des: 'Thành phố Rạch Giá - Kiên Giang', icon: "fa-solid fa-chalkboard-user"},
                {classItem: 'branch-item', des: 'Thành phố Hồng Ngựa - Đồng Tháp', icon: "fa-solid fa-chalkboard-user"},
                {classItem: 'branch-item', des: 'Thành phố Vĩnh Long - Vĩnh Long', icon: "fa-solid fa-chalkboard-user"},
                {classItem: 'branch-item', des: 'Thành phố Bến Tre - Bến Tre', icon: "fa-solid fa-chalkboard-user"},
            ]
        };
    },
}
</script>
<style lang="scss">
    @import '../assets/scss/footer.scss';
</style>