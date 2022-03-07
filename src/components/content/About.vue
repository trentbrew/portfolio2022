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
            <a href="https://algorithmstoliveby.com/"><li><span>Algorithms to Live By</span>: The Computer Science of Human Decisions</li></a>
            <a href="https://en.wikipedia.org/wiki/Talking_to_Strangers"><li><span>Talking to Strangers</span>: What We Should Know About People We Don't Know</li></a>
            <a href="http://www.theannotatedturing.com/"><li><span>The Annotated Turing</span></li></a>
        </ul><br>
        <b>My favorite stuff on the web</b>
        <ul class="faves">
            <a href="https://same.energy"><li><span>Same Energy</span> | Visual Search Engine</li></a>
            <a href="https://toolhunt.dev"><li><span>Toolhunt</span> | Quality Devtools</li></a>
            <a href="https://youworkforthem.com"><li><span>YouWorkForThem</span> | Creative fonts and stock art</li></a>
            <a href="https://flow.rest"><li><span>Flow</span> | Clear your mind through expressive writing</li></a>
            <a href="https://manuelmoreale.com"><li><span>Manu</span> | A lovely blog</li></a>
            <a href="https://minimalissimo.com"><li><span>Minimalissimo</span> | Minimalism in Design</li></a>
        </ul>
    </div>
</template>

<style lang='scss' scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

h1, h2, h3, b {
    color: $japanese_indigo;
}

.faves {
    span {
        font-weight: bold !important;
    }
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
    padding: 36px 240px 32px 64px;
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