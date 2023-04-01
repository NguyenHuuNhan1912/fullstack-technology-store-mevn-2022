<template>
    <main class="main">
        <SelectSpeed />
        <section class="recruit">
            <section class="recruit__introduce">
                <section class="row">
                    <article class="col-lg-6">
                        <div>
                            <div class="introduce-infor">
                                <h1 v-text="title"></h1>
                                <p v-text="des"></p>
                                <a href="#see-more">
                                    <button class="btn btn-animation">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span>Xem chi tiết</span>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </article>
                    <article class="col-lg-6">
                        <div data-aos="fade-left" data-aos-duration="2000">
                            <div class="recruit-me">
                                <img src="../assets/imgs/recruit/me.png" alt="me">
                            </div>
                        </div>
                    </article>
                </section>
            </section>
            <section class="recruit__benefit" id="see-more">
                <section class="row">
                    <article class="col-lg-3 col-md-6" v-for="(item, index) in dataRecruitBenefit" :key="index">
                        <div data-aos="flip-left" data-aos-easing="linear" data-aos-duration="1500">
                            <div class="benefit-content">
                                <img :src="item.dirImg" alt="img-recruit">
                                <h1>{{item.title}}</h1>
                                <p> {{item.des}}</p>
                            </div>
                        </div>
                    </article>

                </section>
            </section>
            <section class="recruit__position">
                <div class="swiper">
                    <!-- Additional required wrapper -->
                    <div class="swiper-wrapper">
                        <!-- Slides -->
                        <div class="swiper-slide">
                            <section class="infor-staff">
                                <div class="infor-staff__head">
                                    <img src="../assets/imgs/recruit/shipper.avif" alt="">
                                </div>
                                <div class="infor-staff__body">
                                    <h1>Nhân viên giao hàng</h1>
                                    <p> Tuổi từ 18 đến 24 <br>
                                        Giới tính: Nam <br>
                                        Nhanh nhẹn, chịu khó, rành đường <br>
                                        Thời gian làm việc cố định
                                    </p>
                                    <RouterLink to="/recruit/form-recruit-staff-shipper">
                                        <button class="btn btn--recruit">Ứng tuyển</button>
                                    </RouterLink>
                                </div>
                            </section>
                        </div>
                        <div class="swiper-slide">
                            <section class="infor-staff">
                                <div class="infor-staff__head">
                                    <img src="../assets/imgs/recruit/protect.avif" alt="">
                                </div>
                                <div class="infor-staff__body">
                                    <h1>Nhân viên bảo vệ</h1>
                                    <p> Tuổi: từ 18 đến 40 <br>
                                        Giới tính: Nam <br>
                                        Vui vẻ, nhanh nhẹn, trung thực<br>
                                        Thời gian làm việc cố định
                                    </p>
                                    <RouterLink to="/recruit/form-recruit-staff-protect">
                                        <button class="btn btn--recruit">Ứng tuyển</button>
                                    </RouterLink>
                                </div>
                            </section>
                        </div>
                        <div class="swiper-slide">
                            <section class="infor-staff">
                                <div class="infor-staff__head">
                                    <img src="../assets/imgs/recruit/adsive.jpg" alt="">
                                </div>
                                <div class="infor-staff__body">
                                    <h1>Nhân viên tư vấn</h1>
                                    <p> Tuổi từ 18 đến 29 <br>
                                        Chuyên môn tốt <br>
                                        Vui vẻ, hoạt bát, sôi động<br>
                                        Thời gian làm việc cố định
                                    </p>
                                    <RouterLink to="/recruit/form-recruit-staff-adsive">
                                        <button class="btn btn--recruit">Ứng tuyển</button>
                                    </RouterLink>
                                </div>
                            </section>
                        </div>
                        <div class="swiper-slide">
                            <section class="infor-staff">
                                <div class="infor-staff__head">
                                    <img src="../assets/imgs/recruit/accountant.avif" alt="">
                                </div>
                                <div class="infor-staff__body">
                                    <h1>Kế toán</h1>
                                    <p>Tuổi từ 18 đến 24<br>
                                        Có kinh nghiệm<br>
                                        Trung thực, nhạy bén, cẩn thận<br>
                                        Thời gian làm việc cố định
                                    </p>
                                    <RouterLink to="/recruit/form-recruit-accountant">
                                        <button class="btn btn--recruit">Ứng tuyển</button>
                                    </RouterLink>
                                </div>
                            </section>
                        </div>
                        <div class="swiper-slide">
                            <section class="infor-staff">
                                <div class="infor-staff__head">
                                    <img src="../assets/imgs/recruit/manage.jpg" alt="">
                                </div>
                                <div class="infor-staff__body">
                                    <h1>Quản lý</h1>
                                    <p> Tuổi 30 đến 40 <br>
                                        Có kinh nghiệm<br>
                                        Nghiêm khắc, quyết đoán<br>
                                        Thời gian làm việc cố định
                                    </p>
                                    <RouterLink to="/recruit/form-recruit-manage">
                                        <button class="btn btn--recruit">Ứng tuyển</button>
                                    </RouterLink>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev">
                        <font-awesome-icon icon="fa-solid fa-arrow-left" class="icon" />
                    </div>
                    <div class="swiper-button-next">
                        <font-awesome-icon icon="fa-solid fa-arrow-right" class="icon" />
                    </div>
                </div>

            </section>
        </section>
    </main>
