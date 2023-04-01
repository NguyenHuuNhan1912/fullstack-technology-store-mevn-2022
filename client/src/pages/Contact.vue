<template>
    <main class="main">
        <SelectSpeed></SelectSpeed>
        <section class="contact-head">
            <section class="row">
                <article class="col-lg-6 col-md-12">
                    <div data-aos="fade-right" data-aos-duration="2000">
                        <form action="#" class="form form-contact">
                            <div class="form-group">
                                <h1>Liên hệ với chúng tôi</h1>
                            </div>
                            <div class="form-group">
                                <input autocomplete="off" type="text" placeholder="Họ tên(*)" name="input-name"
                                    id="input-name" @:blur="checkValidateName" @:keydown="focus"
                                    v-model="feedback.name">
                                <p class="message hide"></p>
                            </div>
                            <div class="form-group">
                                <input autocomplete="off" type="tel" placeholder="Số điện thoại(*)" name="input-phone"
                                    id="input-phone" @:blur="checkValidatePhone" @:keydown="focus"
                                    v-model="feedback.phone">
                                <p class="message hide"></p>
                            </div>
                            <div class="form-group">
                                <input autocomplete="off" type="email" placeholder="Email(*)" name="input-mail"
                                    id="input-email" @:blur="checkValidateEmail" @:keydown="focus"
                                    v-model="feedback.email">
                                <p class="message hide"></p>
                            </div>
                            <div class="form-group">
                                <textarea name="input-content" id="input-content" cols="40" rows="4"
                                    placeholder="Nội dung(*)" @:blur="checkValidateContent" @:keydown="focus"
                                    v-model="feedback.content"></textarea>
                                <p class="message hide"></p>
                            </div>
                            <div class="form-group">
                                <button class="btn" @:click="submit">Gửi</button>
                                <!-- <input type="submit" value="Gửi" name="input-submit"> -->
                            </div>
                        </form>
                    </div>
                </article>
                <article class="col-lg-6 col-md-12">
                    <div data-aos="fade-up" data-aos-duration="2000">
                        <section class="contact-me">
                            <img src="../assets/imgs/contact/me.png" alt="me">
                        </section>
                    </div>
                </article>
            </section>
        </section>
        <div data-aos="zoom-in" data-aos-duration="2000">
            <section class="contact-body">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31399.26642771162!2d105.382635!3d10.349216850000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a0cec7e649a3d%3A0xff238401d041bc9e!2zdHQuIFBow7ogSMOyYSwgTG9uZyBYdXnDqm4sIEFuIEdpYW5n!5e0!3m2!1sen!2s!4v1663985753328!5m2!1sen!2s"
                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </section>
        </div>
    </main>
