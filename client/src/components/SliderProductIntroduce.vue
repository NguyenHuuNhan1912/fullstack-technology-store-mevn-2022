<template>
    <swiper 
        :modules="modules" 
        :slides-per-view="1" 
        :space-between="20" 
        navigation 
        effect="fade"
        :pagination="{ clickable: true }" 
        @swiper="onSwiper" 
        @slideChange="onSlideChange" 
        :loop="true" 
        :speed="1000"
        :autoplay="{
            delay: 2000,    
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }">
        <swiper-slide 
            v-for="(item, index) in imgsHomepageIntroduce"
            :key="index"
        >
            <img :src="item.dirImg" alt="img-introduce">
        </swiper-slide>
    </swiper>
</template>

<script>
// import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
export default {
    name: 'SliderProductIntroduce',
    components: {Swiper, SwiperSlide},
    data() {
        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };
        const imgsHomepageIntroduce = [
            {dirImg: '/src/assets/imgs/homepage/homepage-slider/s8.webp'},
            {dirImg: '/src/assets/imgs/homepage/homepage-slider/s1.webp'},
            {dirImg: '/src/assets/imgs/homepage/homepage-slider/s2.webp'},
            {dirImg: '/src/assets/imgs/homepage/homepage-slider/s3.webp'},
            {dirImg: '/src/assets/imgs/homepage/homepage-slider/s4.webp'},
            {dirImg: '/src/assets/imgs/homepage/homepage-slider/s4.webp'},
            {dirImg: '/src/assets/imgs/homepage/homepage-slider/s6.webp'},
            {dirImg: '/src/assets/imgs/homepage/homepage-slider/s7.webp'},
        ]
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, A11y, Autoplay, EffectFade],
            imgsHomepageIntroduce
        };
    },
}
</script>