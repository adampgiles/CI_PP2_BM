// Web Audio Api variables
const audioContext = new AudioContext();
let bufferTracks = [null, null, null, null, null, null];

// Tab variables
drumWindow = document.getElementById("drum-window");
shareWindow = document.getElementById("share-window");
infoWindow = document.getElementById("info-window");

inputDrumTab = document.getElementById("drum-tab");
inputShareTab = document.getElementById("share-tab");
inputInfoTab = document.getElementById("info-tab");

inputDrumTab.addEventListener("click", ShowDrumWindow);
function ShowDrumWindow(){
  drumWindow.style.display = "flex";
  shareWindow.style.display = "none";
  infoWindow.style.display = "none";

  inputDrumTab.style.zIndex = "2";
  inputShareTab.style.zIndex = "0";
  inputInfoTab.style.zIndex = "0";

  inputDrumTab.style.backgroundColor = "rgb(130, 130, 130)";
  inputShareTab.style.backgroundColor = "rgb(110, 110, 110)";
  inputInfoTab.style.backgroundColor = "rgb(110, 110, 110)";
}

inputShareTab.addEventListener("click", ShowShareWindow);
function ShowShareWindow(){
  drumWindow.style.display = "none";
  shareWindow.style.display = "flex";
  infoWindow.style.display = "none";

  inputDrumTab.style.zIndex = "0";
  inputShareTab.style.zIndex = "2";
  inputInfoTab.style.zIndex = "0";

  inputDrumTab.style.backgroundColor = "rgb(110, 110, 110)";
  inputShareTab.style.backgroundColor = "rgb(130, 130, 130)";
  inputInfoTab.style.backgroundColor = "rgb(110, 110, 110)";
}

inputInfoTab.addEventListener("click", ShowInfoWindow);
function ShowInfoWindow(){
  drumWindow.style.display = "none";
  shareWindow.style.display = "none";
  infoWindow.style.display = "flex";
  
  inputDrumTab.style.zIndex = "0";
  inputShareTab.style.zIndex = "0";
  inputInfoTab.style.zIndex = "2";

  inputDrumTab.style.backgroundColor = "rgb(110, 110, 110)";
  inputShareTab.style.backgroundColor = "rgb(110, 110, 110)";
  inputInfoTab.style.backgroundColor = "rgb(130, 130, 130)";
}

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
inputTempoRefresh.addEventListener("click", UpdateTempo);
// Update Tempo on "enter" key press if editing tempo value
tempoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    UpdateTempo();
  }
});

function UpdateTempo(){
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
}
  

// Kit variables
let kitSelect = document.getElementById("kits");
let kitOne = ["assets/audio/kit1/kick.wav", "assets/audio/kit1/snare.wav", "assets/audio/kit1/clap.wav", "assets/audio/kit1/hihat.wav", "assets/audio/kit1/shaker.wav", "assets/audio/kit1/cowbell.wav"];
let kitTwo = ["assets/audio/kit2/kick.wav", "assets/audio/kit2/snare.wav", "assets/audio/kit2/clap.wav", "assets/audio/kit2/hihat.wav", "assets/audio/kit2/shaker.wav", "assets/audio/kit2/cowbell.wav"];
let kitThree = ["assets/audio/kit3/kick.wav", "assets/audio/kit3/snare.wav", "assets/audio/kit3/clap.wav", "assets/audio/kit3/hihat.wav", "assets/audio/kit3/shaker.wav", "assets/audio/kit3/cowbell.wav"];
let kitFour = ["assets/audio/kit4/kick.wav", "assets/audio/kit4/snare.wav", "assets/audio/kit4/clap.wav", "assets/audio/kit4/hihat.wav", "assets/audio/kit4/shaker.wav", "assets/audio/kit4/cowbell.wav"];
let currentKit = kitOne; // Defaulted to KitOne

// Updates currentKit when new option selected on combobox
kitSelect.addEventListener('input', function(){  
  if(kitSelect.value == "kitOne"){
    currentKit = kitOne;
  }
  if(kitSelect.value == "kitTwo"){
    currentKit = kitTwo;
  }
  if(kitSelect.value == "kitThree"){
    currentKit = kitThree;
  }
  if(kitSelect.value == "kitFour"){
    currentKit = kitFour;
  }   

  for(i = 0; i < currentKit.length; i++){
    LoadSounds(i);
  }

  console.log("Current Kit: " + kitSelect.value); // Test if kit updated
});

// Track Icon Elements
let iconsTrack = document.getElementsByClassName("track-icon");
// Ready the sounds using Web Audio Api (Credit: https://dobrian.github.io/cmp/topics/sample-recording-and-playback-with-web-audio-api/1.loading-and-playing-sound-files.html)
for(i = 0; i < iconsTrack.length; i++){
  let soundNumber = i;  
  LoadSounds(soundNumber);
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
      }
      else{
        trackStepValues[num][number] = 0;
        steps[num][number].style.backgroundColor = "rgb(222, 222, 222)";
      }
    });  
  }
}

// Execute when DOM is loaded
window.addEventListener('DOMContentLoaded', function(){
  // Toggle Playback icon visibility
  iconPlay.style.display = "block";
  iconStop.style.display = "none";
});

// Load sounds to buffers
function LoadSounds(soundNumber){
  const request = new XMLHttpRequest();
  request.open("GET", currentKit[soundNumber]);
  request.responseType = "arraybuffer";
  request.onload = function() {
    let undecodedAudio = request.response;
    audioContext.decodeAudioData(undecodedAudio, (data) => bufferTracks[soundNumber] = data);
  };
  request.send();
}

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