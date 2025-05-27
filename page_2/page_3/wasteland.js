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

// General typewriter effect for any element
let typeWriterTimeout = null;
let isTyping = false;
function typeWriterEffect(text, element, onDone) {
    element.innerHTML = "";
    let i = 0;
    isTyping = true;
    function type() {
        if (!isTyping) {
            element.innerHTML = text;
            if (onDone) onDone();
            return;
        }
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typeWriterTimeout = setTimeout(type, 30);
        } else {
            isTyping = false;
            if (onDone) onDone();
        }
    }
    type();
}

let hasEnteredSecondPart = false;

if(!hasEnteredSecondPart){
    firstPartDialogue.addEventListener("click", () => {
        if (isTyping) {
            isTyping = false;
            if (typeWriterTimeout) clearTimeout(typeWriterTimeout);
            if (curInd >= 0 && curInd < texts.length) {
                box.innerHTML = texts[curInd];
            }
            return;
        }
        if (curInd < texts.length - 1) {
            curInd++;
            typeWriterEffect(texts[curInd], box);
            if (curInd === texts.length - 1) {
                setTimeout(() => {
                    repliesSection.style.display = 'flex';
                    rep1.textContent = "Offer gold";
                    rep2.textContent = "Run away";
                }, texts[curInd].length * 30 + 100);
            }
        }
    });
}



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
        let idx = 0;
        function showCurrentText() {
            typeWriterEffect(blackscreenTexts[idx], textBlackscreen);
        }
        showCurrentText();
        blackscreen.onclick = null;
        blackscreen.onclick = function() {
            idx++;
            if (idx < blackscreenTexts.length) {
                showCurrentText();
            } else {
                blackscreen.style.display = 'none';
                textBlackscreen.innerHTML = "";
                blackscreen.onclick = null;
                document.getElementById('firstPart').style.display = 'none';
                secondPart.style.display = 'flex';
            }
        };
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



/*Second Part Dialogues*/
let secondPartDialogueBox = document.getElementById('secondPartDialogueBox');
let secondBox = document.getElementById('secondPartDialogue');
let secondRepliesSection = document.querySelector('.replies-section2');
let secondRep1 = document.getElementById('secondrep1');
let secondRep2 = document.getElementById('secondrep2');
let krill1 = document.getElementById('krill1');
let secondCurInd = -1;
let secondTypeWriterTimeout = null;
let secondIsTyping = false;

hasEnteredSecondPart = true;
let secondTexts = [
    "You see another dark dragon.",
    "What do you want to do?"
];

// Hide second replies-section initially
secondRepliesSection.style.display = 'none';

// Typewriter for second part
function typeWriterEffectSecond(text, element) {
    element.innerHTML = "";
    let i = 0;
    secondIsTyping = true;

    function type() {
        if (!secondIsTyping) {
            element.innerHTML = text;
            return;
        }
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            secondTypeWriterTimeout = setTimeout(type, 30);
        } else {
            secondIsTyping = false;
        }
    }
    type();
}

// Dialogue click for second part
secondPartDialogueBox.addEventListener("click", () => {
    if (secondIsTyping) {
        secondIsTyping = false;
        if (secondTypeWriterTimeout) clearTimeout(secondTypeWriterTimeout);
        if (secondCurInd >= 0 && secondCurInd < secondTexts.length) {
            secondBox.innerHTML = secondTexts[secondCurInd];
        }
        return;
    }
    if (secondCurInd < secondTexts.length - 1) {
        secondCurInd++;
        secondIsTyping = true;
        typeWriterEffect(secondTexts[secondCurInd], secondBox, () => { secondIsTyping = false; });
        if (secondCurInd === secondTexts.length - 1) {
            setTimeout(() => {
                secondRepliesSection.style.display = 'flex';
                secondRep1.textContent = "Offer Gold";
                secondRep2.textContent = "Run away";
            }, secondTexts[secondCurInd].length * 30 + 100);
        }
    }
});

// --- Second Part Hint Logic ---
let secondHint = secondPart.querySelector('#hint');
let secondRep1ClickedCount = 0;
let secondRep2ClickedOnce = false;

