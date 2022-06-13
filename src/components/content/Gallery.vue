<script>
export default {
    data() {
        return {
            loading: true,
            images: [
                'music',
                'enso',
                'strand',
                'spill',
                'ma',
                'progress',
                'digest',
                'her',
                'weight',
                'winter',
                'alien',
                'padding',
                'girls',
                'dehydrated',
                'noise',
                'tree',
                'think',
                'img0',
                'angel',
                'skateboard',
                'img1',
                'tails',
                'coal',
                'scholar',
                'img5',
                'img7',
                'bleed',
                'void',
                'acceptance',
                'img9',
                'img10',
                'img12',
                'img15',
                'fakejoy',
                'img16',
                'body',
                'img17',
                //'locks',
                'img18',
                'friends',
                'isabella',
                'naruto',
                'ocean',
                'over-stimulation',
                'firstclass',
                'happynight',
                'sleepy',
                'sundays',
                'therealone',
            ]
        }
    },
    mounted() {
        setTimeout(() => {
            this.loading = false;
        }, 1500);
    },
    methods: {
        handleImageClick(image) {
            this.$root.$emit('galleryClicked', `illustration/${image}.jpg`);
        }
    }
    
}
</script>

<template>
    <div class="gallery">
        <!--div 
        v-if="loading"
        class="loader-veil flex-center absolute"
        >
            <img src="../../assets/loading.gif" width="48" height="48" alt="loading..." />
        </div-->
        <div class="gallery-container">
            <div
            v-for="(image, index) in images"
            :key="index" 
            :style="`
                background-image: url(${require(`@/content/illustration/${image}.jpg`)});
            `"
            class="gallery-item"
            >
                <div @click="handleImageClick(image)" class="clickable"></div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.loader-veil {
    position: absolute;
    margin-top: -36px;
    margin-left: -36px;
    width: 844px;
    height: 536px;
    pointer-events: none;
    z-index: 99999;
    transition: 400ms;
}
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
    border-radius: 6px;
    width: 100%;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    transition: 200ms ease;

    &:hover {
        transform: scale(0.96);
    }

    &:active {
        transform: scale(0.92);
    }
}
</style>