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
    if (identityProof.value.trim().toLowerCase() === "lavender") {
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

