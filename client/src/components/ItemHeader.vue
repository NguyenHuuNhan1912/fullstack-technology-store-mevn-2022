<!-- class="product-list product-list--trademark" -->
<template>
    <li class="product-item"
        v-for="(item, index) in dataItemHeader"
        :key="index"
    >   
    <!-- :to="{name: 'Product', params: {type: item.url.type, name: item.url.name}}"  -->
        <RouterLink :to="{name: 'Product', params: {type: item.url.type, name: item.url.name}}" :class="item.class">
            <span>{{item.name}}</span>
            <font-awesome-icon :icon="item.icon" class="icon" />
        </RouterLink>
    </li>
    
</template>

<script>
export default {
    name: 'ItemHeader',
    props: {
        dataItemHeader: {
            type: Array
        },
    },
    methods: {
    }
}
</script>

<style>

</style>