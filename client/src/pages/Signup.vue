<template>
    <main class="main">
        <SelectSpeed />
        <div class="wrapper-sign-in-up">
            <div data-aos="zoom-in" data-aos-duration="2000">
                <section class="sign-in-up">
                    <section class="logo logo--signup">
                        <img src="../assets/imgs/signup/signup.png" alt="logo-signup">
                    </section>
                    <form action="#" class="form form--signup">
                        <div class="form-group">
                            <h1>ĐĂNG KÝ</h1>
                        </div>
                        <div class="form-group">
                            <input 
                                type="text" 
                                autocomplete="off" 
                                name="input-name" 
                                placeholder="Tên tài khoản(*)" 
                                @blur="checkValidateName" 
                                @keydown="focus"
                                ref="inputName"
                                v-model="signup.username"
                            >
                            <p class="message hide"></p>
                            <font-awesome-icon icon="fa-solid fa-user" class="icon icon--user" />
                        </div>
                        <div class="form-group">
                            <input 
                                type="tel" 
                                name="input-phone" 
                                placeholder="Số điện thoại(*)"
                                ref="inputPhone"
                                @blur="checkValidatePhone"
                                @keydown="focus"
                                v-model="signup.numberphone"
                            >
                            <p class="message hide"></p>
                            <font-awesome-icon icon="fa-solid fa-square-phone" class="icon icon--phone"/>
                        </div>
                        <div class="form-group">
                            <input 
                                type="password" 
                                name="input-password" 
                                placeholder="Mật khẩu(*)"
                                @blur="checkValidatePassword"
                                @keydown="focus"
                                ref="inputPassword"
                                v-model="signup.password"
                            >
                            <p class="message hide"></p>
                            <font-awesome-icon icon="fa-solid fa-lock" class="icon icon--password" />
                        </div>
                        <div class="form-group">
                            <input 
                                type="password" 
                                name="input-password" 
                                placeholder="Nhập lại mật khẩu(*)"
                                @blur="checkValidateAgainPassword"
                                @keydown="focus"
                                ref="inputAgainPassword"
                            >
                            <p class="message hide"></p>
                            <font-awesome-icon icon="fa-solid fa-rotate-right" class="icon icon--again-password"/>
                        </div>
                        <div class="form-group">
                            <button class="btn btn--signup" @click="submit">Đăng kí</button>
                        </div>
                    </form>
                    <section class="siginin__other">
                        <router-link to="/signin">
                            <font-awesome-icon icon="fa-solid fa-reply" />
                            Quay lại đăng nhập
                        </router-link>
                    </section>
                </section>
            </div>

        </div>
    </main>
</template>
<script>
import SelectSpeed from '../components/SelectSpeed.vue';
import SigninService from '../services/signin.service';
import CartService from '../services/cart.service';

import AOS from "aos";
import { createSequenceExpression } from '@vue/compiler-core';
export default {
    name: "Signin",
    components: { SelectSpeed },
    data() {
        const regexNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const regexPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
        return {
            regexNumber,
            regexPass,
            getSignin: [],
            signup: {}
        };
    },
    methods: {
        validatePhone(myNumber) {
            return this.regexNumber.test(myNumber);
        },
        validatePass(myPass) {
            return this.regexPass.test(myPass);
        },
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
        },
        focus(e) {
            let node = e.target;
            let messNode = e.target.nextElementSibling;
            messNode.textContent = '';
            messNode.classList.add('hide');
            node.style = 'border: 1px solid blue';
        },
        checkValidateName() {
            var node = this.$refs.inputName;
            (node.value === '') ? this.errorMessage(node, "Họ tên không thể để trống") : this.successMessage(node);
        },
        checkValidatePhone() {
            var node = this.$refs.inputPhone;
            if (node.value === '')  this.errorMessage(node, "Số điện thoại không được để trống");
            else if (!this.validatePhone(node.value)) this.errorMessage(node, 'Số điện thoại không hợp lệ');
            else if (this.validatePhone(node.value)) this.successMessage(node);
            else this.successMessage(node);
            
        },
        checkValidatePassword() {
            var node = this.$refs.inputPassword;
            if(node.value === '') this.errorMessage(node, "Mật khẩu không được để trống");
            else if(!this.validatePass(node.value)) this.errorMessage(node, "Mật khẩu không đủ mạnh");
            else if(this.validatePass(node.value)) this.successMessage(node);
            else this.successMessage(node);
        },
        checkValidateAgainPassword() {
            var node = this.$refs.inputAgainPassword;
            var nodePassword = this.$refs.inputPassword;
            var password = nodePassword.value;
            if(node.value === '') this.errorMessage(node, "Mật khẩu nhập lại không được để trống !");
            else if(password !== node.value) this.errorMessage(node, "Mật khẩu không khớp, hãy nhập lại");
            else this.successMessage(node);
        },
        checkSignup() {
            var numberphoneSignin = this.getSignin.map((item) => {
                return {
                    numberphone: item.numberphone,
                }
            });
            // CSDL chua co gi thi true
            if (this.getSignin.length < 0) {
                return true;
            }
            // Chua co trong csdl thi true
            var check = numberphoneSignin.every((item) => {
                return this.signup.numberphone !== item.numberphone;
            })
            return check;
        },  
        async uploadSignup() {
            try {
                await SigninService.create(this.signup);
                this.$swal('ĐĂNG KÝ', 'Bạn đã đăng ký tài khoảng  thành công, quay lại để đăng nhập', 'success');
                window.onclick = function () {
                    location.replace('http://127.0.0.1:1010/signin');
                }
            }
            catch (error) {
                console.log(error)
            }
        },
        async createCart() {
            try {
                await CartService.create({userName: this.signup.username, product: [],});
            }
            catch (error) {
                console.log(error)
            }
        },
        async retrieveSignin() {
            try {
                this.getSignin = await SigninService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveSignin();
        },
        submit(e) {
            e.preventDefault();
            this.checkValidateName();
            this.checkValidatePhone();
            this.checkValidatePassword();
            this.checkValidateAgainPassword();
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var check;
            for (let i = 0; i < nodeInput.length; i++) {
                let messNode = nodeInput[i].nextElementSibling;
                check = messNode.classList.contains('hide');
                if (check === false) {
                    break;
                }
            }
            if (check === true) {
                if(this.checkSignup() === false) {
                    this.$swal('Đăng ký', 'Tài khoản đã tồn tại', 'error')
                }
                else {
                    this.signup.role = 'user';
                    this.uploadSignup();
                    this.createCart();
                }
            }
        }
    },
    mounted() {
        AOS.init();
        this.refreshList();
    },
}
</script>
<style lang="scss">
    @import '../assets/scss/sign-in-up.scss';
</style>