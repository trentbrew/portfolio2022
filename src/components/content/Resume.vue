<template>
	<div class="resume-container">
		<img src="../../assets/files/Resume - Trenton Brew.png"></img>
        <a href="https://github.com/tbrew1023/portfolio-redesign/raw/master/src/assets/files/Resume%20-%20Trenton%20Brew%20.pdf" class="download">Download PDF</a>
	</div>
</template>

<style lang="scss" scoped>
.download {
    position: absolute;
    color: white;
    background: black;
    backdrop-filter: blur(20px);
    padding: 8px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: $rad;
    bottom: 32px;
    right: 32px;
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
    padding-left: 6px;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(white, 0.4);
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>