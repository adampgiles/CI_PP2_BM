// Playback variables
const inputPlayback = document.getElementById("input-playback");
let iconPlay = document.getElementById("icon-play");
let iconStop = document.getElementById("icon-stop");
let isPlaying = false;

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

// Info variables
let inputInfo = document.getElementById("input-info");
let iconInfo = document.getElementById("icon-info");
let iconClose = document.getElementById("icon-close");
let infoWindow = document.getElementById("info-window");
let isInfoWindowOpen = false;

inputInfo.addEventListener("click", function(){
  if(isInfoWindowOpen){  
    iconInfo.style.display = "block";
    iconClose.style.display = "none";
    isInfoWindowOpen = false;
    infoWindow.style.display = "none";
  }
  else{
    iconInfo.style.display = "none";
    iconClose.style.display = "block";
    isInfoWindowOpen = true;
    infoWindow.style.display = "block";
  }
  console.log("Info Window Open: " + isInfoWindowOpen); // Test if info window changed
});

// Execute when DOM is loaded
window.addEventListener('DOMContentLoaded', function(){
  // Toggle Playback icon visibility
  iconPlay.style.display = "block";
  iconStop.style.display = "none";

  // Toggle Info/Close Icon visibility
  iconInfo.style.display = "block";
  iconClose.style.display = "none";
  // Toggle Info Window visibility
  infoWindow.style.display = "none";
});






