<template>
    <main class="main">
        <SelectSpeed />
        <section class="introduce">
            <div data-aos="zoom-in" data-aos-duration="2000">
                <section class="introduce__founder">
                    <div class="founder">
                        <div class="founder__text">
                            <h1>Nguyễn Hữu Nhân</h1>
                            <p>Cửa hàng công nghệ hàng đầu Việt Nam</p>
                        </div>
                        <img src="../assets/imgs/avt/me.jpg" alt="founder">
                    </div>
                </section>
            </div>
            <section class="introduce__main">
                <section class="row">
                    <!-- Render -->
                    <ItemIntroduce 
                        v-for="(item, index) in itemsIntroduce"
                        :key="index"
                        :classItemFirst="item.classItemFirst"
                        :aosTargetFirst="item.aosTargetFirst"
                        :dirImg="item.dirImg"
                        :classItemLast="item.classItemLast"
                        :aosTargetLast="item.aosTargetLast"
                        :pClass="item.pClass"
                        :pContent="item.pContent"
                    />
                </section>
            </section>
        </section>
    </main>
</template>
<script>
import SelectSpeed from '../components/SelectSpeed.vue';
import AOS from "aos";
import ItemIntroduce from '../components/ItemIntroduce.vue';
import IntroduceService from "@/services/introduce.service";
export default {
    name: "Introduce",
    components: { SelectSpeed, ItemIntroduce },
    data() {
        return {
            introduce: [],
            itemsIntroduce: [
                {classItemFirst: 'col-xl-7 col-lg-6',  aosTargetFirst: 'fade-right',  dirImg: '/src/assets/imgs/introduce/achievement.jpg',  classItemLast: 'col-xl-5 col-lg-6',  aosTargetLast: 'fade-left', pClass: 'des-1', pContent: '', },
                {classItemFirst: 'col-xl-7 col-lg-6',  aosTargetFirst: 'fade-right',  dirImg: '/src/assets/imgs/introduce/development.jpg',  classItemLast: 'col-xl-5 col-lg-6',  aosTargetLast: 'fade-left', pClass: 'des-2', pContent: '', },
                {classItemFirst: 'col-xl-7 col-lg-6',  aosTargetFirst: 'fade-right',  dirImg: '/src/assets/imgs/introduce/dream.jpg',  classItemLast: 'col-xl-5 col-lg-6',  aosTargetLast: 'fade-left', pClass: 'des-3', pContent: '', },
                {classItemFirst: 'col-xl-7 col-lg-6',  aosTargetFirst: 'fade-right',  dirImg: '/src/assets/imgs/introduce/major.jpg',  classItemLast: 'col-xl-5 col-lg-6',  aosTargetLast: 'fade-left', pClass: 'des-4', pContent: '', },
                {classItemFirst: 'col-xl-7 col-lg-6',  aosTargetFirst: 'fade-right',  dirImg: '/src/assets/imgs/introduce/number.jpg',  classItemLast: 'col-xl-5 col-lg-6',  aosTargetLast: 'fade-left', pClass: 'des-5', pContent: '', },
                {classItemFirst: 'col-xl-7 col-lg-6',  aosTargetFirst: 'fade-right',  dirImg: '/src/assets/imgs/introduce/organization.jpg',  classItemLast: 'col-xl-5 col-lg-6',  aosTargetLast: 'fade-left', pClass: 'des-6', pContent: '', },
                {classItemFirst: 'col-xl-7 col-lg-6',  aosTargetFirst: 'fade-right',  dirImg: '/src/assets/imgs/introduce/target.jpg',  classItemLast: 'col-xl-5 col-lg-6',  aosTargetLast: 'fade-left', pClass: 'des-7', pContent: '', },
                {classItemFirst: 'col-xl-7 col-lg-6',  aosTargetFirst: 'fade-right',  dirImg: '/src/assets/imgs/introduce/value.jpg',  classItemLast: 'col-xl-5 col-lg-6',  aosTargetLast: 'fade-left', pClass: 'des-8', pContent: '', },
            ]
        };
    },
    methods: {
        async retrieveIntroduce() {
            try {
                this.introduce = await IntroduceService.getAll();
                this.itemsIntroduce.forEach((item, index) => {
                    item.pContent = this.introduce[index].des;
                })
                // console.log(this.introduce);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveIntroduce();
        }
    },
    mounted() {
        AOS.init();
        this.refreshList();
    },
}
</script>
<style lang="scss">
@import '../assets/scss/introduce.scss';
</style>
