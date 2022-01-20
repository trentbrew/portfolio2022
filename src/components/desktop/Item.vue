<template>
    <h2 class="absolute flex-column flex-center item-container" v-draggable>
        <div class="icon"></div>
        <span class="title">Projects</span>
    </h2>
</template>

<script>
import { Draggable } from 'draggable-vue-directive';

export default {
    directives: {
        Draggable
    }
}

</script>

<style lang="scss" scoped>
.item-container {
    top: 36px;
    left: 48px;
    padding: 12px 18px;
    border-radius: $rad;
    cursor: pointer;
    &:hover {
        background: rgba(black, 0.1);
    }
}
.icon {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 56px;
    width: 56px;
    margin-bottom: 12px;
    background-image: url('../../assets/icons/folder.png');
}
span {
    font-size: 14px;
    font-weight: bold;
}
</style>