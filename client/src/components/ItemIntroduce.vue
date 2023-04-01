<template>
    <article :class="classItemFirst">
        <div :data-aos="aosTargetFirst" data-aos-duration="2000">
            <div class="introduce__first">
                <img :src="dirImg" alt="img-introduce">
            </div>
        </div>
    </article>
    <article :class="classItemLast">
        <div :data-aos="aosTargetLast" data-aos-duration="2000">
            <div class="introduce__last">
                <p :class="pClass">
                    {{pContent}}
                </p>
            </div>
        </div>
    </article>
</template>
<script>
export default {
    name: 'ItemIntroduce',
    props: [
        'classItemFirst', 
        'aosTargetFirst', 
        'dirImg', 
        'classItemLast', 
        'aosTargetLast',
        'pClass',
        'pContent'
    ],
}
</script>
<style>

</style>