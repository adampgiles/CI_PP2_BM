const playbackInput = document.getElementById("input-playback");
let iconPlay = document.getElementById("icon-play");
let iconStop = document.getElementById("icon-stop");
let isPlaying = false;

let tempoInput = document.getElementById("input-tempo");
let kitSelect = document.getElementById("kit-selection")

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


