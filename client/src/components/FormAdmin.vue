<template>
    <section class="admin-form-product">
        <form action="" class="form-product" @submit="submitProduct">
            <!-- <font-awesome-icon icon="fa-solid fa-circle-xmark" class="x-icon" @click="$emit('exitAddProduct')" /> -->
            <section class="row">
                <article class="col-lg-12">
                    <div class="form-group">
                        <h1>{{titleForm}}</h1>
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-type" placeholder="Nhập loại" v-model="productLocal.type">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-trademark" placeholder="Nhập thương hiệu"
                            v-model="productLocal.trademark">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-name" placeholder="Nhập tên" v-model="productLocal.name">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-price" placeholder="Nhập giá" v-model="productLocal.price">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="file" name="input-img" ref="img" @blur="checkValidateFile">
                        <p class="error-message hide"></p>
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-cpu" placeholder="Nhập core máy tính" v-model="productLocal.cpu">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-screen" placeholder="Nhập thông số màn hình"
                            v-model="productLocal.screen">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-ram" placeholder="Nhập ram" v-model="productLocal.ram">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-graphics" placeholder="Nhập thông số đồ họa"
                            v-model="productLocal.graphics">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-storage" placeholder="Nhập thông số lưu trữ"
                            v-model="productLocal.storage">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-os" placeholder="Nhập hệ điều hành" v-model="productLocal.os">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-pin" placeholder="Nhập pin" v-model="productLocal.pin">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-mass" placeholder="Nhập trọng lượng" v-model="productLocal.mass">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-chip" placeholder="Nhập chip" v-model="productLocal.chip">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-cameraAfter" placeholder="Nhập camera sau"
                            v-model="productLocal.cameraAfter">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-cameraBefore" placeholder="Nhập camera trước"
                            v-model="productLocal.cameraBefore">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-connect" placeholder="Nhập cách kết nối"
                            v-model="productLocal.connect">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-led" placeholder="Nhập led" v-model="productLocal.led">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-keybroadType" placeholder="Nhập loại bàn phím"
                            v-model="productLocal.keyboardType">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-keyboardSwitch" placeholder="Nhập switch bàn phím"
                            v-model="productLocal.keyboardSwitch">
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input type="text" name="input-face" placeholder="Nhập mặt đồng hồ" v-model="productLocal.face">
                    </div>
                </article>
                <article class="col-lg-12">
                    <div class="form-group">
                        <input type="text" name="input-feature" placeholder="Nhập tính năng đồng hồ"
                            v-model="productLocal.feature">
                    </div>
                </article>
                <article class="col-lg-12">
                    <div class="form-group">
                        <button class="btn btn--product" >Gửi</button>
                    </div>
                </article>
                <article class="col-lg-12" v-if="productLocal._id">
                    <div class="form-group">
                        <button class="btn btn--product" @click="deleteProduct">Xóa</button>
                    </div>
                </article>
            </section>
        </form>
    </section>
    <section class="bg-inside"></section>
