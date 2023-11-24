let isPlayng = false;
const audio = document.getElementById("metronomeAudio");
let volume = 0.5;
let compass = "4/4";
let tempo = 120;
let timer = null;
let comp = 4;
let bat = 0;
let dobrar = 60000;
const box = document.getElementById("box");
var bolaAcesa = document.getElementById('ball' + bat);

function updateVolumeLabel(newVolume) {
    volume = newVolume;
    document.getElementById("volumeLabel").innerHTML = (volume * 100).toFixed(0) + "%";
    console.log("volume: " + volume)
}
function updateCompass(newCompass) {
    compass = newCompass;
    console.log("compasso: " + compass)

    var numCompass = compass.split('/');
    comp = parseInt(numCompass[0], 10);
    console.log(comp);

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

}
function updateTempo(newTempo) {
    tempo = newTempo;
    console.log("Tempo: " + tempo)
}
function playAudio() {
    audio.currentTime = 0;
    console.log("click!")

    if (bat == 0) {
        audio.volume = 1 * volume;
        audio.play();
        bat++;
        console.log(bat)

        box.style.boxShadow = '0 0 3rem rgba(155, 155, 155, 255)';
        bolaAcesa.classList.add('on');
        setTimeout(function () {
            box.style.boxShadow = 'none';
            bolaAcesa.classList.remove('on');
            bolaAcesa = document.getElementById('ball' + bat);
        }, 50);


    } else if (bat == comp - 1) {
        box.style.boxShadow = '0 0 1rem rgba(155, 155, 155, 255)';
        bolaAcesa.classList.add('on');
        setTimeout(function () {
            box.style.boxShadow = 'none';
            bolaAcesa.classList.remove('on');
            bolaAcesa = document.getElementById('ball' + bat);
        }, 50);

        bat = 0;
    } else {

        audio.volume = 0.3 * volume;
        audio.play();
        bat++;
        box.style.boxShadow = '0 0 1rem rgba(155, 155, 155, 255)';
        bolaAcesa.classList.add('on');
        setTimeout(function () {
            box.style.boxShadow = 'none';
            bolaAcesa.classList.remove('on');
            bolaAcesa = document.getElementById('ball' + bat);
        }, 50);
    }
}
function startMetronome() {
    console.log(bat)
    if (!isPlayng) {
        bat = 0;
        playAudio();
        isPlayng = true;
        console.log("iniciou");
        timer = setInterval(playAudio, dobrar / tempo);
        document.getElementById("labelButton").classList.add("pressed");
        document.getElementById("icon").classList.toggle("fa-play")
        document.getElementById("icon").classList.toggle("fa-stop")

        for (var i = 0; i <= comp - 1; i++) {
            document.getElementById("ball" + i).classList.toggle("visible");
            console.log("ligando bolinhas");
        }
    } else {
        clearInterval(timer);
        isPlayng = false;
        console.log("parou");
        document.getElementById("button").innerHTML = "Play";
        document.getElementById("labelButton").classList.remove("pressed");
        document.getElementById("icon").classList.toggle("fa-play")
        document.getElementById("icon").classList.toggle("fa-stop")
        box.style.boxShadow = '0 0 9px #50505056';
        for (var i = 0; i <= 6; i++) {
            document.getElementById("ball" + i).classList.remove("visible");
            console.log("ligando bolinhas");
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


document.querySelectorAll('.ball-box').forEach(function (ball) {
    ball.classList.remove('on');
});