// Add this array for the blackscreen texts in secondPart
const secondTextsBlackscreen = [
    "",
    "Hint: See? I told you!",
    "Hint: Fine! I'll give you my gold.",
    "...",
    "...",
    "A four letter word, every being deserves.",
    "Even the one in the reflection.",
    "That is the knowledge of this wasteland."
];

secondRep1.onclick = function() {
    secondRep1ClickedCount++;
    if (secondRep1ClickedCount === 1) {
        secondHint.textContent = "Hint: Are you really sure about this? Click your choice again to confirm.";
        secondHint.style.display = "block";
        secondHint.style.opacity = "1";
    } else if (secondRep1ClickedCount === 2) {
        secondHint.textContent = "Okay, fine! Click it one last time.";
    } else if (secondRep1ClickedCount === 3) {
        secondHint.textContent = "";
        secondHint.style.display = "none";
        blackscreen.style.display = 'block';
        let blackIdx = 0;
        function showBlackText(idx) {
            typeWriterEffect(secondTextsBlackscreen[idx], textBlackscreen);
        }
        showBlackText(blackIdx);
        blackscreen.onclick = null;
        blackscreen.onclick = function() {
            blackIdx++;
            if (blackIdx < secondTextsBlackscreen.length) {
                showBlackText(blackIdx);
            } else {
                blackscreen.style.display = 'none';
                textBlackscreen.textContent = "";
                secondRep1ClickedCount = 0;
                blackscreen.onclick = null;
            }
        };
    }
    secondRep2ClickedOnce = false;
};

secondRep2.onclick = function() {
    // Hide secondPart, show firstPart, hide krill1
    document.getElementById('secondPart').style.display = 'none';
    document.getElementById('firstPart').style.display = 'flex';
    if (krill1) krill1.style.display = 'none';
    // Reset firstPart dialogue state
    curInd = 2;
    texts[2] = "";
    box.innerHTML = "";
    repliesSection.style.display = 'flex';
    rep1.textContent = "Proceed";
    rep2.textContent = "Go Back";
    // Hide secondPart dialogue state
    secondCurInd = -1;
    secondBox.innerHTML = "...";
    secondRepliesSection.style.display = 'none';
    // Hide second hint
    secondHint.textContent = "";
    secondHint.style.display = "none";
    secondRep2ClickedOnce = false;
    secondRep1ClickedCount = 0;

    // Disable firstPartDialogueBox click event
    hasEnteredSecondPart = true;

    // Set up firstPart rep1/rep2 handlers for this state
    let goBackClickedOnce = false;
    rep1.onclick = function() {
        // Proceed to secondPart immediately
        document.getElementById('firstPart').style.display = 'none';
        secondPart.style.display = 'flex';
        // Reset firstPart state
        curInd = -1;
        box.innerHTML = "...";
        repliesSection.style.display = 'none';
        hasEnteredSecondPart = false; // Re-enable dialogue click for next time
        // Restore original handlers after proceeding
        setupFirstPartHandlers();
    };
    rep2.onclick = function() {
        if (!goBackClickedOnce) {
            hint.textContent = "If you choose to go back, it will reset your progress. Click your choice again to confirm.";
            hint.style.display = "block";
            hint.style.opacity = "1";
            goBackClickedOnce = true;
        } else {
            location.reload();
        }
    };
};



// --- First Part Dialogue Click Handler ---
function firstPartDialogueClickHandler() {
    if (hasEnteredSecondPart) return; // Disable if returned from secondPart
    // ...existing code for typewriter and advancing dialogue...
    if (isTyping) {
        isTyping = false;
        if (typeWriterTimeout) clearTimeout(typeWriterTimeout);
        if (curInd >= 0 && curInd < texts.length) {
            box.innerHTML = texts[curInd];
        }
        return;
    }
    if (curInd < texts.length - 1) {
        curInd++;
        typeWriterEffect(texts[curInd], box);
        if (curInd === texts.length - 1) {
            setTimeout(() => {
                repliesSection.style.display = 'flex';
                rep1.textContent = "Offer gold";
                rep2.textContent = "Run away";
            }, texts[curInd].length * 30 + 100);
        }
    }
}

// Attach the handler initially
firstPartDialogue.onclick = firstPartDialogueClickHandler;



