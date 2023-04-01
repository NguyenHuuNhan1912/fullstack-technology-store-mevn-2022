<template>
    <main class="main">
        <SelectSpeed></SelectSpeed>
        <section class="promotion">
            <section class="black-friday">
                <img src="../assets/imgs/promotion/black-friday.jpg" alt="black-friday">
            </section>
            <section class="sale-new">
                <ul class="nav-list row">
                    <li class="nav-item col-xl-3 col-sm-6" v-for="(item, index) in saleNew" :key="index">
                        <router-link to="/">
                            <img :src="item.dirImg" alt="img">
                            <span>{{item.des}}</span>
                        </router-link>
                    </li>
                </ul>
            </section>
            <section class="sale">
                <ul class="nav-list row">
                    <li class="nav-item col-md-6"
                        v-for="(item, index) in sale"
                        :key="index"
                    >
                        <router-link to="/">
                            <img :src="item.dirImg" alt="img-sale">
                            <p>{{item.des}}</p>
                            <button class="btn btn--skew">Xem chi tiết</button>
                        </router-link>
                    </li>
                </ul>
            </section>
        </section>
    </main>
</template>
<script>
import SelectSpeed from '../components/SelectSpeed.vue';
export default {
    name: "Promotion",
    components: { SelectSpeed },
    data() {
        const saleNew = [
            {dirImg: '/src/assets/imgs/promotion/i1.png', des: 'Săn sale online'},
            {dirImg: '/src/assets/imgs/promotion/i2.png', des: 'Laptop tụ trường'},
            {dirImg: '/src/assets/imgs/promotion/i3.png', des: 'Ưu đãi ngập trời'},
            {dirImg: '/src/assets/imgs/promotion/i4.png', des: 'Bão sale đồng hồ'},
        ];
        const sale = [
            { dirImg: '/src/assets/imgs/promotion/s1.webp', des: 'Giảm 5% với vnpay',},
            { dirImg: '/src/assets/imgs/promotion/s2.webp', des: 'Lap top dành cho sinh viên',},
            { dirImg: '/src/assets/imgs/promotion/s3.webp', des: 'Laptop gamming chiến xuyên đêm',},
            { dirImg: '/src/assets/imgs/promotion/s4.webp', des: 'Gamming gear giảm đến 44%',},
            { dirImg: '/src/assets/imgs/promotion/s5.webp', des: 'Mua rog phone 6 - rinh ngay quà xịn',},
            { dirImg: '/src/assets/imgs/promotion/s6.webp', des: 'ip14 giá sốc nhất',},
            { dirImg: '/src/assets/imgs/promotion/s7.webp', des: 'Giảm giá khủng với pvapple',},
        ];
        return {
            saleNew,
            sale
        }
    }
}
</script>
<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

.main {
    .promotion {
        // border: 1px solid red;
        .black-friday {
            img {
                width: 100%;
                display: block;
            }
        }

        .sale-new {
            margin: 80px;

            .row {
                --bs-gutter-x: 30px;
                --bs-gutter-y: 30px;
            }

            .nav-list {
                align-items: center;

                .nav-item {

                    a {
                        border-radius: 4px;
                        box-shadow: 0 0 5px 2px grey;
                        font-size: 10px;
                        text-transform: uppercase;
                        color: $main-color;
                        @include flexLayout();
                        justify-content: center;
                        padding: 10px 0;
                        transition: all 0.4s linear;
                        background-color: white;

                        img {
                            width: 65px;
                            margin-right: 15px;
                        }

                        &:hover {
                            transform: scale(1.1);
                        }

                        span {
                            font-size: $main-fs;
                        }
                    }
                }
            }
        }

        .sale {
            margin: 0 80px 80px;

            .row {
                --bs-gutter-x: 30px;
                --bs-gutter-y: 30px;
            }

            .nav-list {

                .nav-item {

                    // border: 1px solid red;
                    a {
                        // border: 1px solid red;
                        border-radius: 4px;
                        box-shadow: 0 0 5px 2px grey;
                        font-size: 10px;
                        text-transform: uppercase;
                        @include flexLayout();
                        flex-direction: column;
                        transition: all 0.4s linear;
                        align-items: initial;
                        height: 100%;
                        color: transparent;
                        @include textGradient(red, orange);

                        img {
                            width: 100%;
                            display: block;
                            border-radius: 4px 4px 0 0;
                            height: 230px;
                        }

                        p {
                            font-size: 2.3em;
                            margin: 20px;
                        }
                        .btn--skew {
                            margin: auto auto 20px 20px;
                            // button($bg-color, $color, $fs, $pd-tb, $pd-lr, $border-rd, $time)
                            @include button(transparent, $main-color, $main-fs, 10px, 16px, 4px, 0.6s);
                            @include buttonSkew($main-color, -30px, 150%, 45deg);
                        }
                    }
                }
            }
        }
    }
}

