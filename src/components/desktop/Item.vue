<template>
    <h2 
    @dblclick="$parent.pushWindow({
        title: 'Work',
        center: true,
        component: Files
    })" 
    class="absolute flex-column flex-center item-container" 
    v-draggable
    >
        <div class="icon"></div>
        <span class="title">Work</span>
    </h2>
</template>

<script>
import { Draggable } from 'draggable-vue-directive';
import Files from '@/components/content/Files.vue';

export default {
    directives: {
        Draggable
    },
    components: {
        Files
    }
}

</script>

<style lang="scss" scoped>

</style>