<template>
	<figure
	v-if="activeCategory == category"
	@click="handleFigureClick"
    class="card" 
	:style="`background-image: url(${bg})`"
    >
		<figcaption>
			<span class="info">
				<div class="title">
                    <h3>{{ title }}</h3>
                    <span>{{ subtitle }}</span><br>
                </div>
                <div class="stack-container flex">
                    <div v-for="(tool, index) in stack" :key="index">
                        <span :class="`pill ${tool}`">{{ tool }}</span>
                    </div>
                </div>
			</span>
		</figcaption>
	</figure>
</template>

<script>
export default {
    props: {
		index: Number,
        title: String,
        subtitle: String,
        stack: Array,
        bg: String,
		category: String,
        activeCategory: String,
    },
	methods: {
		handleFigureClick() {
			console.log(`card ${this.index} clicked from Card.vue`);
		}
	}
}
</script>

<style lang='scss' scoped>
.Vue           { background: rgba(#ADF7B6, 0.16); color: #ADF7B6 !important; }
.Flutter       { background: rgba(#6E9DC8, 0.16); color: #6E9DC8 !important; }
.MapboxGL      { background: rgba(#BCB7BE, 0.16); color: #BCB7BE !important; }
.Firebase      { background: rgba(#FFEE93, 0.16); color: #FFEE93 !important; }
.Node          { background: rgba(#FFC09F, 0.16); color: #FFC09F !important; }
.Django        { background: rgba(#DEBCAF, 0.16); color: #DEBCAF !important; }
.Azure         { background: rgba(#79ADDC, 0.16); color: #79ADDC !important; }
.GameMaker     { background: rgba(#FFC09F, 0.16); color: #FFC09F !important; }
.p5js          { background: rgba(#DFABBF, 0.16); color: #DFABBF !important; }
.HTML5         { background: rgba(#FFEE93, 0.16); color: #FFEE93 !important; }
.JQuery        { background: rgba(#ADF7B6, 0.16); color: #ADF7B6 !important; }
.VanillaJS     { background: rgba(#BCB7BE, 0.16); color: #BCB7BE !important; }
.CSS, .SCSS    { background: rgba(#FFEE93, 0.16); color: #FFEE93 !important; }
.Figma         { background: rgba(#DFABBF, 0.16); color: #DFABBF !important; }
.Windows       { background: rgba(#79ADDC, 0.16); color: #79ADDC !important; }
.Webflow       { background: rgba(#6E9DC8, 0.16); color: #6E9DC8 !important; }

.pill {
    padding: 2px 6px;
    margin-right: 8px;
    border-radius: 12px;
}

.stack-container {
    margin-top: 18px;
}

b span {
    padding-top: 12px;
}

figure.card {
    margin: 0px !important;
    padding: 0px !important;
	position: relative;
	width: 100%;
	aspect-ratio: 16 / 9;
	background-position: 50% 50%;
	background-size: cover;
	transition: 200ms ease;
	overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
	//box-shadow: $shadow;
	
	&:hover {
		//transform: scale(1.04);
		figcaption {
			transform: translateY(0px);
		}
	}

	figcaption {
        bottom: 0;
        transform: translateY(120px);
		box-sizing: content-box;
        width: 100%;
        height: 80px;
        padding: 15px 20px;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		background: $laptop_background;
		transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
		//background: rgba(#111, 0.6);
        //backdrop-filter: $blur;
        //border-radius: 0px 0px 4px 4px !important;
		.info {
            width: 100%;
			color: rgba(white, 0.8);
			h3 {
                color: white !important;
                margin: 0px;
				font-size: 1.2rem;
				letter-spacing: 1px;
				margin-bottom: 6px;
			}
			span {
				color: rgba(white, 0.4);
				font-size: 0.85rem;
			}
		}
	}
}
</style>