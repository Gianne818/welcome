/*Sound Controls*/
let sound = document.getElementById('music_2');
let button = document.getElementById('soundOn')
let clickSFX = document.getElementById('click_sfx');

button.addEventListener("click", event=>{
    if(sound.paused){
        sound.play();
        button.src = "Assets_Triumph/sound_on.png";
    }
    else if(sound.play()){
        sound.pause();
        button.src = "Assets_Triumph/sound_off.png";
    }
});

let x = document.querySelector('body');
x.addEventListener("click", event=>{
    clickSFX.play();
});



/*Start Page*/
let startButton = document.getElementById('continue_button');
let startPage = document.getElementById('startPageTriumph');
let mainContent = document.getElementById('mainContent');

startButton.addEventListener("click", function() {
    sound.play();
    startPage.style.opacity = '0';
    setTimeout(() => {
        startPage.style.display = 'none';
        mainContent.style.opacity = '1';
        mainContent.style.display = 'flex';
    }, 500);
});


/*Going Inside Temple*/
let goInside = document.getElementById('inside_button');
let mirror = document.getElementById('mirror');

goInside.addEventListener("click", event=>{
    mirror.style.display = 'flex';
    mainContent.style.display = 'none';
});



/*Temple Mirror Texts*/
let texts = [
    document.getElementById('introMirrorText1'),
    document.getElementById('introMirrorText2'),
    document.getElementById('mirrorText')
];

texts.forEach(text => text.classList.add('text'));
texts[0].classList.add('active');
let curInd = 0;

mirror.addEventListener("click", event=>{
    curInd++;
    if (curInd < texts.length) {
        texts[curInd-1].classList.remove('active');
        texts[curInd].classList.add('active');
    } else if (curInd === texts.length-1){
        curInd = texts.length-2;
        
    }
});

/*
mirror.addEventListener("click", event => {
    texts[curInd].classList.remove('active');
    curInd++;
    if (curInd < texts.length) {
        texts[curInd].classList.add('active');
    } else {
        curInd = 0;
        texts[curInd].classList.add('active');
    }
});
*/