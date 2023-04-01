<template>
    <Form @submit="uploadFeedback" :validation-schema="feedbackFormSchema">
        <div class="form-group">
            <Field name="name" type="text" class="form-control form-control--1" v-model="feedbackLocal.name"
                placeholder="Họ tên(*)" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <Field name="phone" type="tel" class="form-control" v-model="feedbackLocal.phone"
                placeholder="Số điện thoại(*)" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <Field name="email" type="email" class="form-control" v-model="feedbackLocal.email"
                placeholder="Email(*)" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <Field name="name" type="area" class="form-group" v-model="feedbackLocal.name"
                placeholder="Họ tên(*)" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <button>Gửi</button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const feedbackFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // feedbackLocal để liên kết với các input trên form
            // Ban đầu là object rong
            feedbackLocal: this.contact,
            feedbackFormSchema,
        };
    },
    methods: {
        // submitContact() {
        //     // uploadContact(this.feedbackLocal);
        //     // this.$emit("submit:contact", this.feedbackLocal);
        // },
        //  async uploadContact() {
        //     try {
        //         // this.local = contact truyen vao 1 object
        //         console.log(this.feedbackLocal);
        //         await ContactService.create(this.feedbackLocal)
        //         // this.message = "Liên hệ được tạo thành công."
        //         alert('Lien he duoc tao thanh cong');
        //         location.replace('http://127.0.0.1:3008/');
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        // },
        // deleteContact() {
        //     this.$emit("delete:contact", this.feedbackLocal.id);
        // },
        uploadFeedback() {
            alert("Thanh cong");
        }
    },
};
</script>


<style>
.error-feedback {
    color: red;
    display: block;
    margin-top: 5px;
}
</style>