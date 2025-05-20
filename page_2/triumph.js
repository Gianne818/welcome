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
let mirrorDialogues = document.getElementById('dialogues');
let texts = [
    "You see the trophy inside the mirror.",
    "Inscriptions float inside your head.",
    `?ytiroirp <input type="text" id="answerOne"> rebmun rouy eb tneitap rouy dluohs ,esrun ,em lleT .eno tnahpmuirt eht eb ot mialcorp uoy ecnis rettam t'nseod ti ,lleW ?erised s'traeh ruoy ti si rO ?ytilaer ti Si ?ees uoy od tahW .rorrim eht ni noitcelfer ruoy ees ouY`
]

let box = document.getElementById('mirrorDialogue');
let curInd = 0;

function showNextText() {
  box.classList.add("fade-out");

  setTimeout(() => {
    box.innerHTML = texts[curInd];
    box.classList.remove("fade-out");
    box.classList.add("fade-in");
  }, 500); // Wait for fade-out to finish

  // Remove fade-in class after animation to allow it again
  setTimeout(() => {
    box.classList.remove("fade-in");
  }, 1000);
}


mirrorDialogues.addEventListener("click", event=>{
    if (curInd < texts.length-1) {
        showNextText();
        curInd++;
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