// Responsive lg
@include responsive_main_lg__ {
    .main {
        .promotion {
            .sale-new {
                margin: 60px;

                .nav-list {
                    .nav-item {

                        a {
                            font-size: 13px;
                            justify-content: space-evenly;
                            padding: 15px 0;

                            img {
                                margin-right: 0px;
                                // border: 1px solid red;
                            }
                        }
                    }
                }
            }

            .sale {
                margin: 0 60px 60px;

                .nav-list {
                    .nav-item {

                        // border: 1px solid red;
                        a {
                            font-size: 9px;
                        }
                    }
                }
            }
        }
    }
}

// Responsive md
@include responsive_main_md__ {
    .main {
        .promotion {
            .sale-new {
                margin: 50px;

                .nav-list {
                    .nav-item {

                        a {
                            font-size: 11px;
                            justify-content: space-evenly;

                            &:hover {
                                transform: initial;
                            }
                        }
                    }
                }
            }

            .sale {
                margin: 0 50px 50px;

                .nav-list {
                    .nav-item {

                        // border: 1px solid red;
                        a {
                            font-size: 8px;

                            p {
                                line-height: 1.3;
                            }
                        }
                    }
                }
            }
        }
    }
}

//responsive sm
@include responsive_main_sm__ {
    .main {
        .promotion {
            .sale-new {
                margin: 30px;

                .nav-list {
                    .nav-item {

                        a {
                            font-size: 9.5px;

                            img {
                                width: 50px;
                            }
                        }
                    }
                }
            }

            .sale {
                margin: 0 30px 30px;

                .nav-list {
                    .nav-item {
                        a {
                            p {
                                line-height: 1.3;
                            }
                        }
                    }
                }
            }
        }
    }
}

//responsive xm
@include responsive_main_xm__ {
    .main {
        .promotion {
            .sale-new {
                margin: 15px;

                .row {
                    --bs-gutter-x: 15px;
                    --bs-gutter-y: 15px;
                }

                .nav-list {
                    .nav-item {
                        a {
                            box-shadow: initial;
                            border: 1px solid $main-color;
                            font-size: 11px;

                            img {
                                width: 65px;
                            }

                            &:hover {
                                background-color: $main-color;
                                color: white;
                            }
                        }
                    }
                }
            }

            .sale {
                margin: 0 15px 15px;

                .row {
                    --bs-gutter-x: 15px;
                    --bs-gutter-y: 15px;
                }

                .nav-list {
                    .nav-item {
                        a {
                            box-shadow: initial;
                            border: 1px solid $main-color;

                            p {

                                margin: 15px;
                            }

                            .btn--skew {
                                margin: auto auto 15px 15px;
                                padding: 10px;
                                @include buttonSkew($main-color, -30px, 150%, 45deg);
                            }
                        }
                    }
                }
            }
        }
    }
}

@include responsive_xxm {
    .main {
        .promotion {
            .sale-new {

                .nav-list {
                    .nav-item {
                        a {
                            font-size: 10px;

                            img {
                                width: 60px;
                            }
                        }
                    }
                }
            }

            .sale {
                .nav-list {
                    .nav-item {
                        a {
                            font-size: 7.5px;
                        }
                    }
                }
            }
        }
    }
}
</style>
