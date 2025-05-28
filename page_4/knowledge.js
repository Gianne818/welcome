/*Sound Controls*/
let sound = document.getElementById('music');
let button = document.getElementById('soundOn')
let clickSFX = document.getElementById('click_sfx');

button.addEventListener("click", event=>{
    if(sound.paused){
        sound.play();
        button.src = "Assets_Knowledge/sound_on.png";
    }
    else if(sound.play()){
        sound.pause();
        button.src = "Assets_Knowledge/sound_off.png";
    }
});

let x = document.querySelector('body');
x.addEventListener("click", event=>{
    clickSFX.play();
});



/*Start Page*/
let startButton = document.getElementById('continue_button');
let startPage = document.getElementById('startPageKnowledge');
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

/*Library*/
let meditate = document.getElementById('meditate_button');
let library = document.getElementById('library'); 

meditate.addEventListener("click", event=>{
    library.style.display = 'flex';
    mainContent.style.display = 'none';
});

let memoryFront = document.getElementById('memoryFront');
let memorySide = document.getElementById('memorySide');
let memoryFrontKnowledge = document.getElementById('memoryFrontKnowledge');
let memorySideKnowledge = document.getElementById('memorySideKnowledge');
let submitMemoryFront = document.getElementById('submitMemoryFront');
let submitMemorySide = document.getElementById('submitMemorySide');
let memoryInputTriumph = document.getElementById('memoryInputTriumph');
let memoryInputWastes = document.getElementById('memoryInputWastes');
let hintTriumph = document.getElementById('hintTriumph');
let hintWastes = document.getElementById('hintWastes');

let isCompletedTriumph = false;
let isCompletedWastes = false;


memoryFrontKnowledge.style.display = 'none';
memorySideKnowledge.style.display = 'none';

memoryFront.onclick = function() {
    if (memoryFrontKnowledge) memoryFrontKnowledge.style.display = 'flex';
    if (memorySideKnowledge) memorySideKnowledge.style.display = 'none';
    if (hintTriumph) hintTriumph.textContent = "";
    if (memoryInputTriumph) memoryInputTriumph.value = "";
};

memorySide.onclick = function() {
    if (memorySideKnowledge) memorySideKnowledge.style.display = 'flex';
    if (memoryFrontKnowledge) memoryFrontKnowledge.style.display = 'none';
    if (hintWastes) hintWastes.textContent = "";
    if (memoryInputWastes) memoryInputWastes.value = "";
};

submitMemoryFront.onclick = function() {
    const val = memoryInputTriumph.value.trim().toLowerCase();
    if (val === "1" || val === "one") {
        memoryFrontKnowledge.style.display = 'none';
        memoryFront.style.filter = "brightness(1.0)";
        isCompletedTriumph = true;
        checkBothCompleted();
    } else {
        hintTriumph.textContent = "Wrong Knowledge! (Hint: Its a number! Go back to the Hall of the Triumphant if you have forgotten.)";
    }
}


submitMemorySide.onclick = function() {
    const val = memoryInputWastes.value.trim().toLowerCase();
    if (val === "4" || val === "four") {
        memorySideKnowledge.style.display = 'none';
        memorySide.style.filter = "brightness(1.0)";
        isCompletedWastes = true;
        checkBothCompleted();
    } else {
        hintWastes.textContent = "Wrong Knowledge! (Hint: Its a number! Go back to the Wastes if you have forgotten.)";
    }
};

function checkBothCompleted() {
    if (isCompletedTriumph && isCompletedWastes) {
        // Prevent duplicate button
        if (!document.getElementById('proceedButton')) {
            const proceedBtn = document.createElement('button');
            proceedBtn.id = 'proceedButton';
            proceedBtn.textContent = 'Proceed';
            // Insert as child of library, centered at top
            const container = document.getElementById('proceedButtonContainer');
            if (container) {
                container.appendChild(proceedBtn);
            }
        }
    }
}

// Add fade-in/fade-out and final knowledge logic
const proceedBtnContainer = document.getElementById('proceedButtonContainer');
const blackScreen = document.getElementById('blackScreen');
const finalMemoryKnowledge = document.getElementById('finalMemoryKnowledge');
const finalKnowledgeText = document.getElementById('finalKnowledgeText');
const finalKnowledgeDiv = blackScreen ? blackScreen.querySelector('.finalKnowledge') : null;
const finalKnowledgeInput = document.getElementById('finalKnowledgeInput');
const submitFinalKnowledge = document.getElementById('submitFinalKnowledge');
const finalKnowledgePrompt = document.getElementById('finalKnowledgePrompt');

