//display timer text
const hoursText = document.querySelector(".hours")
const minutesText = document.querySelector(".minutes")
const secondsText = document.querySelector(".seconds")

// transform display text to int
let hours = 0
let minutes = 0
let seconds = 0
let totalSec = -1

//Set timer inputs
const hoursInput = document.querySelector(".hoursInput")
const minutesInput = document.querySelector(".minutesInput")
const secondsInput = document.querySelector(".secondsInput")

//
const startButton = document.querySelector(".start")
const modal = document.querySelector(".modal")
const set = document.querySelector(".set")
const close = document.querySelector(".close")

let start = false;
let pause = false;

//mp3
let alarmMusic = new Audio(chrome.runtime.getURL('cradleofsoul.mp3'))

const startCounting = setInterval(() => {
    if (start && totalSec > 0) {
        totalSec--;
        hoursText.textContent = Math.floor(totalSec / 3600).toString().padStart(2, "0")
        minutesText.textContent = Math.floor((totalSec % 3600) / 60).toString().padStart(2, "0")
        secondsText.textContent = Math.floor(totalSec % 3600 % 60).toString().padStart(2, '0')
    }

    if (totalSec == 0) {
        totalSec = -1
        if (document.querySelector(".urlOption").checked == true) {
            let urlInput = document.querySelector(".urlInput").value
            console.log(urlInput)
            window.open(urlInput, "_blank", "rel=noreferrer")
        }
        else {
            alarmMusic.play()
        }

        document.querySelector(".pause > .material-icons").textContent = "play_circle"
        document.querySelector(".pause").classList.replace("pause", "start")

    }
}, 1000)



startButton.addEventListener("click", () => {
    start = !start

    if (start) {
        document.querySelector(".start > .material-icons").textContent = "pause"
        document.querySelector(".start").classList.replace("start", "pause")

    }
    else {
        document.querySelector(".pause > .material-icons").textContent = "play_circle"
        document.querySelector(".pause").classList.replace("pause", "start")
    }
})

set.addEventListener("click", () => {
    modal.style.display = "block"
})

close.addEventListener("click", () => {
    modal.style.display = "none"
})

const setTimer = () => {
    modal.style.display = "none";
    hoursText.textContent = hoursInput.value.padStart(2, "0")
    minutesText.textContent = minutesInput.value.padStart(2, "0")
    secondsText.textContent = secondsInput.value.padStart(2, "0")

    let h = parseInt(hoursInput.value)
    let m = parseInt(minutesInput.value)
    let s = parseInt(secondsInput.value)
    let temptTotal = (h * 60 * 60) + (m * 60) + s

    if (temptTotal > 0) {
        hours = parseInt(hoursInput.value)
        minutes = parseInt(minutesInput.value)
        seconds = parseInt(secondsInput.value)
        totalSec = (hours * 60 * 60) + (minutes * 60) + seconds;
        start = false
    }


    hoursInput.value = "00";
    minutesInput.value = "00";
    secondsInput.value = "00";
}

// close modal if click other outside of modal
document.addEventListener("click", (Event) => {
    if (Event.target == modal) {
        modal.style.display = "none";
    }
})

//
document.querySelector(".form").addEventListener("submit", (Event) => {
    Event.preventDefault()
    setTimer()
})

document.querySelector(".urlOption").addEventListener("click", () => {
    document.querySelector(".url").style.display = "block"
})

document.querySelector(".default").addEventListener("click", () => {
    document.querySelector(".url").style.display = "none"
})


//
document.querySelector(".stopPlayingButton").addEventListener("click", () => {
    alarmMusic.pause()
})

//