</template>

<script>
import SelectSpeed from '../components/SelectSpeed.vue';
import RecruitService from "@/services/recruit.service";
import '../assets/js/swiper';
import AOS from "aos";
export default {
    name: "Recruit",
    components: { SelectSpeed },
    data() {
        var dataRecruitBenefit = [
            { dirImg: '/src/assets/imgs/recruit/profess.png', },
            { dirImg: '/src/assets/imgs/recruit/money.png', },
            { dirImg: '/src/assets/imgs/recruit/develop.png', },
            { dirImg: '/src/assets/imgs/recruit/creation.png', },
        ];
        var dataForm = [
            {position: 'Nhân viên giao hàng', des: 'Tuổi từ 18 đến 24 <br> Giới tính: Nam <br> Nhanh nhẹn, chịu khó, rành đường <br> Thời gian làm việc cố định', dirImg: '../srcssets/imgs/recruit/shipper.avif', link: '/recruit/form-recruit-staff-shipper'},
            {position: 'Nhân viên bảo vệ', des: 'Tuổi: từ 18 đến 40 <br> Giới tính: Nam <br> Vui vẻ, nhanh nhẹn, trung thực<br> Thời gian làm việc cố định', dirImg: '../srcssets/imgs/recruit/protect.avif', link: '/recruit/form-recruit-staff-protect'},
            {position: 'Nhân viên tư vấn', des: 'Tuổi từ 18 đến 29 <br> Chuyên môn tốt <br> Vui vẻ, hoạt bát, sôi động<br> Thời gian làm việc cố định', dirImg: '/src/assets/imgs/recruit/adsive.jpg', link: '/recruit/form-recruit-staff-adsive'},
            {position: 'Kế toán', des: 'Tuổi từ 18 đến 24<br> Có kinh nghiệm<br> Trung thực, nhạy bén, cẩn thận<br> Thời gian làm việc cố định', dirImg: '../as/srcts/imgs/recruit/accountant.avif', link: '/recruit/form-recruit-accountant'},
            {position: 'Quản lý', des: 'Tuổi 30 đến 40 <br> Có kinh nghiệm<br> Nghiêm khắc, quyết đoán<br> Thời gian làm việc cố định', dirImg: '/src/assets/imgs/recruit/manage.jpg', link: '/recruit/form-recruit-manage'},
        ];
        return {
            recruit: [],
            dataRecruitBenefit,
            title: "",
            des: "",
            dataForm
        }
    },
    methods: {
        async retrieveRecruit() {
            try {
                this.recruit = await RecruitService.getAll();
                this.dataRecruitBenefit.forEach((item, index) => {
                    item.title = this.recruit[index].title;
                    item.des = this.recruit[index].des;
                })
                this.title = this.recruit[this.dataRecruitBenefit.length].title;
                this.des = this.recruit[this.dataRecruitBenefit.length].des;
                // console.log(this.recruit);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveRecruit();
        }
    },
    mounted() {
        AOS.init();
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            effect: 'coverflow',
            // cssMode: true,
            speed: 2000,
            // If we need pagination
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // >= 992
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    effect: "",
                },
                320: {
                    slidesPerView: "auto",
                    spaceBetween: 0,
                    effect: "",
                    // pagination: {
                    //     enabled: false,
                    // },
                }

            },
            // And if we need scrollbar
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        });
        this.refreshList();
    },
}
</script>

<style lang="scss">
@import '../assets/css/swiper.css';
@import '../assets/scss/recruit.scss';
</style>