<!-- Template -->
<template>
    <section class="my-project">
        <Header />
        <router-view></router-view>
        <Footer />
    </section>
</template>

<!-- Script -->
<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
    name: 'App',
    components: { Header, Footer },
    watch: {
        $route(to, from) {
            document.title = to.meta.title;
            window.scrollTo(0,0);
        },

    }
}

</script>

<!-- Style -->
<style lang="scss">
@import './assets/css/bootstrap5-grid.min.css';
@import './assets/scss/main.scss';

</style>