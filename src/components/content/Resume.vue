<template>
	<div class="resume-container">
		<img src="../../assets/files/Resume.png" />
        <a href="https://github.com/trentbrew/portfolio-redesign/raw/master/src/assets/files/Resume%20-%20Trenton%20Brew%20.pdf" class="download">Download PDF</a>
	</div>
</template>

<style lang="scss" scoped>
.download {
    position: absolute;
    color: white;
    font-weight: bold;
    background: $laptop_background;
    backdrop-filter: blur(20px);
    padding: 8px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: $rad;
    bottom: 32px;
    right: 42px;
    text-decoration: none;
    transition: 100ms;
    cursor: pointer; 

    &:hover {
        opacity: 0.9;
    }
}

img {
    border-radius: 8px;
    width: 100%;
}

.resume-container {
    overflow: auto;
    width: 100%;
    height: 100%;
    padding-right: 6px;
    border-radius: 8px;
}
</style>