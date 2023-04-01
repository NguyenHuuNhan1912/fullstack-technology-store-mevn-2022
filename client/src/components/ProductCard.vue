<template>
    <section class="information">
        <section class="information__title">
            <h4>Thông tin sản phẩm</h4>
        </section>
        <font-awesome-icon icon="fa-solid fa-circle-xmark" class="icon" @click="$emit('exitProductDetail')"/>
        <ul class="information-list">
            <li class="information-item">
                <img :src="convert(product.img)" alt="img-product">
            </li>
            <li class="information-item">Tên sản phẩm: {{product.name}}</li>
            <li class="information-item">Loại sản phẩm: {{product.type.toUpperCase()}}</li>
            <li class="information-item">Thương hiệu sản phẩm: {{product.trademark.charAt(0).toUpperCase() + product.trademark.slice(1)}}</li>
            <li class="information-item">Giá sản phẩm: {{Number(product.price).toLocaleString()}} VNĐ</li>
            <li v-if="product.storage" class="information-item">Thông số lưu trữ: {{product.storage}}</li>
            <li v-if="product.cpu" class="information-item">Thông số CPU: {{product.cpu}}</li>
            <li v-if="product.screen" class="information-item">Thông số màn hình: {{product.screen}}</li>
            <li v-if="product.ram" class="information-item">RAM: {{product.ram}}</li>
            <li v-if="product.graphics" class="information-item">Thông số đồ họa: {{product.graphics}}</li>
            <li v-if="product.os" class="information-item">Hệ điều hành: {{product.os}}</li>
            <li v-if="product.pin" class="information-item">Thông số pin: {{product.pin}}</li>
            <li v-if="product.mass" class="information-item">Khối lượng: {{product.mass}}</li>
            <li v-if="product.chip" class="information-item">Chip: {{product.chip}}</li>
            <li v-if="product.cameraAfter" class="information-item">Camera sau: {{product.cameraAfter}}</li>
            <li v-if="product.cameraBefore" class="information-item">Camera trước: {{product.cameraBefore}}</li>
            <li v-if="product.connect" class="information-item">Kiểu kết nối: {{product.connect}}</li>
            <li v-if="product.led" class="information-item">Led: {{product.led}}</li>
            <li v-if="product.keyboardType" class="information-item">Loại bàn phím: {{product.keyboardType}}</li>
            <li v-if="product.keyboardSwitch" class="information-item">Switch bàn phím: {{product.keyboardSwitch}}</li>
            <li v-if="product.face" class="information-item">Mặt đồng hồ: {{product.face}}</li>
            <li v-if="product.feature" class="information-item">Tính năng: {{product.feature}}</li>
        </ul>
    </section>
</template>
<script>
    export default {
        name: 'ProductCard',
        props: {
            product: { type: Object, required: true },
        },
        emits: ['exitProductDetail'],
        methods: {
            convert(img) {
                return "data:image/png;base64,"+img;
            },
        }
    }   
</script>
<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
@import '../assets/scss/variable.scss';
    .information {
        // border: 1px solid red;
        font-size: 10px;
        margin: 30px;    
        .icon {
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 2.3em;
            transition: all 0.3s linear;
            &:hover {
                color: red;
                transform: scale(1.1);
            }
        }
        &__title {
            text-transform: uppercase;
            text-align: center;
            font-size: 2.3em;
        }
        .information-list {
            .information-item {
                font-size: 1.6em;
            }
            .information-item +.information-item {
                margin-top: 15px;   
            }
            img {
                display: block;
                border-radius: 100px;
                width: 80px;
                border: 3px solid white;
            }
        }
    }
</style>