</template>
<script>
import ProductService from '../services/product.service';
export default {
    name: 'FormAdmin',
    emits: ["submit:product", "delete:product"],
    props: {
        product: { type: Object, required: true },
        titleForm: {type: String, }
    },
    data() {
        return {
            productLocal: this.product,
            getProduct: [],
        }
    },
    methods: {
        errorMessage(inputNode, message) {
            let messNode = inputNode.nextElementSibling;
            messNode.textContent = message;
            messNode.style.color = 'red';
            messNode.classList.remove('hide');
            inputNode.style = 'border: 1px solid red';
        },
        successMessage(inputNode) {
            let messNode = inputNode.nextElementSibling;
            messNode.textContent = '';
            messNode.classList.add('hide');
            inputNode.style = 'border: 1px solid green';
        },
        checkValidateFile() {
            const img = this.$refs.img;
            if (img.files[0] === undefined) {
                this.errorMessage(img, "Không thể để trống hình ảnh");
            }
            else {
                this.successMessage(img);
            }
        },
        convertBase64(file) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.onload = () => {
                    resolve(fileReader.result);
                };

                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        },
        // async uploadFormProduct() {
        //     try {

        //         await ProductService.create(this.productLocal)
        //         this.$swal('Admin', 'Đã thêm sản phẩm thành công', 'success');
        //         // location.replace('http://127.0.0.1:3008/admin');
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        // },
        checkUploadFormProduct() {
            var nameProduct = this.getProduct.map((item) => {
                return {
                    name: item.name,
                }
            });

            var check = nameProduct.every((item) => {
                return this.productLocal.name !== item.name;
            })
            return check;
        },
        // async submit(e) {
        //     e.preventDefault();
        //     this.checkValidateFile();
        //     let check;
        //     var convertFile;
        //     var imgBase64;
        //     const img = this.$refs.img;
        //     if (img.files[0] !== undefined) {
        //         convertFile = await this.convertBase64(img.files[0]);
        //         imgBase64 = convertFile.slice(convertFile.indexOf(",") + 1);
        //         this.productLocal.img = imgBase64;
        //     }
        //     let messNode = img.nextElementSibling;
        //     check = messNode.classList.contains('hide');
        //     if (check === true) {
        //         if (this.checkUploadFormProduct() === false) {
        //             this.$swal('Admin', 'Sản phẩm đã tồn tại', 'error')
        //         }
        //         else {
        //             this.uploadFormProduct();
        //         }
        //     }
        // },
        async retrieveProduct() {
            try {
                this.getProduct = await ProductService.getAll();
                // console.log(this.getProduct);
                // this.srcImg = "data:image/png;base64," + this.getProduct[7].img;
                // console.log(this.getProduct[7].img);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProduct();
        },
        async submitProduct(e) {
            e.preventDefault();
            this.checkValidateFile();
            let check;
            var convertFile;
            var imgBase64;
            const img = this.$refs.img;
            console.log(img.files[0]);
            if (img.files[0] !== undefined) {
                convertFile = await this.convertBase64(img.files[0]);
                imgBase64 = convertFile.slice(convertFile.indexOf(",") + 1);
                console.log(convertFile);
                this.productLocal.img = imgBase64;
            }
            console.log(this.productLocal.img);
            let messNode = img.nextElementSibling;
            check = messNode.classList.contains('hide');
            if (check === true) {
                // if (this.checkUploadFormProduct() === false) {
                //     this.$swal('Admin', 'Sản phẩm đã tồn tại', 'error')
                // }
                // else {
                //     this.$emit("submit:product", this.productLocal);
                // }
                this.$emit("submit:product", this.productLocal);
            }
        },
        deleteProduct() {
            this.$emit("delete:product", this.productLocal.id);
        },
    },
    mounted() {
        this.refreshList();
        // console.log(this.product);
    }
}
</script>
<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/variable.scss';
.bg-inside {
    position: fixed;
    inset: 0;
    background-color: #293042;
    z-index: -1;
}
.admin-form-product {
    // display: none;
    margin: 50px;
    .hide {
        display: none;
    }
    .form-product {
        border: 2px solid white;
        background-color: #293042;
        border-radius: 5px;
        padding: 20px;
        // border: 1px solid red;
        font-size: 10px;
        position: relative;
        .row {
            --bs-gutter-x: 20px;
            --bs-gutter-y: 20px;
        }

        .form-group {

            // border: 1px solid red;
            .error-message {
                color: white;
                font-size: 1.5em;
                margin-top: 5px;
            }

            h1 {
                font-size: 2.5em;
                text-transform: uppercase;
                color: white;
                text-align: center;
            }

            // border: 1px solid red;
            input {
                width: 100%;
                padding: 10px;
                font-family: inherit;
                border: 1px solid grey;
                border-radius: 5px;
                outline: none;
            }

            .btn--product {
                @include button(white, $main-color, 1.6em, 10px, 10px, 5px, 0.4s);
                text-transform: uppercase;
                width: 100%;
                @include buttonLinear(green);
                border: none;

                &:hover::before {
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>