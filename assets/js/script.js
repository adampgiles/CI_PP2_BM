// Playback variables
const inputPlayback = document.getElementById("input-playback");
let iconPlay = document.getElementById("icon-play");
let iconStop = document.getElementById("icon-stop");
let isPlaying = false;

// Tempo variable
let tempoInput = document.getElementById("input-tempo");
let beatsPerMinute = (60 / tempoInput.value) * 1000; // Converts tempo to milliseconds
let inputTempoRefresh = document.getElementById("input-tempo-refresh");
let tempoMinMax = {"min": 60 , "max": 200}; 
inputTempoRefresh.addEventListener("click", function(){
  // Lock tempo to min and max values
  if(tempoInput.value < tempoMinMax.min){
    tempoInput.value = tempoMinMax.min;
  }
  else if(tempoInput.value > tempoMinMax.max){
    tempoInput.value = tempoMinMax.max;
  } 
  beatsPerMinute = (60 / tempoInput.value) * 1000;

  console.log("Current Tempo: " + tempoInput.value); // Test if new value updated
});


// Kit variables
let kitSelect = document.getElementById("kits");
let currentKit = kitSelect.value;

window.addEventListener('DOMContentLoaded', function(){
  // Toggle Playback icon visibility
  iconPlay.style.display = "block";
  iconStop.style.display = "none";
});

inputPlayback.addEventListener("click", TogglePlayback);
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
  console.log("Playing: " + isPlaying); // Test if playback changed
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
  console.log("Current Kit: " + kitSelect.value); // Test if kit updated
});


