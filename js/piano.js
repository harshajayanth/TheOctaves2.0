const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    audio = new Audio(`tunes/a.wav`); // by default, audio src is "a" tune

let num = 0;
let max = 7;
let min = 0;

document.getElementById("increment").addEventListener("click", function(){
    if(num < max) {
        num++;
        var oct= document.getElementById("number").innerHTML = "C"+ num;
        return oct;
    }
});

document.getElementById("decrement").addEventListener("click",
    function(){
    if(num > min) {
        num--;
        var oct=document.getElementById("number").innerHTML = "C"+num;
        return oct;
    }
});

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; // passing audio src based on key pressed
    audio.play(); // playing audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
    clickedKey.classList.add("active"); // adding active class to the clicked key element
    setTimeout(() => { // removing active class after 150 ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
    // calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // passing the range slider value as an audio volume
}

const showHideKeys = () => {
    // toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    // if the pressed key is in the allKeys array, only call the playTune function
  /*  if(allKeys.includes(e.key))*/
        playTune(e.key);
}

function colr()
{
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.toggle("blue");

    setTimeout(function() {
        clickedKey.classList.toggle("");// set back to original color
    }, 100);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
document.addEventListener("keydown", colr);

