<template>
    <main class="main">
        <SelectSpeed />
        <section class="form-recruit-introduce">
            <section class="row">
                <article class="col-xl-6">
                    <div class="form-recruit-introduce__head">
                        <h1>Hãy là một phần của Hữu Nhân</h1>
                        <p>
                            Một môi trường không thể tốt hơn để bạn có thể phát triển. Đến với chúng tôi bạn sẽ đến với
                            một môi trường thân thiện làm
                            việc chuyên nghiệp. Đặc biệt hơn nữa là cùng với chúng tôi viết
                            tiếp những hoài bão, sứ mệnh ở phía trước còn đang dang dỡ
                        </p>
                        <a href="#form">
                            <button class="btn btn-form">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span>Đăng kí</span>
                            </button>
                        </a>
                    </div>
                </article>
                <article class="col-xl-6">
                    <div class="form-recruit-introduce__body">
                        <img src="../assets/imgs/recruit/shipper.avif" alt="shipper"
                            v-if="positionRecruit === staff[0]">
                        <img src="../assets/imgs/recruit/protect.avif" alt="protect"
                            v-if="positionRecruit === staff[1]">
                        <img src="../assets/imgs/recruit/adsive.jpg" alt="adsive" v-if="positionRecruit === staff[2]">
                        <img src="../assets/imgs/recruit/accountant.avif" alt="shipper"
                            v-if="positionRecruit === staff[3]">
                        <img src="../assets/imgs/recruit/manage.jpg" alt="manage" v-if="positionRecruit === staff[4]">
                    </div>
                </article>
            </section>
        </section>
        <form action="#" class="form-recruit" id="form">
            <section class="row">
                <article class="col-lg-12">
                    <div class="form-title">
                        <h1>ứng viên ứng tuyển điền vào form sau</h1>
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input 
                            type="text" 
                            placeholder="Họ và tên(*)" 
                            name="input-name"
                            @:blur="checkValidateName" 
                            @:keydown="focus"
                            v-model="recruitment.name"
                        >
                        <p class="form-message hide"></p>
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <select name="sex" v-model="recruitment.sex">
                            <option value="Giới tính" disabled selected>Giới tính</option>
                            <option value="nam">Nam</option>
                            <option value="nữ">Nữ</option>
                            <option value="khác">Khác</option>
                        </select>
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input 
                            type="text" 
                            placeholder="Ngày tháng năm sinh - VD -> 10/10/2001" 
                            name="input-birthDate" 
                      
                            @:blur="checkValidateBirthday"
                            @:keydown="focus"
                            v-model="recruitment.birthDay"
                        >
                        <p class="form-message hide"></p>
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <input 
                            type="text" 
                            placeholder="Số điện thoại(*)" 
                            name="input-phone" 
                        
                            @:blur="checkValidatePhone"
                            @:keydown="focus"
                            v-model="recruitment.phone"
                        >
                        <p class="form-message hide"></p>
                    </div>
                </article>
                <article class="col-lg-8">
                    <div class="form-group">
                        <input 
                            type="text" 
                            placeholder="Địa chỉ(*)" 
                            name="input-address"
                        
                            @:blur="checkValidateAddress"
                            @:keydown="focus"
                            v-model="recruitment.address"
                        >
                        <p class="form-message hide"></p>
                    </div>
                </article>
                <article class="col-lg-4">
                    <div class="form-group">
                        <select name="level" v-model="recruitment.academicLevel">
                            <option value="Trình độ học vấn" disabled selected>Trình độ học vấn</option>
                            <option value="Đại học">Đại học</option>
                            <option value="Cao đẳng">Cao đẳng</option>
                            <option value="Phổ thông">Phổ thông</option>
                        </select>
                        <p class="form-message hide"></p>
                    </div>
                </article>

                <article class="col-lg-8">
                    <div class="form-group">
                        <input 
                            type="text" 
                            placeholder="Link Facebook cá nhân" 
                            name="input-facebookLink" 
                            @:blur="checkValidateFacebookLink"
                            @:keydown="focus"
                            v-model="recruitment.facebookLink"
                        >
                        <p class="form-message hide"></p>
                    </div>
                </article>
                <article class="col-lg-12">
                    <div class="form-group">
                        <textarea v-model="recruitment.exper" @:blur="checkValidateExper" @:keydown="focus" name="input-exper" id="" cols="30" rows="12" placeholder="Kinh nghiệm ở vị trí ứng tuyển(*)"></textarea>
                        <p class="form-message hide"></p>
                    </div>
                </article>
                <article class="col-lg-12">
                    <div class="form-group">
                        <button class="btn" @:click="submit">Gửi yêu cầu</button>
                    </div>
                </article>
            </section>
        </form>
    </main>
