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

/*Typewriter Effect*/
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


/*First Part*/
let goInside = document.getElementById('inside_button');
let firstPart = document.getElementById('firstPart');

goInside.addEventListener("click", event=>{
    firstPart.style.display = 'flex';
    mainContent.style.display = 'none';
});



// First Part Dialogue
let firstPartDialogue = document.getElementById('firstPartDialogueBox');
let texts = [
    "You see a dark dragon in front of you.",
    "It is the manifestation of all who succumbed to the wastes.",
    "What do you want to do?"
    
];

let box = document.getElementById('firstPartDialogue');
let curInd = -1;
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


// Replies Section First Part
let repliesSection = document.querySelector('.replies-section');
let rep1 = document.getElementById('rep1');
let rep2 = document.getElementById('rep2');
let blackscreen = document.getElementById('blackscreen');
let hint = document.getElementById('hint'); 
let textBlackscreen = document.getElementById('textBlackscreen');
let secondPart = document.getElementById('secondPart');

repliesSection.style.display = 'none';

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

        //First Part Black Screen Texts
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



// Second Part Dialogue
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

secondRepliesSection.style.display = 'none';

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

// Second Part Black Screen Texts
let secondHint = secondPart.querySelector('#hint');
let secondRep1ClickedCount = 0;
let secondRep2ClickedOnce = false;

const secondTextsBlackscreen = [
    "",
    "Hint: See? I told you!",
    "Hint: Fine! I'll give you my gold.",
    "...",
    "...",
    "A four letter word, every being deserves.",
    "...",
    "...",
    "That is the knowledge of this wasteland."
];

secondRep1.onclick = function() {
    secondRep1ClickedCount++;
    if (secondRep1ClickedCount === 1) {
        secondHint.textContent = "Hint: Are you really sure about this? Click your choice again to confirm.";
        secondHint.style.display = "block";
        secondHint.style.opacity = "1";
    } else if (secondRep1ClickedCount === 2) {
        secondHint.textContent = "Hint: Okay, fine! Click it one last time.";
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
                if (typeof wastelandTemple !== "undefined" && wastelandTemple) {
                    wastelandTemple.style.display = 'flex';
                    document.body.style.backgroundImage = 'url("Assets_Wasteland/temple.png")';
                }
                if (mainContent) mainContent.style.display = 'none';
                document.getElementById('firstPart').style.display = 'none';
                document.getElementById('secondPart').style.display = 'none';
            }
        };
    }
    secondRep2ClickedOnce = false;
};

secondRep2.onclick = function() {
    document.getElementById('secondPart').style.display = 'none';
    document.getElementById('firstPart').style.display = 'flex';
    if (krill1) krill1.style.display = 'none';
    curInd = 2;
    texts[2] = "";
    box.innerHTML = "";
    repliesSection.style.display = 'flex';
    rep1.textContent = "Proceed";
    rep2.textContent = "Go Back";
    secondCurInd = -1;
    secondBox.innerHTML = "...";
    secondRepliesSection.style.display = 'none';
    secondHint.textContent = "";
    secondHint.style.display = "none";
    secondRep2ClickedOnce = false;
    secondRep1ClickedCount = 0;

    hasEnteredSecondPart = true;

    let goBackClickedOnce = false;
    rep1.onclick = function() {
        document.getElementById('firstPart').style.display = 'none';
        secondPart.style.display = 'flex';
        curInd = -1;
        box.innerHTML = "...";
        repliesSection.style.display = 'none';
        hasEnteredSecondPart = false; 
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

const wastelandTemple = document.querySelector('.wastelandTemple');
const templeButton = document.getElementById('templeButton');
const templeText = document.getElementById('templeText');

if (templeButton) {
    templeButton.onclick = function() {
        wastelandTemple.style.display = 'none';
        blackscreen.style.display = 'block';
        let textsTemple = [
            "Enter the knowledge you have learned.",
            '<input id="knowledge" type="text"><br><button id="submit_knowledge">Submit</button>'
        ];
        let idx = 0;
        function showTempleText(i) {
            if (i === 1) {
                textBlackscreen.innerHTML = textsTemple[i];
                const knowledgeInput = document.getElementById('knowledge');
                const submitBtn = document.getElementById('submit_knowledge');
                if (knowledgeInput) {
                    knowledgeInput.focus();
                    knowledgeInput.onkeydown = function(e) {
                        if (e.key === "Enter") {
                            validateKnowledge();
                        }
                    };
                }
                if (submitBtn) {
                    submitBtn.onclick = function(e) {
                        e.stopPropagation();
                        validateKnowledge();
                    };
                }
                // Listen for click on blackscreen to also validate
                blackscreen.onclick = function() {
                    validateKnowledge();
                };
            } else {
                typeWriterEffect(textsTemple[i], textBlackscreen);
                blackscreen.onclick = function() {
                    idx++;
                    showTempleText(idx);
                };
            }
        }
        showTempleText(idx);

        function validateKnowledge() {
            const knowledgeInput = document.getElementById('knowledge');
            if (!knowledgeInput) return;
            const val = knowledgeInput.value.trim().toLowerCase();
            if (val === "love") {
                window.location.href = '../page_4/knowledge.html';
            } else {
                let hintElem = document.getElementById('hint');
                if (hintElem) {
                    // Only move the hint if not already inside blackscreen
                    if (hintElem.parentElement !== blackscreen) {
                        blackscreen.appendChild(hintElem);
                    }
                    // Remove any duplicate "Incorrect Answer" hints
                    hintElem.textContent = "Incorrect Answer";
                    hintElem.style.display = "block";
                    hintElem.style.opacity = "1";
                    hintElem.style.zIndex = "10001";
                    hintElem.style.position = "relative";
                    hintElem.style.left = "0";
                    hintElem.style.top = "0";
                    hintElem.style.transform = "none";
                    hintElem.style.margin = "18px auto 0 auto";
                    hintElem.style.width = "140px";
                } 
                knowledgeInput.value = "";
                knowledgeInput.focus();

                // Remove any duplicate hints that may have been appended
                // (should only be one, but just in case)
                const allHints = blackscreen.querySelectorAll('#hint');
                if (allHints.length > 1) {
                    for (let i = 1; i < allHints.length; i++) {
                        allHints[i].remove();
                    }
                }
            }
        }
    };
}



