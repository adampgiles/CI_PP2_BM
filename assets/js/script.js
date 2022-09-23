// Web Audio Api variables
const audioContext = new AudioContext();
let bufferTracks = [null, null, null, null, null, null];

// Playback variables
const inputPlayback = document.getElementById("input-playback");
let iconPlay = document.getElementById("icon-play");
let iconStop = document.getElementById("icon-stop");
let isPlaying = false;
let stepPosition = 0;
let fullBarCount = 16;

inputPlayback.addEventListener("click", TogglePlayback);
function TogglePlayback(){
  if(isPlaying){  
    iconPlay.style.display = "block";
    iconStop.style.display = "none";
    isPlaying = false;
    StopLoop();
  }
  else{
    iconPlay.style.display = "none";
    iconStop.style.display = "block";
    isPlaying = true;
    PlayLoop();
  }
  console.log("Playing: " + isPlaying); // Test if playback changed
}

// Tempo variable
let tempoInput = document.getElementById("input-tempo");
let beatsPerMinute = (60 / tempoInput.value) * 250; // Converts tempo to milliseconds
let inputTempoRefresh = document.getElementById("input-tempo-refresh");
let tempoMinMax = {"min": 60 , "max": 200}; 
// Update Tempo on refresh input click
inputTempoRefresh.addEventListener("click", function(){
  // Lock tempo to min and max values
  if(tempoInput.value < tempoMinMax.min){
    tempoInput.value = tempoMinMax.min;
  }
  else if(tempoInput.value > tempoMinMax.max){
    tempoInput.value = tempoMinMax.max;
  }  

  // Update Tempo - (Process: Stop loop, update beatsPerMinute, resume loop)
  if(isPlaying){
    clearInterval(stepInterval);
    beatsPerMinute = (60 / tempoInput.value) * 250;
    PlayLoop()    
  }
  else{
    beatsPerMinute = (60 / tempoInput.value) * 250;
  }

  console.log("Current Tempo: " + tempoInput.value); // Test if new value updated
});

// Kit variables
let kitSelect = document.getElementById("kits");
let currentKit = kitSelect.value;
let currentSounds = ["assets/audio/kick.wav", "assets/audio/snare.wav", "assets/audio/clap.wav", "assets/audio/hihat.wav", "assets/audio/shaker.wav", "assets/audio/cowbell.wav"]; // CODE TO ADD - "sound filenames"

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

// Track Icon Elements
let iconsTrack = document.getElementsByClassName("track-icon");
// Ready the sounds using Web Audio Api (Credit: https://dobrian.github.io/cmp/topics/sample-recording-and-playback-with-web-audio-api/1.loading-and-playing-sound-files.html)
for(i = 0; i < iconsTrack.length; i++){
  let number = i;
  const request = new XMLHttpRequest();
  request.open("GET", currentSounds[number]);
  request.responseType = "arraybuffer";
  request.onload = function() {
    let undecodedAudio = request.response;
    audioContext.decodeAudioData(undecodedAudio, (data) => bufferTracks[number] = data);
  };
  request.send();
}
// Play the sounds using Web Audio Api
for(i = 0; i < iconsTrack.length; i++){
  let number = i;
  iconsTrack[number].addEventListener("click", function(){
    PlayStep(number);
  });
}

// Step variables
let trackStepValues = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const steps = [
  document.getElementById("step-container-one").children, 
  document.getElementById("step-container-two").children,
  document.getElementById("step-container-three").children,
  document.getElementById("step-container-four").children,
  document.getElementById("step-container-five").children,
  document.getElementById("step-container-six").children
];

for(i = 0; i < steps.length; i++){
  let num = i;    
  for(j = 0; j < steps[num].length; j++){
    let number = j;      
    steps[num][number].addEventListener("click", function(){
      if(trackStepValues[num][number] === 0){
        trackStepValues[num][number] = 1;
        steps[num][number].style.backgroundColor = "rgba(0, 0, 0, 0.40)";
        console.log("step value: " + trackStepValues[num][number]);
      }
      else{
        trackStepValues[num][number] = 0;
        steps[num][number].style.backgroundColor = "rgb(222, 222, 222)";
        console.log("step value: " + trackStepValues[num][number]);
      }
    });  
  }
}

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

// Play Loop
function PlayLoop(){
  stepInterval = setInterval(function(){
    if(isPlaying == true){          
      // Check if Step is enable for each track, trigger sound if enabled
      for(i = 0; i < trackStepValues.length; i++){
        if(trackStepValues[i][stepPosition] == 1){
          PlayStep(i);
        }
        ToggleStepBorder(i);
      }    

      // Increment stepPosition and reset if reaches 16
      stepPosition++;
      if(stepPosition > 15){
        stepPosition = 0;
      }            
    }
  }, beatsPerMinute);
}
function PlayStep(number){
  const source = audioContext.createBufferSource();
  source.buffer = bufferTracks[number];
  source.connect(audioContext.destination);
  source.start();
  console.log("Sound: " + currentSounds[number]);
}
function StopLoop(){
  clearInterval(stepInterval);
  stepPosition = 0;
}

// Change step border colours to visually indicate the tempo and that the loop is playing
function ToggleStepBorder(trackNumber){
  steps[trackNumber][stepPosition].style.borderColor = "rgb(225, 225, 225)";

  let currentStep = stepPosition;
  setTimeout(function(){
    if(currentStep == 0 || currentStep == 4 || currentStep == 8 || currentStep == 12){
      steps[trackNumber][currentStep].style.borderColor = "rgb(0, 0, 0)";
    }
    else{
      steps[trackNumber][currentStep].style.borderColor = "rgb(75, 75, 75)";
    }
  }, beatsPerMinute)  
   
}