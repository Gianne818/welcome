/*Sound Controls*/
let sound = document.getElementById('music');
let button = document.getElementById('soundOn')
let clickSFX = document.getElementById('click_sfx');

button.addEventListener("click", event=>{
    if(sound.paused){
        sound.play();
        button.src = "Assets_Wasteland/sound_on.png";
    }
    else if(sound.play()){
        sound.pause();
        button.src = "Assets_Wasteland/sound_off.png";
    }
});

let x = document.querySelector('body');
x.addEventListener("click", event=>{
    clickSFX.play();
});



/*Start Page*/
let startButton = document.getElementById('continue_button');
let startPage = document.getElementById('startPageWasteland');
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
let mirror = document.getElementById('firstPart');

goInside.addEventListener("click", event=>{
    mirror.style.display = 'flex';
    mainContent.style.display = 'none';
});



/*First Part Texts*/
let firstPartDialogue = document.getElementById('firstPartDialogueBox');
let texts = [
    "You see a dark dragon in front of you.",
    "It is the manifestation of all who succumbed to the wastes.",
    "What do you want to do?"
    
];

let box = document.getElementById('firstPartDialogue');
let curInd = -1;

let typeWriterTimeout = null;
let isTyping = false;

function typeWriterEffect(text, element) {
    element.innerHTML = "";
    let i = 0;
    isTyping = true;

    function type() {
        // If typing was interrupted, show full text
        if (!isTyping) {
            element.innerHTML = text;
            return;
        }
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typeWriterTimeout = setTimeout(type, 30);
        } else {
            isTyping = false;
        }
    }
    type();
}

firstPartDialogue.addEventListener("click", () => {
    // If typewriter is running, finish instantly
    if (isTyping) {
        isTyping = false;
        if (typeWriterTimeout) clearTimeout(typeWriterTimeout);
        // Show full current text
        if (curInd >= 0 && curInd < texts.length) {
            box.innerHTML = texts[curInd];
        }
        return;
    }
    if (curInd < texts.length - 1) {
        curInd++;
        typeWriterEffect(texts[curInd], box);
        // Show replies-section after last text
        if (curInd === texts.length - 1) {
            setTimeout(() => {
                repliesSection.style.display = 'flex';
                rep1.textContent = "Offer gold";
                rep2.textContent = "Run away";
            }, texts[curInd].length * 30 + 100); // Wait for typewriter effect to finish
        }
    }
});

let repliesSection = document.querySelector('.replies-section');
let rep1 = document.getElementById('rep1');
let rep2 = document.getElementById('rep2');
let blackscreen = document.getElementById('blackscreen');
let hint = document.getElementById('hint'); // get the hint element
let textBlackscreen = document.getElementById('textBlackscreen');
let secondPart = document.getElementById('secondPart');

// Hide replies-section initially
repliesSection.style.display = 'none';

// Track confirmation state for rep1
let rep1ClickedOnce = false;

function typeWriterEffectBlackscreen(texts, element, callback) {
    let idx = 0;
    function showCurrentText() {
        let text = texts[idx];
        let i = 0;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        }
        type();
    }

    function onClick() {
        if (idx < texts.length) {
            showCurrentText();
            // Wait for user click to proceed to next text
            let proceed = function() {
                idx++;
                if (idx < texts.length) {
                    showCurrentText();
                } else {
                    // Remove click listener and proceed
                    blackscreen.removeEventListener('click', proceed);
                    if (callback) callback();
                }
                // Only advance on click after text is fully shown
                blackscreen.removeEventListener('click', proceed);
                setTimeout(() => {
                    blackscreen.addEventListener('click', proceed);
                }, texts[Math.max(idx-1,0)].length * 30 + 50);
            };
            // Add click listener after text is fully shown
            setTimeout(() => {
                blackscreen.addEventListener('click', proceed);
            }, text.length * 30 + 50);
        }
    }

    // Start with first text
    showCurrentText();
    // Remove any previous click listeners
    blackscreen.onclick = null;
    // Add click listener for the first advance
    let proceed = function() {
        idx++;
        if (idx < texts.length) {
            showCurrentText();
        } else {
            blackscreen.removeEventListener('click', proceed);
            if (callback) callback();
        }
        blackscreen.removeEventListener('click', proceed);
        setTimeout(() => {
            blackscreen.addEventListener('click', proceed);
        }, texts[Math.max(idx-1,0)].length * 30 + 50);
    };
    setTimeout(() => {
        blackscreen.addEventListener('click', proceed);
    }, texts[0].length * 30 + 50);
}

rep1.onclick = function() {
    if (!rep1ClickedOnce) {
        hint.textContent = "Hint: If you run out of gold, you may also succumb to the wastes. Click your choice again to confirm.";
        hint.style.display = "block";
        hint.style.opacity = "1";
        rep1ClickedOnce = true;
    } else {
        blackscreen.style.display = 'block';
        hint.textContent = "";
        hint.style.display = "none";
        rep1ClickedOnce = false;

        // Black screen texts
        const blackscreenTexts = [
            "...",
            "...",
            "Do you think the person you see in the reflection is also worthy of gold?"
        ];
        typeWriterEffectBlackscreen(blackscreenTexts, textBlackscreen, function() {
            blackscreen.style.display = 'none';
            textBlackscreen.innerHTML = "";
            document.getElementById('firstPart').style.display = 'none'; // Hide firstPart
            secondPart.style.display = 'flex'; // Show secondPart
        });
    }
};

rep2.onclick = function() {
    document.getElementById('firstPart').style.display = 'none';
    mainContent.style.display = 'flex';
    mainContent.style.opacity = '1';
    repliesSection.style.display = 'none';
    curInd = -1;
    box.innerHTML = "...";
    hint.textContent = "";
    hint.style.display = "none";
    rep1ClickedOnce = false;
};



/*Hint button*/

let hintButton = document.getElementById('hint');

hintButton.addEventListener("click", event=>{
    let answerOne = document.getElementById('answerOne');
    if(!answerOne) {
        error.style.opacity = "1";
        error.style.display = "block";
        error.textContent = "Hint: Click the Text Box";
    } else {
        error.style.opacity = "1";
        error.style.display = "block";
        error.textContent = "Hint: Read bottom-top, right-left.";
    }
    
});


