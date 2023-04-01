<template>
    <main class="main">
        <section class="admin-edit" v-if="product">
            <FormAdmin :product="product" @submit:product="updateProduct" @delete:product="deleteProduct"
                :titleForm="titleForm" />
            <!-- <ContactForm :contact="contact" @submit:contact="uploadContact" /> -->
        </section>
    </main>
</template>
<script>
import FormAdmin from '../components/FormAdmin.vue';
import ProductService from '../services/product.service';

export default {
    name: 'AdminEdit',
    components: { FormAdmin },
    props: {
        id: { type: String, required: true },
    },
    data() {
        const url = this.$route.path;
        return {
            product: null,
            titleForm: "Hiệu chỉnh sản phẩm",
            url
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                // this.$router.push({
                //     name: "notfound",
                //     params: {
                //         pathMatch: this.$route.path.split("/").slice(1)
                //     },
                //     query: this.$route.query,
                //     hash: this.$route.hash,
                // });
            }
        },
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                this.$swal('Admin', 'Đã cập nhật sản phẩm thành công', 'success');
            } catch (error) {
                console.log(error);
            }
        },
        alertDisplay() {
            this.$swal({
                title: '<i>ADMIN</i>',
                // add a custom html tags by defining a html method.
                html: 'Bạn muốn xóa sản phẩm này ?',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
            })
        },
        async deleteProduct() {
            if (confirm("Bạn muốn xóa sản phẩm này ?")) {
                try {
                    await ProductService.delete(this.product._id);
                    this.$router.push({ name: "Admin" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    mounted() {
        if(this.urlAdmin === '/admin') {
            const headerNode = document.querySelector('.header');
            const footerNode = document.querySelector('.footer');
            headerNode.style = 'display: none';
            footerNode.style = 'display: none';
        }
    },  
    created() {
        this.getProduct(this.id);
    },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
@import '../assets/scss/variable.scss';

h1 {
    background-color: $main-color;
    color: white;
    text-align: center;
    padding: 10px;
    margin: 0px 550px;
    margin-top: 50px;
    border-radius: 5px;
}
</style>