</template>
<script>
import SelectSpeed from '../components/SelectSpeed.vue';
import FeedbackService from '../services/feedback.service';
import AOS from "aos";
export default {
    name: 'Contact',
    components: { SelectSpeed },
    data() {
        // Điều kiện kiểm tra form
        const regexNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const regexEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
        const regexPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
        return {
            // check: false,
            regexNumber,
            regexEmail,
            regexPass,
            getFeedback: [],
            feedback: {}
        }
    },
    methods: {
        // Tập các hàm xử lý ràng buộc form
        validatePhone(myNumber) {
            return this.regexNumber.test(myNumber);
        },
        validateEmail(myEmail) {
            return this.regexEmail.test(myEmail);
        },
        validatePass(myPass) {
            return this.regexPass.test(myPass);
        },
        errorMessage(inputNode, message) {
            let messNode = inputNode.nextElementSibling;
            messNode.textContent = message;
            messNode.style.color = 'red';
            messNode.classList.remove('hide');
            inputNode.style = 'border: none';
            inputNode.style = 'border-bottom: 2px solid red';
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
            node.style = 'border: none';
            node.style = 'border-bottom: 2px solid white';
        },
        checkValidateName() {
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var node = nodeInput[0];
            if (node.value === '') {
                this.errorMessage(node, "Họ tên không thể để trống");
            }
            else {
                this.successMessage(node);
            }
            // console.log(this.feedback);
        },
        checkValidatePhone() {
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var node = nodeInput[1];
            if (node.value === '') {
                this.errorMessage(node, "Số điện thoại không được để trống");
            }
            else if (!this.validatePhone(node.value)) {
                this.errorMessage(node, 'Số điện thoại không hợp lệ');
            }
            else if (this.validatePhone(node.value)) {
                this.successMessage(node);
            }
            else {
                this.successMessage(node);
            }
            // console.log(this.feedback);
        },
        checkValidateEmail() {
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var node = nodeInput[2];
            if (node.value === '') {
                this.errorMessage(node, "Email không được để trống");
            }
            else if (!this.validateEmail(node.value)) {
                this.errorMessage(node, 'Email không hợp lệ');
            }
            else if (this.validateEmail(node.value)) {
                this.successMessage(node);
            }
            else {
                this.successMessage(node);
            }
            // console.log(this.feedback);
        },
        checkValidateContent() {
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var node = nodeInput[3];
            if (node.value === '') {
                this.errorMessage(node, "Nội dung không thể để trống");
            }
            else {
                this.successMessage(node);
            }
            // console.log(this.feedback);
        },
        async uploadFeedback() {
            try {
                await FeedbackService.create(this.feedback);
                this.$swal('Feedback', 'Cảm ơn bạn đã gửi feedback đến chúng tôi', 'success');
                window.onclick = function () {
                    location.replace('http://127.0.0.1:1010/contact');
                }
            }
            catch (error) {
                console.log(error)
            }
        },
        checkUploadFeedback() {
            var phoneFeedback = this.getFeedback.map((item) => {
                return {
                    phone: item.phone,
                }
            });
            // CSDL chua co feedback nao thi true
            if (this.getFeedback.length < 0) {
                return true;
            }
            // Chua co trong csdl thi true
            var checkFeedback = phoneFeedback.every((item) => {
                return this.feedback.phone !== item.phone;
            })
            return checkFeedback;
        },
        async retrieveFeedback() {
            try {
                this.getFeedback = await FeedbackService.getAll();
                // console.log(this.getFeedback);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveFeedback();
        },
        submit(e) {
            let check;
            this.checkValidateName();
            this.checkValidatePhone();
            this.checkValidateEmail();
            this.checkValidateContent();
            e.preventDefault();
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            for (let i = 0; i < nodeInput.length; i++) {
                let messNode = nodeInput[i].nextElementSibling;
                check = messNode.classList.contains('hide');
                if (check === false) {
                    break;
                }
            }
            if (check === true) {
                (this.checkUploadFeedback() === false) 
                ? this.$swal('Feedback', 'Bạn đã gửi một feedback trước đó chúng tôi đã ghi nhận cảm ơn bạn', 'error')
                : this.uploadFeedback();
            }
        }
    },
    mounted() {
        AOS.init();
        this.refreshList();
    }
}
</script>
<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';

.main {

    .contact-head {
        border-radius: 5px;
        box-shadow: 0 0 5px 5px grey;
        background-image: linear-gradient(to right, rgb(20, 20, 20), $main-color);
        margin: 80px;
        padding: 0 80px;

        .row {
            align-items: center;
            --bs-gutter-x: 40px;
        }

        .form-contact {
            font-size: 10px;

            h1 {
                font-size: 3em;
                text-transform: uppercase;
                color: white;
            }

            .form-group {
                // border: 1px solid white;

                &:nth-child(-n+5)>[name^='input-'] {
                    @include formInput(none, 10px, 10px, 0px, 1.6em);
                    padding-left: 0;
                    padding-top: 0;
                    border: none;
                    border-bottom: 2px solid white;
                    background-color: transparent;
                    color: white;

                    &::placeholder {
                        color: rgba($color: white, $alpha: 0.8);
                    }

                    &:focus {
                        color: white;
                    }
                }

                .message {
                    color: white;
                    font-size: 1.5em;
                    margin-top: 10px;
                }

                .hide {
                    display: none;
                }

                .show {
                    display: block;
                }

                .btn {
                    @include button(white, black, 1.7em, 8px, 16px, 5px, 0.4s);
                    width: 120px;

                    &:hover {
                        @include buttonHover($color-button-hover, $color-button-hover);
                        color: white;
                    }
                }
            }

            .form-group+.form-group {
                margin-top: 30px;
            }
        }

        .contact-me {

            // border: 1px solid white;
            img {
                // border: 1px solid white;
                width: 400px;
                display: block;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .contact-body {
        margin: 80px;
        margin-top: 0;
        box-shadow: 0 0 5px 5px grey;
        border-radius: 5px;

        iframe {
            border-radius: 5px;
            width: 100%;
            display: block;
        }
    }
}

//responsive
@include responsive_main_lg__ {
    .main {
        .contact-head {
            padding: 0 60px;
            margin: 60px;

            .row {
                align-items: center;
                --bs-gutter-x: 60px;
            }

            .form-contact {
                // border: 1px solid white;
            }

            .contact-me {
                // border: 1px solid white;
            }

        }

        .contact-body {
            margin: 60px;
            margin-top: 0;
        }
    }
}

@include responsive_main_md__ {
    .main {
        .contact-head {
            padding: 0 50px;
            margin: 50px;
            margin-top: 100px;

            .row {
                --bs-gutter-x: 50px;
                --bs-gutter-y: 50px;
            }

            .form-contact {
                .form-group {
                    // border: 1px solid white;

                }
            }

            .contact-me {
                // border: 1px solid white;
                // img {
                //     width: ;
                // }
            }

        }

        .contact-body {
            margin: 50px;
            margin-top: 0;
        }
    }
}

// sm
@include responsive_main_sm__ {
    .main {
        .contact-head {
            padding: 0 25px;
            margin: 25px;
            margin-top: 50px;

            .row {
                --bs-gutter-x: 25px;
                --bs-gutter-y: 25px;
            }

            .form-contact {

                // border: 1px solid white;
                // border: 1px solid white;
                .form-group {
                    // border: 1px solid white;
                }

                .form-group+.form-group {
                    margin-top: 25px;
                }

            }

            .contact-me {
                // border: 1px solid white;
            }

        }

        .contact-body {
            margin: 25px;
            margin-top: 0;
        }
    }
}

// xm
@include responsive_main_xm__ {
    .main {
        .contact-head {
            padding: 0 25px;
            margin: 50px 0 25px 0;
            box-shadow: initial;
            border-radius: 0;

            .row {
                --bs-gutter-x: 25px;
                --bs-gutter-y: 25px;
            }

            .form-contact {

                // border: 1px solid white;
                .form-group {

                    // border: 1px solid white;
                    // margin-top: 15px;
                    &:nth-child(-n+5)>[name^='input-'] {
                        font-size: 1.5em;
                    }

                    h1 {
                        font-size: 2.1em;
                    }

                    .message {
                        font-size: 1.3em;
                    }

                    [name="input-submit"] {
                        font-size: 1.6em;
                    }
                }
            }

            .contact-me {
                img {
                    width: 300px;
                }
            }

        }

        .contact-body {
            border-radius: 0;

            iframe {
                border-radius: 0;

            }

            margin: 0 0 25px 0;
            box-shadow: initial;

        }
    }
}
</style>
