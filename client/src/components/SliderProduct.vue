<template>
    <swiper 
        :modules="modules" 
        :slides-per-view="4.5" 
        :space-between="20" 
        navigation 
        :slides-per-group="4"
        @swiper="onSwiper" 
        @slideChange="onSlideChange" 
        :speed="1000"
        :breakpoints="{
            992: {
                slidesPerView: 4,
                slidesPerGroup: 4
            },
            576: {
                slidesPerView: 3,    
                slidesPerGroup: 3
            },
            320: {
                slidesPerView: 1.5,    
                slidesPerGroup: 1,
                spaceBetween: 15
            }
        }"
    >
        <swiper-slide  
            v-for="(item, index) in dataSlider" 
            :key="index"

        >
            <router-link :to="{ name: 'Product', params: { type: item.type, name: item.nameUrl } }" class="main-product">
                <div>
                    <img :src="item.dirImg" alt="img-product" :class="`img img--${className}`">
                </div>
                <h1 :class="`name name--${className}`">{{item.name}}</h1>
                <span :class="`price price--${className}`">{{standPrice(item.price)}} đ</span> 
            </router-link>
        </swiper-slide>
    </swiper>

</template>

<script>
// import Swiper core and required modules
import { Navigation, A11y } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default {

    name: 'SliderProductLaptop',
    components: { Swiper, SwiperSlide },
    props: {
        dataSlider: {
            type: Array
        },
        className: {
            type: String
        }
    },
    data() {
        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');

        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, A11y],
        };
    },
    methods: {
        standUrl(string) {
            let str1 = string.replaceAll(' ', '-');
            let str2 = str1.replaceAll('/', '-');
            return str2;
        },
        standPrice(number) {
            
            return number.toLocaleString();
        }
    },
}   
</script>