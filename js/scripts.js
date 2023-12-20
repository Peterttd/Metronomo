const tempoInput = document.getElementById("tempoInput")
let tempo = parseInt(tempoInput.value)

tempoInput.addEventListener("change", function () {
    tempo = parseInt(tempoInput.value)
    console.log("tempo: " + tempo)
})

const timeSignatureInput = document.getElementById("timeSignature")
let timeSignature = String(timeSignatureInput.value)
let compass = parseInt(timeSignature[0], 10)

timeSignatureInput.addEventListener("change", function () {
    timeSignature = String(timeSignatureInput.value)
    compass = parseInt(timeSignature[0], 10)
    console.log("compasso: " + timeSignature)
    console.log("compasso numérico: " + compass)
})

const volumeInput = document.getElementById("volumeInput")
const volumeLabel = document.getElementById("volumeLabel")
let volume = parseFloat(volumeInput.value)

volumeInput.addEventListener("input", function () {
    volume = parseFloat(volumeInput.value)
    console.log("volume: " + volume)
    volumeLabel.innerHTML = (volume * 100).toFixed(0) + "%"
})

const playButton = document.getElementById("playButton")
let isPlaying = false

playButton.addEventListener("click", function () {
    if (!isPlaying) {
        togglePlayButtonPressed()
        console.log("playing")
        turnOnTheBalls()
        setIntervals()
        toggleIsPlaying()
        console.log(isPlaying)
        return
    }

    turnOffTheBalls()
    turnOffTheShadows()
    clearIntervals()
    toggleIsPlaying()
    togglePlayButtonPressed()
    console.log(isPlaying)
})

const toggleIsPlaying = () => isPlaying = !isPlaying

let intervalNormal
let intervalDouble

function setIntervals() {
    intervalNormal = setInterval(activeOnIntervalNormal, 60000 / tempo)
    intervalDouble = setInterval(activeOnIntervalDouble, 60000 / (tempo * 2))
}

function clearIntervals() {
    clearInterval(intervalDouble)
    clearInterval(intervalNormal)
}

function activeOnIntervalNormal() {
    shadowStrength()
    updateMetronomeAudio()
    playAudio()
    batCounter()
}

function activeOnIntervalDouble() {
    toggleShadows()
    ToggleTheBalls()
}

const mainBox = document.getElementById("mainBox")
let shadow = '0 0 3rem #9b9b9bff'
let isShadow = false

function toggleShadows() {
    if (isShadow) {
        mainBox.style.boxShadow = shadow
        isShadow = !isShadow
        return
    }
    mainBox.style.boxShadow = 'none'
    isShadow = !isShadow
}

const turnOffTheShadows = () => mainBox.style.boxShadow = 'none'

function shadowStrength() {
    if (currentBat == 1) {
        shadow = '0 0 3rem #9b9b9bff'
        return
    }
    shadow = '0 0 1rem #9b9b9bff'
}

let ballsCount

function turnOnTheBalls() {
    for (i = 1; i <= compass; i++) {
        ballsCount = document.getElementById("ball" + i)
        ballsCount.classList.add("visible")
        console.log("ligando bolinhas")
    }
}

const ballsGroup = document.getElementById("ballsGroup")
let ballsOn = ballsGroup.getElementsByClassName("visible")

function turnOffTheBalls() {
    ballsOn = ballsGroup.getElementsByClassName("visible")
    console.log("bolas ligadas: " + ballsOn.length)
    for (i = 0; i < ballsOn.length; i + 0.5) {
        ballsOn[i].classList.remove("visible")
        console.log("desligando bolinhas")
    }
}

let isTheBallOn
let litBall = document.getElementById('ball1')

function ToggleTheBalls() {
    if (isTheBallOn) {
        litBall.classList.add("on")
        isTheBallOn = !isTheBallOn
        return
    }
    litBall.classList.remove("on")
    litBall = document.getElementById('ball' + currentBat)
    isTheBallOn = !isTheBallOn
}

let currentBat = 1

function batCounter() {
    if (currentBat == compass) {
        currentBat = 1
        console.log("Batida atual: " + currentBat)
        return
    }
    currentBat++
    console.log("Batida atual: " + currentBat)
}

const metronomeAudio1 = document.getElementById("click1")
const metronomeAudio2 = document.getElementById("click2")
let currentMetronomeAudio = metronomeAudio1

function playAudio() {
    currentMetronomeAudio.currentTime = 0
    currentMetronomeAudio.play()
    console.log("playing audio")
}

function updateMetronomeAudio() {
    if (currentBat == 1) {
        currentMetronomeAudio = metronomeAudio1
        return
    }
    currentMetronomeAudio = metronomeAudio2
}

const labelButton = document.getElementById("labelButton")

const togglePlayButtonPressed = () => labelButton.classList.toggle("pressed");