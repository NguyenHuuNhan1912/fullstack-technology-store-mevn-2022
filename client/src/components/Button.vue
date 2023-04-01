<template>
    <button class="btn" @click="$emit('btn-click', $event)">{{textBtn}}</button>
</template>
<script>
    export default {
        name: 'Button',
        props: ['textBtn'],
        emits: ['btn-click']
    }
</script>
