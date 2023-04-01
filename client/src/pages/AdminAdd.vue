<template>
    <main class="admin-add-wrapper">
        <section class="admin-add">
            <FormAdmin 
                :product="product"
                @submit:product="uploadProduct"
                :titleForm="titleForm"
            />
            <!-- <ContactForm :contact="contact" @submit:contact="uploadContact" /> -->
        </section>
    </main>
</template>
<script>
import FormAdmin from '../components/FormAdmin.vue';
import ProductService from '../services/product.service';
export default {
    name: "AdminAdd",
    components: { FormAdmin },
    data() {
        const url = this.$route.path;
        return {
            product: {},
            titleForm: "Thêm sản phẩm",
            url,
        }
    },
    methods: {
        async uploadProduct(data) {
            try {
                await ProductService.create(data)
                this.$swal('Admin', 'Đã thêm sản phẩm thành công', 'success');
                // location.reload();
            }
            catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        if(this.urlAdmin === '/admin/add') {
            const headerNode = document.querySelector('.header');
            const footerNode = document.querySelector('.footer');
            headerNode.style = 'display: none';
            footerNode.style = 'display: none';
        }
    },
}
</script>
<style lang="scss" scoped>
</style>