</template>
<script>
import SelectSpeed from '../components/SelectSpeed.vue';
import RecruitmentService from '../services/recruitment.service';

export default {
    name: "FromRecruit",
    components: { SelectSpeed },
    data() {
        let arr = this.$route.params.name.split("-");
        let positionRecruit = arr[arr.length - 1];
        const regexNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        const regexEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
        const regexPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
        const regexBirthday = /^(?:[1-9]|[12]\d|3[01])([\/.-])(?:[1-9]|1[012])\1(?:19|20)\d\d$/;
        
        return {
            positionRecruit,
            staff: ['shipper', 'protect', 'adsive', 'accountant', 'manage'],
            getRecruitment: [],
            recruitment: {
                sex: 'Giới tính',
                academicLevel: 'Trình độ học vấn',
                position: positionRecruit,
            },
            regexNumber,
            regexEmail,
            regexPass,
            regexBirthday,
            srcImg: '',
        };
    },
    methods: {
        validatePhone(myNumber) {
            return this.regexNumber.test(myNumber);
        },
        validateEmail(myEmail) {
            return this.regexEmail.test(myEmail);
        },
        validatePass(myPass) {
            return this.regexPass.test(myPass);
        },
        validateBirthday(myBirthday) {
            return this.regexBirthday.test(myBirthday);
        },
        focus(e) {
            let node = e.target;
            let messNode = e.target.nextElementSibling;
            messNode.textContent = '';
            messNode.classList.add('hide');
            node.style = 'border-bottom: 1px solid grey';
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
            inputNode.style = 'border: 1px solid green';
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
            // console.log(this.recruitment);
        },
        checkValidateBirthday() {
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var node = nodeInput[1];
            if (node.value === '') {
                this.errorMessage(node, "Năm sinh không được để trống");
            }
            else if (!this.validateBirthday(node.value)) {
                this.errorMessage(node, 'Năm sinh không hợp lệ');
            }
            else if (this.validateBirthday(node.value)) {
                this.successMessage(node);
            }
            // console.log(this.recruitment);
        },
        checkValidatePhone() {
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var node = nodeInput[2];
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
            // console.log(this.recruitment);
        },
        checkValidateAddress() {
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var node = nodeInput[3];
            if (node.value === '') {
                this.errorMessage(node, "Địa chỉ không thể để trống");
            }
            else {
                this.successMessage(node);
            }
            // console.log(this.recruitment);
        },
        checkValidateFacebookLink() {
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var node = nodeInput[4];
            if (node.value === '') {
                this.errorMessage(node, "Địa chỉ Facebook không thể để trống");
            }
            else {
                this.successMessage(node);
            }
            // console.log(this.recruitment);
        },
        checkValidateExper() {
            var nodeInput = [...document.querySelectorAll("[name^='input-']")];
            var node = nodeInput[5];
            if (node.value === '') {
                this.errorMessage(node, "Kinh nghiệm không thể để trống");
            }
            else {
                this.successMessage(node);
            }
            // console.log(this.recruitment);
        },
        async retrieveRecruitment() {
            try {
                this.getRecruitment = await RecruitmentService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveRecruitment();
        },
        checkUploadRecruitment() {
            var phoneRecruitment= this.getRecruitment.map((item) => {
                return {
                    phone: item.phone,
                }
            });
            // CSDL chua co feedback nao thi true
            if (this.getRecruitment.length < 0) {
                return true;
            }
            // Chua co trong csdl thi true
            var checkRecruitment = phoneRecruitment.every((item) => {
                return this.recruitment.phone !== item.phone;
            })
            return checkRecruitment;
        },
        async uploadRecruitment() {
            try {
                await RecruitmentService.create(this.recruitment);
                this.$swal('Tuyển dụng', 'Chúng tôi đã ghi nhận câu trả lời của bạn', 'success');
                window.onclick = function () {
                    location.replace('http://127.0.0.1:1010/recruit');
                }
            }
            catch (error) {
                console.log(error)
            }
        },
        async submit(e)  {
            let check;
            this.checkValidateName();
            this.checkValidateBirthday();
            this.checkValidatePhone();
            this.checkValidateAddress();
            this.checkValidateFacebookLink();
            this.checkValidateExper();
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
                if(this.checkUploadRecruitment() === false) {
                    this.$swal('Tuyển dụng', 'Bạn đã gửi một Form trước đó chúng tôi đã ghi nhận cảm ơn bạn', 'error')
                }
                else {
                    this.uploadRecruitment();
                }
            }

        }
    },
    mounted() {
        this.refreshList();
    },
}
</script>
<style lang="scss">
@import '../assets/scss/form-recruit.scss';
</style>