let isPlayng = false;
const audio = document.getElementById("metronomeAudio");
let volume = 0.5;
let compass = "4/4";
let tempo = 120;
let timer;
let comp = 4;
let bat = 0;
let dobrar = 60000;
const box = document.getElementById("box");
const volumeLabel = document.getElementById("volumeLabel")
const volumeInput = document.getElementById("volumeInput")
const compassInput = document.getElementById("compasso")
const icon = document.getElementById("icon")
var bolaAcesa = document.getElementById('ball' + bat);

volumeInput.addEventListener("input", function () {
    let newVolume = parseFloat(volumeInput.value);
    volumeLabel.innerHTML = (newVolume * 100).toFixed(0) + "%";
    console.log("volume: " + newVolume);
});

compassInput.addEventListener("change", function(){
    let newCompass = String(compassInput.value)
    console.log("compasso: " + newCompass)

    var numCompass = newCompass.split('/');
    comp = parseInt(numCompass[0],7);
    console.log("compasso numérico:" + comp);

    if (comp == 6) {
        dobrar = 30000;
        if (isPlayng) {
            startMetronome();
            startMetronome();
        }
    } else {
        dobrar = 60000;
        if (isPlayng) {
            startMetronome();
            startMetronome();
        }
    }
})

function updateTempo(newTempo) {
    tempo = newTempo;
    console.log("Tempo: " + tempo)
}

function toggleShadowAndBalls(){
    box.style.boxShadow = 'none';
    bolaAcesa.classList.remove('on');
    bolaAcesa = document.getElementById('ball' + bat);
}

function flashesShadowAndBalls(){
    setTimeout(toggleShadowAndBalls, 50);
}

function countBeatsAndDetermineShadowsAndVolume(){
    if (bat == 0) {
        audio.volume = 1 * volume;
        bat++;
        console.log(bat)
        box.style.boxShadow = '0 0 3rem rgba(155, 155, 155, 255)';
        bolaAcesa.classList.add('on');


    } else if (bat == comp - 1) {
        box.style.boxShadow = '0 0 1rem rgba(155, 155, 155, 255)';
        bolaAcesa.classList.add('on');
        bat = 0;
    } else {
        audio.volume = 0.3 * volume;
        bat++;
        box.style.boxShadow = '0 0 1rem rgba(155, 155, 155, 255)';
        bolaAcesa.classList.add('on');

    }
}

function playAudio() {
    audio.currentTime = 0;
    console.log("click!")
    countBeatsAndDetermineShadowsAndVolume();
    audio.play();
    flashesShadowAndBalls();
}

function startMetronome() {
    console.log(bat)
    bat = 0;
    if (!isPlayng) {
        playAudio();
        isPlayng = true;
        console.log("iniciou");
        timer = setInterval(playAudio, dobrar / tempo);
        document.getElementById("labelButton").classList.add("pressed");
        trocarIcone();
        for (var i = 0; i <= comp - 1; i++) {
            let bolas = document.getElementById("ball"+i);
            bolas.classList.toggle("visible");
            console.log("ligando bolinhas");
        }
    } else {
        clearInterval(timer);
        isPlayng = false;
        console.log("parou");
        document.getElementById("labelButton").classList.remove("pressed");
        trocarIcone();
        box.style.boxShadow = '0 0 9px #50505056';
        for (var i = 0; i <= 6; i++) {
            let bolas = document.getElementById("ball"+i);
            if(bolas.classList.contains("visible"))
            bolas.classList.remove("visible");
            console.log("desligando bolinhas");
        }
    }
}

function turnMode() {
    if (document.body.classList == "light") {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    }
}

function trocarIcone(){
    icon.classList.toggle("fa-play")
    icon.classList.toggle("fa-stop")
}


document.querySelectorAll('.ball-box').forEach(function (ball) {
    ball.classList.remove('on');
});