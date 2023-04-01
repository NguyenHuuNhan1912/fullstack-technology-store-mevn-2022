<template>
    <nav class="admin-product" @click="$emit('showDetail')">
        <table>
            <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Loại</th>
                    <th>Thương hiệu</th>
                    <th>Giá</th>
                    <th>Hiệu chỉnh</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(item, index) in product" 
                    :key="index"
                    @click="updateActiveIndex(index)"
                >
                    <td>
                        <div>
                            <img :src="convert(item.img)" alt="img-product">
                        </div>
                    </td>
                    <td class="name-product">{{ item.name }}</td>
                    <td class="type-product">{{ item.type }}</td>
                    <td class="type-product">{{ item.trademark }}</td>
                    <td>{{ standPrice(Number(item.price)) }} VND</td>
                    <td>

                        <router-link :to="{
                            name: 'AdminEdit',
                            params: { id: item._id },
                        }">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square" class="icon" />
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </nav>
    
</template>

<script>
export default {
    name: 'ProductList',
    props: {
        product: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex", "showDetail"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        standPrice(string) {
            return string.toLocaleString();
        },
        convert(img) {
            return "data:image/png;base64,"+img;
        } 
    },
    mounted() {
        // console.log(this.product);
    }
}
</script>

<style>

</style>