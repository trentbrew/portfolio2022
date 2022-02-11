<template>
    <div class="about">
        <img id="ohai" src="../../content/animations/ohai2.gif" width="120" height="120" alt="hello">
        <h1>Hello</h1>
        <p>Thank you for visiting my site</p>
        <p>This concept started out as a smol sketch, and I really had no idea what it would morph into.</p>
        <p>It's a work in progress but buliding things out while improvising through the design has really been the most fun and playful experience I've had in a long time... Your feedback is welcome!</p>
        <br>
        <br>
        <b>A bit about me</b>
        <p>I'm a designer who loves to code, with 3 years of professional experience building mobile and desktop applications. I specialize in crafting intuitive and beautiful user interfaces, and enjoy working on projects that involve a lot of user interaction. I have a deep understanding of both front-end and back-end development, and am comfortable working in a variety of programming languages.</p> 
        <p>When I'm not designing or coding, I can be found snowboarding, running, or painting.</p>
        <br>
        <b>What I'm reading</b>
        <ul>
            <a href="https://algorithmstoliveby.com/"><li>Algorithms to Live By: The Computer Science of Human Decisions</li></a>
            <a href="https://en.wikipedia.org/wiki/Talking_to_Strangers"><li>Talking to Strangers: What We Should Know About People We Don't Know</li></a>
            <a href="http://www.theannotatedturing.com/"><li>The Annotated Turing</li></a>
        </ul><br>
        <b>What I'm watching</b>
        <ul>
            <li>Hajime no Ippo 🥊</li>
        </ul>
        <br>
        <br>
        <b>This is my sister and I on a snowboarding trip</b>
        <br>
        <img id="snowboard" src="../../assets/snowboarding.jpg" width="200" alt="snowboarding" />
        <br>
        <br>
        <br>
        <b>This is a picture my friend drew of me ~ go follow her on instagram(: @barko_dogspotting</b>
        <br>
        <br>
        <br>
        <img id="barko" src="../../assets/barko_full.jpeg" width="200" alt="barko" />
    </div>
</template>

<style lang='scss' scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

h1, h2, h3, b {
    color: $japanese_indigo;
}

img {
    border-radius: 6px;
}

#ohai {
    position: fixed;
    bottom: 12px;
    right: 96px;
}

.about {
    pointer-events: all !important;
    font-family: 'Poppins', sans-serif;
    overflow: auto;
    width: 100%;
    height: 100%;
    color: black;
    background: white;
    border-radius: 8px;
    padding: 36px 240px 32px 120px;
    box-sizing: border-box;
}

p, li {
    opacity: 0.6;
    max-width: 500px;
}

a {
    color: black;
}

#snowboard {
    margin-top: 32px;
    //box-shadow: $light-shadow;
}
</style>