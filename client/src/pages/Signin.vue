<template>
    <main class="main">
        <SelectSpeed />
        <div class="wrapper-sign-in-up">
            <div data-aos="zoom-in" data-aos-duration="2000">
                <section class="sign-in-up">
                    <section class="logo logo--signin">
                        <img src="../assets/imgs/signin/signin.png" alt="logo-signin">
                    </section>
                    <form action="#" class="form form--signin">
                        <div class="form-group">
                            <h1>ĐĂNG NHẬP</h1>
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
                                v-model="signin.username"
                            >
                            <p class="message"></p>
                            <font-awesome-icon icon="fa-solid fa-user" class="icon icon--user" />
                        </div>
                        <div class="form-group">
                            <input 
                                type="password" 
                                name="input-password" 
                                placeholder="Mật khẩu(*)"
                                @blur="checkValidatePassword" 
                                @keydown="focus"
                                ref="inputPassword"
                                v-model="signin.password"
                            >
                            <p class="message"></p>
                            <font-awesome-icon icon="fa-solid fa-lock" class="icon icon--password" />
                        </div>
                        <div class="form-group">
                            <button class="btn btn--signin" @click="submit">Đăng nhập</button>
                        </div>
                    </form>
                    <section class="siginin__other">
                        <router-link to="/signup">
                            Bạn chưa có tài khoản ?
                        </router-link>
                        <router-link to="/">
                            Quên mật khẩu ?
                        </router-link>
                    </section>
                    <section class="signin__with">
                        <section class="title">
                            <h1>Hoặc đăng nhập với</h1>
                        </section>
                        <section class="facebook">
                            <router-link to="/">
                                <font-awesome-icon icon="fa-brands fa-facebook" class="icon" />
                                <p>Facebook</p>
                            </router-link>
                        </section>
                        <section class="google">
                            <router-link to="/">
                                <font-awesome-icon icon="fa-brands fa-google" class="icon" />
                                <p>Google</p>
                            </router-link>
                        </section>
                    </section>
                </section>
            </div>

        </div>
    </main>
</template>
<script>
import SelectSpeed from '../components/SelectSpeed.vue';
import SigninService from '../services/signin.service';
import AOS from "aos";
export default {
    name: "Signin",
    components: { SelectSpeed },
    data() {
        const regexPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
        return {
            regexPass,
            getSignin: [],
            signin: {},
        };
    },
    methods: {
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
        checkValidatePassword() {
            var node = this.$refs.inputPassword;
            if(node.value === '') this.errorMessage(node, "Mật khẩu không được để trống");
            else if(!this.validatePass(node.value)) this.errorMessage(node, "Mật khẩu không đủ mạnh");
            else if(this.validatePass(node.value)) this.successMessage(node);
            else this.successMessage(node);
        },
        async retrieveSignin() {
            try {
                this.getSignin = await SigninService.getAll();
                // console.log(this.getSignin);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveSignin();
        },
        checkSignin() {
            var checkSignin = this.getSignin.map((item) => {
                return {
                    username: item.username,
                    password: item.password,
                }
            });
            // CSDL chua co user nao thi true
            if (this.getSignin.length < 0) {
                return true;
            }
            // Chua co trong csdl thi true
            var check = checkSignin.some((item) => {         
                if((this.signin.password === item.password) && (this.signin.username === item.username)) {
                    return true;
                }  
            })
            return check;
        },
        checkRoleSignin() {
            var checkSignin = this.getSignin.map((item) => {
                return {
                    username: item.username,
                    password: item.password,
                    role: item.role
                }
            })
            var check = checkSignin.find((item, index) => {         
                if((this.signin.password === item.password) && (this.signin.username === item.username)) {
                    return item;
                }  
            });
            return check.role;
        },  
       signinSuccess() {
            this.$swal('ĐĂNG NHẬP', 'Đăng nhập thành công, trở về trang chủ để mua sản phẩm !', 'success');
            const btnAlert = document.querySelector('.swal2-confirm');
            localStorage.setItem('user',JSON.stringify(this.signin.username));
            btnAlert.addEventListener('click', () => {
                location.replace('http://127.0.0.1:1010/');
            });
        },
        signinSuccessAdmin() {
            this.$swal('ĐĂNG NHẬP', 'Đăng nhập vào trang quản trị thành công', 'success');
            const btnAlert = document.querySelector('.swal2-confirm');
            localStorage.setItem('admin',JSON.stringify(this.signin.username));
            btnAlert.addEventListener('click', () => {
                location.replace('http://127.0.0.1:1010/admin');
            });
        },
        submit(e) {
            e.preventDefault();
            this.checkValidateName();
            this.checkValidatePassword();
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
                if(this.checkSignin() === true) {
                    if(this.checkRoleSignin() === 'user') {
                        this.signinSuccess();
                    }
                    else {
                    this.signinSuccessAdmin();
                    }
                }
                else {
                    this.$swal('ĐĂNG NHẬP', 'Tài khoản không tồn tại', 'error');
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