function fadeInBlackScreen() {
    if (!blackScreen) return;
    blackScreen.classList.add('show');
    blackScreen.style.display = 'flex';
    setTimeout(() => {
        blackScreen.style.opacity = '1';
    }, 10);
}

function fadeOutBlackScreen() {
    if (!blackScreen) return;
    blackScreen.style.opacity = '0';
    setTimeout(() => {
        blackScreen.classList.remove('show');
        blackScreen.style.display = 'none';
    }, 700);
}

// Final knowledge texts array
const finalKnowledgeTexts = [
    "...",
    "Click on the memory cube to receive the final knowledge."
];

// Typewriter effect for finalKnowledgeText, with skip-on-click for any text
let finalTypeWriterTimeout = null;
let isFinalTyping = false;
let currentTypeWriterText = "";
function typeWriterEffectFinal(text, element, onDone) {
    if (!element) return;
    element.textContent = "";
    let i = 0;
    isFinalTyping = true;
    currentTypeWriterText = text;
    function type() {
        if (!isFinalTyping) {
            element.textContent = text;
            if (onDone) onDone();
            return;
        }
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            finalTypeWriterTimeout = setTimeout(type, 30);
        } else {
            isFinalTyping = false;
            if (onDone) onDone();
        }
    }
    type();
}

// Handle proceed button click
document.addEventListener('click', function(e) {
    const proceedBtn = document.getElementById('proceedButton');
    if (proceedBtn && e.target === proceedBtn) {
        fadeInBlackScreen();
        if (finalKnowledgeDiv) finalKnowledgeDiv.style.display = 'none';
        if (finalKnowledgeText) {
            typeWriterEffectFinal(finalKnowledgeTexts[0], finalKnowledgeText);
        }
        isFinalTyping = false;
        if (finalTypeWriterTimeout) clearTimeout(finalTypeWriterTimeout);
    }
});

// Black screen click: show prompt and final knowledge input
if (blackScreen && finalMemoryKnowledge && finalKnowledgeText && finalKnowledgeDiv) {
    blackScreen.onclick = function(e) {
        if (e.target === blackScreen) {
            // If typewriter is running, finish immediately
            if (isFinalTyping) {
                isFinalTyping = false;
                if (finalTypeWriterTimeout) clearTimeout(finalTypeWriterTimeout);
                finalKnowledgeText.textContent = currentTypeWriterText;
                return;
            }
            // Only typewriter if not already showing the prompt
            if (finalKnowledgeText.textContent !== finalKnowledgeTexts[1]) {
                typeWriterEffectFinal(finalKnowledgeTexts[1], finalKnowledgeText);
            }
            finalKnowledgeDiv.style.display = "none";
        }
    };

    // Allow skipping typewriter on click for any text
    if (finalKnowledgeText) {
        finalKnowledgeText.onclick = function() {
            if (isFinalTyping) {
                isFinalTyping = false;
                if (finalTypeWriterTimeout) clearTimeout(finalTypeWriterTimeout);
                finalKnowledgeText.textContent = currentTypeWriterText;
            }
        };
    }

    finalMemoryKnowledge.style.pointerEvents = "auto";
    finalMemoryKnowledge.onclick = function(e) {
        if (isFinalTyping) {
            isFinalTyping = false;
            if (finalTypeWriterTimeout) clearTimeout(finalTypeWriterTimeout);
            finalKnowledgeText.textContent = currentTypeWriterText;
            return;
        }
        finalKnowledgeDiv.style.display = "flex";
        if (finalKnowledgePrompt) {
            typeWriterEffectFinal(finalKnowledgePrompt.textContent, finalKnowledgeText);
        }
        finalKnowledgeInput.value = "";
        isFinalTyping = false;
        if (finalTypeWriterTimeout) clearTimeout(finalTypeWriterTimeout);
        e.stopPropagation();
    };
}

// Final knowledge validation
if (submitFinalKnowledge && finalKnowledgeInput) {
    submitFinalKnowledge.onclick = function() {
        const val = finalKnowledgeInput.value.trim().toLowerCase();
        if (val === "3" || val === "three") {
            window.location.href = "hbd.html";
        } else {
            typeWriterEffectFinal("Incorrect!", finalKnowledgeText);
        }
    };
}