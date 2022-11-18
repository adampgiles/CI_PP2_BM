// Code used and modified from YouTube tutorial (https://www.youtube.com/watch?v=dgcYOm8n8ME)
function SendLoop(){
  inputname = document.getElementById("name").value,
  inputEmailAddress = document.getElementById("email-address").value,
  inputLoopTitle = document.getElementById("loop-title").value,
  inputLoopData = document.getElementById("input-share-data").value
  formAlert = document.getElementById("form-alert");

  if(inputname == "" || inputEmailAddress == "" || inputLoopTitle == ""){
    formAlert.textContent = "Please enter details in all three text boxes";
    return;
  }
  else{ 
    formAlert.textContent = "Please wait, sending details...";

    ExportLoop();
    var parameters = {
      name: inputname.value,
      emailAddress: inputEmailAddress.value,
      loopTitle: inputLoopTitle.value,
      loopData: inputLoopData.value
    };
  
    serviceID = "service_n6ymtsk";
    templateID = "template_ftm6gxd";    
    
    emailjs.send(serviceID, templateID, parameters)
    .then(
      res =>{
        document.getElementById("name").value = "";
        document.getElementById("email-address").value = "";
        document.getElementById("loop-title").value = "";
        console.log(res);
    
        formAlert.textContent = "Loop Data successfully sent for review! Thank you!";
      }
    )
    .catch((err) => console.log(err));
  }
}

