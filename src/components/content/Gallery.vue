<template>
    <div class="gallery-container">
        <div 
        v-for="(image, index) in images" 
        :key="index" 
        :style="`background-image: url(${require(`@/content/illustration/${image}.jpg`)})`"
        class="gallery-item"
        >
            {{ image }}
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
                'img4',
                'img5',
                'img6',
                'img7',
                'img8',
                'img9',
                'img10',
                'img11',
                'img12',
                'img13',
                'img14',
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
        
    }
    
}
</script>

<style lang='scss' scoped>
.gallery-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 12px;
    overflow: auto;
    width: 100%;
    border-radius: 8px;
}
.gallery-item {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background: orange;
    border-radius: 8px;
    width: 100%;
    aspect-ratio: 1 / 1;
}
</style>