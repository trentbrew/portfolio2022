<template>
	<figure 
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
                    <div v-for="(tool, index) in stack">
                        <span :class="`pill ${tool}`">{{ tool }}</span>
                    </div>
                </div>
			</span>
			<span class="links">
				<a href="#"><i class="fas fa-heart"></i></a>
				<a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
				<a href="https://unsplash.com/photos/78A265wPiO4" target="_blank">
					<i class="fas fa-share"></i>
			 	</a>
			</span>
		</figcaption>
	</figure>
</template>

<script>
export default {
    props: {
        title: String,
        subtitle: String,
        stack: Array,
        bg: String,
        category: String,
    } 
}
</script>

<style lang='scss' scoped>
.pill {
    padding: 2px 6px;
    margin: 0px 4px;
    border-radius: 12px;
    color: rgba(black, 0.6) !important;
    font-weight: bold;
}

.Vue { background: #ADF7B6; }
.Firebase { background: #FFEE93; }
.Node { background: #FFC09F; }
.Azure { background: #79ADDC; }

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
	transition: background 400ms ease;
	overflow: hidden;
    border-radius: 0px;
    cursor: pointer;
	
	&:hover {
        background-position: 50% 100% !important;
		figcaption {
			transform: translateY(0px);
		}
	}

	figcaption {
        bottom: 0;
        transform: translateY(120px);
        width: 100%;
        height: 80px;
        padding: 15px 20px;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		background: rgba(#444, 0.6);
        backdrop-filter: $blur;
		transition: transform 400ms ease;
		.info {
            width: 100%;
			color: rgba(white, 0.6);
			h3 {
                color: white !important;
                margin: 0px;
				font-size: 1.2rem;
				letter-spacing: 1px;
			}
			span {
				color: rgba(white, 0.4);
				font-size: 0.85rem;
			}
		}
		.links {
			display: flex;
			justify-content: end;
			align-items: center;
			a {
				text-decoration: none;
				position: relative;
				width: 35px;
				height: 35px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				margin-left: 10px;
				font-size: 1.2rem;
				opacity: 0.65;
				border-radius: 50%;
				overflow: hidden;
				&:hover {
					opacity: 1;
				}
				&:focus {
					outline: none;
					&::after {
						transform: scale(1);
						opacity: 1;
					}
				}
				&::after {
					content: "";
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					border-radius: 50%;
					opacity: 0;
					background: rgba(255, 255, 255, 0.05);
					transform: scale(0.5);
					z-index: -1;
					transition: all 150ms ease;
				}
			}
		}
	}
}
</style>