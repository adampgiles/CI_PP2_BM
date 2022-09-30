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
    UpdateTempo(tempoInput.value);
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
kitSelect.addEventListener('input', UpdateKit);
function UpdateKit(){
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
}

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
      if(trackStepValues[num][number] == 0){
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

//Preset Loops
const presetOne = "<t>128<k>kitOne<a>1000100010001000<b>0000100000001000<c>0000000000000000<d>1010101010101010<e>0000000000000000<f>0000000000000000<g>";
const presetTwo = "<t>110<k>kitTwo<a>1000001000100100<b>0000100000001001<c>0000000000000000<d>1011101010110111<e>0000000000000000<f>0000000000000000<g>";
const presetThree = "<t>120<k>kitFour<a>1001001000100100<b>0000100000001000<c>0000100000001000<d>1010010101100011<e>0000000000000000<f>0010000000100101<g>";
const presetFour = "<t>160<k>kitFour<a>1000000000000000<b>0000000010000010<c>0000100000001010<d>1011101010111010<e>1000000000001010<f>0000000000000000<g>";
const presetFive = "<t>100<k>kitTwo<a>1101001000100100<b>0000100000001000<c>0000000000000000<d>1010101010101010<e>0000000000000000<f>0000000000000000<g>";
const presetSix = "<t>160<k>kitThree<a>1000100010001000<b>0000000000000000<c>0000100000001000<d>1010101010101010<e>0000100000001000<f>0010001000100010<g>";
const presetSeven = "<t>140<k>kitFour<a>1000100010001000<b>0000100000001000<c>0010000100100010<d>1010101101101111<e>0000000000000000<f>0000000000000000<g>";
const presetEight = "<t>120<k>kitThree<a>1000000000100010<b>0000000000000000<c>0000100000001000<d>1011010101010111<e>0000000000000000<f>0010000010100010<g>";
const presetNine = "<t>110<k>kitFour<a>1000000010000000<b>0010001000100010<c>0000100010001000<d>1000100010010011<e>0000100000001000<f>0000000000000000<g>";
const presetTen = "<t>120<k>kitThree<a>0100010001000100<b>0011100100101001<c>0000000000000000<d>1101000010010100<e>1010010000001100<f>0010101011001001<g>";

let presetSelect = document.getElementById("presets");
const inputPresetRefresh = document.getElementById("input-preset-refresh");
inputPresetRefresh.addEventListener('click', LoadPreset);

function LoadPreset(){
  if(presetSelect.value == "presetOne"){
    shareTextbox.value = presetOne;
  }
  else if(presetSelect.value == "presetTwo"){
    shareTextbox.value = presetTwo;
  }
  else if(presetSelect.value == "presetThree"){
    shareTextbox.value = presetThree;
  }
  else if(presetSelect.value == "presetFour"){
    shareTextbox.value = presetFour;
  }
  else if(presetSelect.value == "presetFive"){
    shareTextbox.value = presetFive;
  }
  else if(presetSelect.value == "presetSix"){
    shareTextbox.value = presetSix;
  }
  else if(presetSelect.value == "presetSeven"){
    shareTextbox.value = presetSeven;
  }
  else if(presetSelect.value == "presetEight"){
    shareTextbox.value = presetEight;
  }
  else if(presetSelect.value == "presetNine"){
    shareTextbox.value = presetNine;
  }
  else if(presetSelect.value == "presetTen"){
    shareTextbox.value = presetTen;
  }

  ImportLoop();  
}

// Export & Import variables
let shareTextbox = document.getElementById("input-share-data");

const inputExport = document.getElementById("input-export");
inputExport.addEventListener('click', ExportLoop);

const inputImport = document.getElementById("input-import");
inputImport.addEventListener('click', ImportLoop);

// Loop Export
function ExportLoop(){
  //Convert each track's step values to a 16 digit string
  let track1Steps = "";
  for(i = 0; i < 16; i++){
    track1Steps += trackStepValues[0][i];
  }
  let track2Steps = "";
  for(i = 0; i < 16; i++){
    track2Steps += trackStepValues[1][i];
  }
  let track3Steps = "";
  for(i = 0; i < 16; i++){
    track3Steps += trackStepValues[2][i];
  }
  let track4Steps = "";
  for(i = 0; i < 16; i++){
    track4Steps += trackStepValues[3][i];
  }
  let track5Steps = "";
  for(i = 0; i < 16; i++){
    track5Steps += trackStepValues[4][i];
  }
  let track6Steps = "";
  for(i = 0; i < 16; i++){
    track6Steps += trackStepValues[5][i];
  }

  // Create full export string, combining tempo, kit and track step values, with tags between to target when importing
  let exportString = "<t>" + tempoInput.value + "<k>" + kitSelect.value + "<a>" + track1Steps + "<b>" + track2Steps + "<c>" + track3Steps + "<d>" + track4Steps + "<e>"  + track5Steps + "<f>"  + track6Steps + "<g>";
  // Test if string is produced
  console.log(exportString);

  shareTextbox.value = exportString;
}

// Loop Import
function ImportLoop(){
  let loopString = shareTextbox.value;

  let tempoStartPoint = loopString.indexOf("<t>") +3;
  let kitStartPoint = loopString.indexOf("<k>") +3;
  let track1StartPoint = loopString.indexOf("<a>") +3;
  let track2StartPoint = loopString.indexOf("<b>") +3;
  let track3StartPoint = loopString.indexOf("<c>") +3;
  let track4StartPoint = loopString.indexOf("<d>") +3;
  let track5StartPoint = loopString.indexOf("<e>") +3;
  let track6StartPoint = loopString.indexOf("<f>") +3;
  let stringEndPoint = loopString.indexOf("<g>");
  
  let tempoString = loopString.substring(tempoStartPoint, kitStartPoint -3);
  let kitString = loopString.substring(kitStartPoint, track1StartPoint -3);
  let track1String = loopString.substring(track1StartPoint, track2StartPoint -3);
  let track2String = loopString.substring(track2StartPoint, track3StartPoint -3);
  let track3String = loopString.substring(track3StartPoint, track4StartPoint -3);
  let track4String = loopString.substring(track4StartPoint, track5StartPoint -3);
  let track5String = loopString.substring(track5StartPoint, track6StartPoint -3);
  let track6String = loopString.substring(track6StartPoint, stringEndPoint);

  console.log(tempoString, kitString, track1String, track2String, track3String, track4String, track5String, track6String);

  // Import Tempo
  tempoInput.value = tempoString;
  UpdateTempo();

  // Import Kit
  kitSelect.value = kitString;
  UpdateKit();

  //Set Track One Step Values
  for(i = 0; i < 16; i++){
    trackStepValues[0][i] = track1String.charAt(i);
  }
  //Set Track Two Step Values
  for(i = 0; i < 16; i++){
    trackStepValues[1][i] = track2String.charAt(i);
  }
  //Set Track Three Step Values
  for(i = 0; i < 16; i++){
    trackStepValues[2][i] = track3String.charAt(i);
  }
  //Set Track Four Step Values
  for(i = 0; i < 16; i++){
    trackStepValues[3][i] = track4String.charAt(i);
  }
  //Set Track Five Step Values
  for(i = 0; i < 16; i++){
    trackStepValues[4][i] = track5String.charAt(i);
  }
  //Set Track Six Step Values
  for(i = 0; i < 16; i++){
    trackStepValues[5][i] = track6String.charAt(i);
  }

  UpdateStepDisplay();
}

function UpdateStepDisplay(){
  //Update Track One
  for(i = 0; i < 16; i++){
    let num = i;
    if(trackStepValues[0][num] == 1){
      steps[0][num].style.backgroundColor = "rgb(0, 0, 0, 0.40)";
    }
    else{
      steps[0][num].style.backgroundColor = "rgb(222, 222, 222)";
    }
  }
  //Update Track Two
  for(i = 0; i < 16; i++){
    let num = i;
    if(trackStepValues[1][num] == 1){
      steps[1][num].style.backgroundColor = "rgb(0, 0, 0, 0.40)";
    }
    else{
      steps[1][num].style.backgroundColor = "rgb(222, 222, 222)";
    }
  }
  //Update Track Three
  for(i = 0; i < 16; i++){
    let num = i;
    if(trackStepValues[2][num] == 1){
      steps[2][num].style.backgroundColor = "rgb(0, 0, 0, 0.40)";
    }
    else{
      steps[2][num].style.backgroundColor = "rgb(222, 222, 222)";
    }
  }
  //Update Track Four
  for(i = 0; i < 16; i++){
    let num = i;
    if(trackStepValues[3][num] == 1){
      steps[3][num].style.backgroundColor = "rgb(0, 0, 0, 0.40)";
    }
    else{
      steps[3][num].style.backgroundColor = "rgb(222, 222, 222)";
    }
  }
  //Update Track Five
  for(i = 0; i < 16; i++){
    let num = i;
    if(trackStepValues[4][num] == 1){
      steps[4][num].style.backgroundColor = "rgb(0, 0, 0, 0.40)";
    }
    else{
      steps[4][num].style.backgroundColor = "rgb(222, 222, 222)";
    }
  }
  //Update Track Six
  for(i = 0; i < 16; i++){
    let num = i;
    if(trackStepValues[5][num] == 1){
      steps[5][num].style.backgroundColor = "rgb(0, 0, 0, 0.40)";
    }
    else{
      steps[5][num].style.backgroundColor = "rgb(222, 222, 222)";
    }
  }

  ShowDrumWindow();
  
}

