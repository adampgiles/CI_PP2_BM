// Tab variables
drumWindow = document.getElementById("drum-window");
shareWindow = document.getElementById("share-window");
infoWindow = document.getElementById("info-window");
submissionInputBlock = document.getElementById("submission-input-block");
submissionWindow = document.getElementById("submission-window");

inputDrumTab = document.getElementById("drum-tab");
inputShareTab = document.getElementById("share-tab");
inputInfoTab = document.getElementById("info-tab");
inputSubmissionOpen = document.getElementById("input-submission-open");
inputSubmissionClose = document.getElementById("input-submission-close");

inputDrumTab.addEventListener("click", ShowDrumWindow);
function ShowDrumWindow(){
  drumWindow.style.display = "flex";
  shareWindow.style.display = "none";
  infoWindow.style.display = "none";
  submissionInputBlock.style.display = "none"

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
  submissionInputBlock.style.display = "flex"

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
  submissionInputBlock.style.display = "none"
  
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
  submissionInputBlock.style.display = "none"
}
function HideSubmissionWindow(){
  submissionWindow.style.display = "none";
  submissionInputBlock.style.display = "flex"
}