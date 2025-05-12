let errorCount = 0;
let sound = document.getElementById('music_1');
let button = document.getElementById('soundOn')
let clickSFX = document.getElementById('click_sfx');
sound.play();

button.addEventListener("click", event=>{
    clickSFX.play();
    if(sound.paused){
        sound.play();
        button.src = "Assets/sound_on.png";
    }
    else if(sound.play()){
        sound.pause();
        button.src = "Assets/sound_off.png";
    }
});

let x = document.querySelector('body');
x.addEventListener("click", event=>{
    clickSFX.play();
});

function formValidation(){
    event.preventDefault();
    let  username = document.getElementById('username');
    let pass = document.getElementById('password');
    let myForm = document.getElementById('userForm');
    let userError = document.getElementById('userError');
    let passError = document.getElementById('passError');
    let hint = document.getElementById('hint');
    
    userError.style.opacity = '0';
    passError.style.opacity = '0';
    hint.style.opacity = '0';
    userError.textContent = "";
    passError.textContent = "";
    hint.textContent = "";
    

    let isError = false;
    

    if(username.value !== "09321496633"){
        userError.textContent = "Incorrect Username!";
        userError.style.opacity = '1';
        isError = true;
        errorCount++;
    }

    if(pass.value !== "crssmy"){
        passError.textContent = "Incorrect Password!";
        passError.style.opacity = '1';
        isError = true;
        errorCount++;
    }

    if(isError){
        if(errorCount>=5){
            hint.style.opacity = '1';
            hint.textContent = "Hint: Its the username and password you always use!";
        }
        return false;
    } 
    if (!isError){
        console.log("Validation successful, redirecting...");
        window.location.href = 'page_2/index.html';
        return true;
    }
   
}
