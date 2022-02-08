<template>
    <div class="gallery-container">
        <div
        v-for="(image, index) in images"
        :key="index" 
        :style="`background-image: url(${require(`@/content/illustration/${image}.jpg`)})`"
        class="gallery-item"
        >
            <div @click="handleImageClick(image)" class="clickable"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                'acceptance',
                'alien',
                'angel',
                'coal',
                'dehydrated',
                'digest',
                'friends',
                'happynight',
                'holiday',
                'img0',
                'img1',
                'img2',
                'img3',
                'img5',
                'img7',
                'img8',
                'img9',
                'img10',
                'img12',
                'maria',
                'img15',
                'img16',
                'img17',
                'img18',
                'isabella',
                'naruto',
                'ocean',
                'over-stimulation',
                'skateboard',
                'sleepy',
                'spill',
                'strand',
                'sundays',
                'therealone',
                'weight',
                'winter',
            ]
        }
    },
    mounted() {

    },
    props: {
        
    },
    computed: {
        
    },
    methods: {
        handleImageClick(image) {
            console.log('clicked image: ' + image);
            this.$root.$emit('galleryClicked', `illustration/${image}.jpg`);
        }
    }
    
}
</script>

<style lang='scss' scoped>
.clickable {
    height: 100%;
    width: 100%;
    display: flex;
}
.gallery-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 36px;
    overflow: auto;
    width: 100%;
    border-radius: 8px;
}
.gallery-item {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 4px;
    width: 100%;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    transition: 200ms ease;

    &:hover {
        transform: scale(0.96);
        filter: brightness(0.9);
    }
}
</style>