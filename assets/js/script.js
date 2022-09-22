// Playback variables
const playbackInput = document.getElementById("input-playback");
let iconPlay = document.getElementById("icon-play");
let iconStop = document.getElementById("icon-stop");
let isPlaying = false;

// Tempo variable
let tempoInput = document.getElementById("input-tempo");
let beatsPerMinute = (60 / tempoInput.value) * 1000; // Converts tempo to milliseconds

// Kit variables
let kitSelect = document.getElementById("kits");
let currentKit = kitSelect.value;

window.addEventListener('DOMContentLoaded', function(){
  // Toggle Playback icon visibility
  iconPlay.style.display = "block";
  iconStop.style.display = "none";
});

playbackInput.addEventListener("click", TogglePlayback);
function TogglePlayback(){
  if(isPlaying){  
    iconPlay.style.display = "block";
    iconStop.style.display = "none";
    isPlaying = false;
  }
  else{
    iconPlay.style.display = "none";
    iconStop.style.display = "block";
    isPlaying = true;
  }
  console.log("Playing: " + isPlaying);
}

// Updates currentKit when new option selected on combobox
kitSelect.addEventListener('input', function(){  
  if(kitSelect.value == "rock"){
    // Set Kit to ROCK
  }
  if(kitSelect.value == "house"){
    // Set Kit to HOUSE
  }
  if(kitSelect.value == "jazz"){
    // Set Kit to JAZZ
  }
  if(kitSelect.value == "dubstep"){
    // Set Kit to DUBSTEP
  }   
  console.log("Current Kit:" + kitSelect.value);
});


