let sound = document.getElementById('music_2');
let button = document.getElementById('soundOn')
let clickSFX = document.getElementById('click_sfx');


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