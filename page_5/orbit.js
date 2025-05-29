let clickSFX = document.getElementById('click_sfx');

let x = document.querySelector('body');
x.addEventListener("click", event=>{
    clickSFX.play();
});



/*Start Page*/
let orbitStartPage = document.getElementById('orbitStartPage');
let mainContent = document.getElementById('mainContent');
let submitIdentity = document.getElementById('submit_identity');
let identityProof = document.getElementById('identityProof');
let sound = document.getElementById('music');

submitIdentity.onclick = function() {
    if (identityProof.value.trim().toLowerCase() === "carnation") {
        if (sound) sound.play();
        orbitStartPage.style.opacity = '0';
        setTimeout(() => {
            orbitStartPage.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.display = 'flex';
        }, 500);
    } else {
        identityProof.value = "";
        identityProof.placeholder = "Incorrect. Try again.";
    }
}

let readButton = document.getElementById('read_button');
let message = document.getElementById('message');

if (readButton && message && mainContent) {
    readButton.onclick = function() {
        message.style.display = 'flex';
        mainContent.style.display = 'none';
    };
}

/*Message*/
let texts = [
    `Happy birthday, my love! Yeyyyyy 19th years since you were reborn haha. Love ghapon tika sa previous life nato yieeee.
I hope you have a wonderful day filled with love and happiness. You deserve all the best things in life, and I am so grateful to have you by my side.
Gi suggest ni AI HAHAHAHHA but yeah still, it took words out of my mouth hahaha. I love you so much bb. Like sooo much`,
    `Sorry sammmmm huhuhu if you ever felt like gikuwangan tika or wala ko naghatag ug time nimo. (I swear weird kaayo ang AI
suggestion, nangita ko'g words nga sakto, ni suggest siya sa "gikuwangan tika..." hahaha TT) but yeah like that. But yeahh you see what i was working on haha.
Hope you enjoyed ang additional labad sa ulo to get here hahaha bisag birthday nimo.`,
    `Pero wowers ouieeeeeee nahuman na nato ang first year wthhhhh. THAT FELT SOOOOOO LONG. Kakapoy hahaha TT.
Naa pa'y 3 more years huhuhu gikapoy nako'g hunahuna daan. Literally felt super long haha, pero still enjoyable kay kuyog ka pirme afterclass haha.
Literally the only thing I look forward to sa school hahaha. But yeyyyy we made it.Kita nagud na diba. Wowers nato eyyyy.`,
    `Ahahaha struggle kaayo first sem, imong mga 9pm classes haha. Kapoy but memorable kaayo atong late night woks.
Imong anaphy nga apil ko'g ka learn hahaha. Karon puros namo retdem, and then yeyyyyyyy mag capping na. Wowers mag duty naka padulong.
Nohhh kahangak ana, pero kaya ra gyud na nimo Sam. Tas taas kaayo ang second semmmmm bisag gamay ra ang bulan. Kapoya skwela ouie hahahaha.`,
    `Ohhh kato pud start sa klase daghan kayo'g naghatag problema nimo. Ka give-upon akong Sami atooo kaluoy ouie TT. Pero diba kusgan ka haha.
Diba na kaya ra nimo tanan. Na kaya ra nato despite the many times that we felt like giving up. Kani si AI ba, taking words right off my mouth bisag
nag bisaya-english nako hahaha.`,
    `Pero noh. Kapoy gyud looking back at it. I mean, we did it eyyy. More "we did it" to come ahaha. Sige di nako mag relapse relapse ari hahaha TT.
But yeah anyway, what I want to convey with whatever I made here is, I'll always be with you, Sam. In all stages of life. Wla mn ko nimo pagbata hahaha
but yes. Mao to complete na nimo level one and two eyyy. Yes, same sa hints nga naa pirme, naa rako para nimo bb.`,
    `Huhu sorry Sam if there are times where you felt like I didn't. Tao lang po may pagkukulang rin, usahay masubraan hahaha. Subraan sa pagkasaputon haha.
But yeahhhh. I'll be with you through all questions without answers, problems without solutions, testcases nga di gyud nako ma sakto, mga none but all of the aboves haha.
Mao na ayaw gyud dudahi akong love nimo haystttttt sami, kay love tika kahit sa next life.`,
    `Ahhhhh kahinumdom koooo haha. Nagtanom kog tulips. Pero pag abot diri nitubo na daan ang mga leave sprouts sa bulb.
And then nangamatay hahaha. Mao pa na man unta plano nako ihatag nimo run. Pero wala na haha. Anyways, hope you enjoyed the song haha.
I feel like, it truly captures how I feel hehe. Nadugay pud ko maayo ana kay WALA NA SAVE OR NAWAGTANG ang first na koan.`,
    `Pero oo haha mao na, "Sayo ko lang muli nasubukang lumipad." Nya imo ko i bash nganong muli hahaha. I haven't been happy since
inosente pakong bata haha. Mao na gi include nako ang muli. Pero yeahhh enough monologue from me. I hope you enjoy your special day bb.
More birthdays to come and celebrate with you hehe. I love you, Sam <3 my Crissa May P. Econas hehe.<br><br> - Jiyan`,
    `P.S.<br><br>Oh yeah btw, yes 143 password sa katong lock. Kana lng sa kay mao ra'y masulod. Ayaw nana ibitay sa imo ID hahaha. Have it elsewhere.
Izza mark nga uyab kag hello world boi. Napul-an na gyud nis sami sa mga pins nako ba hahaha sorry sam. Ganahan man ko bi.`
];

// Navigation logic
let currentIndex = 0;
const textMessage = document.getElementById('textMessage');
const prevButton = document.getElementById('prev_button');
const nextButton = document.getElementById('next_button');

function fadeOutInText(newText) {
    textMessage.classList.add('fade-out');
    setTimeout(() => {
        textMessage.innerHTML = newText;
        textMessage.classList.remove('fade-out');
        textMessage.classList.add('fade-in');
        setTimeout(() => {
            textMessage.classList.remove('fade-in');
        }, 300); // match fade-in duration
    }, 300); // match fade-out duration
}

function updateMessage() {
    fadeOutInText(texts[currentIndex]);
    if (currentIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = '';
    }
    if (currentIndex === texts.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = '';
    }
}

// Initialize message when message is shown
if (readButton && message && mainContent) {
    readButton.onclick = function() {
        message.style.display = 'flex';
        mainContent.style.display = 'none';
        currentIndex = 0;
        updateMessage();
    };
}

// Button event listeners
if (prevButton && nextButton) {
    prevButton.onclick = function(e) {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            updateMessage();
        }
    };
    nextButton.onclick = function(e) {
        e.stopPropagation();
        if (currentIndex < texts.length - 1) {
            currentIndex++;
            updateMessage();
        }
    };
}

