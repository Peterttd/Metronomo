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

function updateVolumeLabel(newVolume){
    volume = newVolume;
    document.getElementById("volumeLabel").innerHTML =  (volume * 100).toFixed(0) + "%";
    console.log("volume: " + volume)
}
function updateCompass(newCompass){
    compass = newCompass;
    console.log("compasso: " + compass)

    var numCompass = compass.split('/');
    comp = parseInt(numCompass[0], 10);
    console.log(comp);

    if(comp == 6){
        dobrar = 30000;
        if(isPlayng){
        startMetronome();
        startMetronome();
        }
    }else{
        dobrar = 60000;
        if(isPlayng){
        startMetronome();
        startMetronome();
        }
    }

}
function updateTempo(newTempo){
    tempo = newTempo;
    console.log("Tempo: " + tempo)
}
function playAudio(){
    audio.currentTime = 0;
    console.log("click!")

    if(bat == 0){
        audio.volume = 1 * volume;
        audio.play();
        bat ++;
        console.log(bat)

        box.style.boxShadow = '0 0 3rem rgba(155, 155, 155, 255)';
        setTimeout(function () {
            box.style.boxShadow = 'none';
        }, 100);
    }else if(bat == comp - 1){
        bat = 0;
        box.style.boxShadow = '0 0 1rem rgba(155, 155, 155, 255)';
        setTimeout(function () {
            box.style.boxShadow = 'none';
        }, 100);
    }else{
        audio.volume = 0.3 * volume;
        audio.play();
        bat ++;
        box.style.boxShadow = '0 0 1rem rgba(155, 155, 155, 255)';
        setTimeout(function () {
            box.style.boxShadow = 'none';
        }, 100);
    }
}
function startMetronome(){
    console.log(bat)
    if(!isPlayng){
        bat = 0;
        playAudio();
        isPlayng = true;
        console.log("iniciou");
        timer = setInterval(playAudio, dobrar/tempo);
        document.getElementById("labelButton").classList.add("pressed");
        document.getElementById("icon").classList.toggle("fa-play")
        document.getElementById("icon").classList.toggle("fa-stop")
    }else{
        clearInterval(timer);
        isPlayng = false;
        console.log("parou");
        document.getElementById("button").innerHTML = "Play";
        document.getElementById("labelButton").classList.remove("pressed");
        document.getElementById("icon").classList.toggle("fa-play")
        document.getElementById("icon").classList.toggle("fa-stop")
        box.style.boxShadow = '0 0 9px #50505056';
    }
}

function turnMode(){
    if(document.body.classList == "light"){
    document.body.classList.remove("light");   
    document.body.classList.add("dark");
    }else{
    document.body.classList.remove("dark");
    document.body.classList.add("light");   
    }
}

