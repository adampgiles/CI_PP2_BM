// Tab variables
const drumWindow = document.getElementById("drum-window");
const shareWindow = document.getElementById("share-window");
const infoWindow = document.getElementById("info-window");
const submissionInputBlock = document.getElementById("submission-input-block");
const submissionWindow = document.getElementById("submission-window");

const inputDrumTab = document.getElementById("drum-tab");
const inputShareTab = document.getElementById("share-tab");
const inputInfoTab = document.getElementById("info-tab");
const inputSubmissionOpen = document.getElementById("input-submission-open");
const inputSubmissionClose = document.getElementById("input-submission-close");

inputDrumTab.addEventListener("click", ShowDrumWindow);
function ShowDrumWindow(){
  drumWindow.style.display = "flex";
  shareWindow.style.display = "none";
  infoWindow.style.display = "none";
  submissionInputBlock.style.display = "none";

  inputDrumTab.style.zIndex = "2";
  inputShareTab.style.zIndex = "0";
  inputInfoTab.style.zIndex = "0";

  inputDrumTab.style.backgroundColor = "var(--tabActive)";
  inputShareTab.style.backgroundColor = "var(--tabInactive)";
  inputInfoTab.style.backgroundColor = "var(--tabInactive)";
}

inputShareTab.addEventListener("click", ShowShareWindow);
function ShowShareWindow(){
  drumWindow.style.display = "none";
  shareWindow.style.display = "flex";
  infoWindow.style.display = "none";
  submissionInputBlock.style.display = "flex";

  inputDrumTab.style.zIndex = "0";
  inputShareTab.style.zIndex = "2";
  inputInfoTab.style.zIndex = "0";

  inputDrumTab.style.backgroundColor = "var(--tabInactive)";
  inputShareTab.style.backgroundColor = "var(--tabActive)";
  inputInfoTab.style.backgroundColor = "var(--tabInactive)";
}

inputInfoTab.addEventListener("click", ShowInfoWindow);
function ShowInfoWindow(){
  drumWindow.style.display = "none";
  shareWindow.style.display = "none";
  infoWindow.style.display = "flex";
  submissionInputBlock.style.display = "none";
  
  inputDrumTab.style.zIndex = "0";
  inputShareTab.style.zIndex = "0";
  inputInfoTab.style.zIndex = "2";

  inputDrumTab.style.backgroundColor = "var(--tabInactive)";
  inputShareTab.style.backgroundColor = "var(--tabInactive)";
  inputInfoTab.style.backgroundColor = "var(--tabActive)";
}

inputSubmissionOpen.addEventListener("click", ShowSubmissionWindow);
inputSubmissionClose.addEventListener("click", HideSubmissionWindow);
function ShowSubmissionWindow(){
  submissionWindow.style.display = "flex";
  submissionInputBlock.style.display = "none";
}
function HideSubmissionWindow(){
  submissionWindow.style.display = "none";
  submissionInputBlock.style.display = "flex";
}