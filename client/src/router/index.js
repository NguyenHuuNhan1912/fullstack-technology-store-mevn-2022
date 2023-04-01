import {createWebHistory, createRouter} from "vue-router";

import Homepage from "@/pages/Homepage.vue";
import Introduce from "@/pages/Introduce.vue";
import Promotion from "@/pages/Promotion.vue";
import Recruit from "@/pages/Recruit.vue";
import FormRecruit from "@/pages/FormRecruit.vue";
import Contact from "@/pages/Contact.vue";
import Signin from "@/pages/Signin.vue";
import Signup from "@/pages/Signup.vue";
import Cart from "@/pages/Cart.vue";
import Product from "@/pages/Product.vue";
import ProductDetail from "@/pages/ProductDetail.vue";
import Admin from "@/pages/Admin.vue";
import AdminAdd from "@/pages/AdminAdd.vue";
import AdminEdit from "@/pages/AdminEdit.vue";
import Test from "@/pages/Test.vue";
const routes = [
    {
        path: "/test",
        name: "Test",
        component: Test,
        meta: {title: 'Hữu Nhân | Test'},
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {title: 'Hữu Nhân | Quản trị'},
    },
    {
        path: "/admin/add",
        name: "AdminAdd",
        component: AdminAdd,
        meta: {title: 'Hữu Nhân | Thêm sản phẩm'},
        props: true,
        
    },
    {
        path: "/admin/:id",
        name: "AdminEdit",
        component: AdminEdit,
        meta: {title: 'Hữu Nhân | Cập nhật sản phẩm'},
        props: true,
        
    },
    {
        path: "/",
        name: "Homepage",
        component: Homepage,
        meta: {title: 'Hữu Nhân | Trang chủ'},
    },
    {
        path: "/product/:type/:name",
        name: "Product",
        component: Product,
        meta: {title: 'Hữu Nhân | Sản phẩm'},
    },
    {
        path: "/detail/:id",
        name: "ProductDetail",
        component: ProductDetail,
        meta: {title: 'Sản phẩm chi tiết'},
    },
    {
        path: "/introduce",
        name: "Introduce",
        component: Introduce,
        meta: {title: 'Hữu Nhân | Giới thiệu'},
    },
    {
        path: "/promotion",
        name: "Promotion",
        component: Promotion,
        meta: {title: 'Hữu Nhân | Khuyến mãi'},
    },
    {
        path: "/recruit",
        name: "Recruit",
        component: Recruit,
        meta: {title: 'Hữu Nhân | Tuyển dụng'},
    },
    {
        path: "/recruit/:name",
        name: "FormRecruit",
        component: FormRecruit,
        meta: {title: 'Hữu Nhân | Form Tuyển dụng'},
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
        meta: {title: 'Hữu Nhân | Liên hệ'},
    },
    {
        path: "/signin",
        name: "Signin",
        component: Signin,
        meta: {title: 'Hữu Nhân | Đăng nhập'},
    },
    {
        path: "/Signup",
        name: "Signup",
        component: Signup,
        meta: {title: 'Hữu Nhân | Đăng ký'},
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart,
        meta: {title: 'Hữu Nhân | Giỏ hàng'},
    },
];  

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;


