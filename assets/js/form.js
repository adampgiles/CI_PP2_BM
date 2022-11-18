// Code used and modified from YouTube tutorial (https://www.youtube.com/watch?v=dgcYOm8n8ME)
function SendLoop(){
  ExportLoop();

  inputname = document.getElementById("name").value,
  inputEmailAddress = document.getElementById("email-address").value,
  inputLoopTitle = document.getElementById("loop-title").value,
  inputLoopData = document.getElementById("input-share-data").value
  formAlert = document.getElementById("form-alert");

  if(inputname == "" || inputEmailAddress == "" || inputLoopTitle == ""){
    formAlert.style.display = "block";
    formAlert.textContent = "Please enter details in all three text boxes";
    return;
  }
  else{
    formAlert.style.display = "block";
    formAlert.textContent = "Please wait, sending details...";
      
    var parameters = {
      name: inputname,
      emailAddress: inputEmailAddress,
      loopTitle: inputLoopTitle,
      loopData: inputLoopData
    };
  
    serviceID = "service_n6ymtsk";
    templateID = "template_ftm6gxd";    
    
    emailjs.send(serviceID, templateID, parameters)
    .then(
      res =>{
        inputname = "";
        inputEmailAddress = "";
        inputLoopTitle = "";
        console.log(res);
    
        formAlert.textContent = "Loop Data successfully sent for review!";
        setTimeout(function () {
          formAlert.style.display = "none";
        }, 4000)
      }
    )
    .catch((err) => console.log(err));
  }
}

