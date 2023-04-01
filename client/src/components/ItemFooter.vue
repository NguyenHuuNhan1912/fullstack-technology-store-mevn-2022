<template>
    <li :class=classItem >
        <a href="#">
            <font-awesome-icon :icon=icon class="icon" />
            <p>{{des}}</p>
        </a>
    </li>
</template>
<script>
export default {
    name: 'ItemFooter',
    props: ['classItem', 'icon', 'des']
}
</script>
<style>

</style>