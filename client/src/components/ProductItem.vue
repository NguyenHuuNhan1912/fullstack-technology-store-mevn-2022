<template>
    <router-link :to="{name: 'ProductDetail', params: {id: data._id}}" class="product-item">
        <div>
            <img :src="imgPath" alt="img-apple">
        </div>
        <h1 :class="`name name--${data.trademark}`">{{data.name}}</h1>
        <p :class="`price price--${data.trademark}`">{{`${Number(data.price).toLocaleString()} Đ`}}</p>
    </router-link >
</template>
<script>
export default {
    name: 'Productdata',
    props: {
        data: {type: Object}
    },
    mounted() {
        // console.log(this.data.trademark);
    },
    computed: {
        imgPath() {
            return "data:image/png;base64," + this.data.img;
        }
    }
}
</script>
<style>

</style>