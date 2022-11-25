// import ShowDrumWindow() function from navigation script in readiness for UpdateStepDisplay()'s use of the function
import {ExportLoop} from './drums.js';

// Code used and modified from YouTube tutorial (https://www.youtube.com/watch?v=dgcYOm8n8ME)
function SendLoop(){
  //Export loop data to ready for submission
  ExportLoop();

  // Set email validation Regular Expression (code from https://www.abstractapi.com/guides/email-validation-regex-javascript)
  const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  
  // Set input and alert elements
  const inputname = document.getElementById("name");
  const inputEmailAddress = document.getElementById("email-address");
  const inputLoopTitle = document.getElementById("loop-title");
  const inputLoopData = document.getElementById("input-share-data");
  const formAlert = document.getElementById("form-alert");

  // Check if input field are EMPTY
  if(inputname.value == "" || inputEmailAddress.value == "" || inputLoopTitle.value == ""){
    formAlert.style.display = "block";
    formAlert.textContent = "Please enter details in all three text boxes";
    return;
  }

  // Check if email format is valid (code used and modified from https://www.abstractapi.com/guides/email-validation-regex-javascript)
  if(emailRegex.test(inputEmailAddress.value) == true){     
    // Submit Loop if all inputs are valid

      formAlert.style.display = "block";
      formAlert.textContent = "Please wait, sending details...";
        
      var parameters = {
        name: inputname.value,
        emailAddress: inputEmailAddress.value,
        loopTitle: inputLoopTitle.value,
        loopData: inputLoopData.value
      };
    
      const serviceID = "service_n6ymtsk";
      const templateID = "template_ftm6gxd";    
      
      emailjs.send(serviceID, templateID, parameters)
      .then(
        res =>{
          inputname.value = "";
          inputEmailAddress.value = "";
          inputLoopTitle.value = "";
          console.log(res);
      
          formAlert.textContent = "Loop Data successfully sent for review!";
          setTimeout(function () {
            formAlert.style.display = "none";
          }, 4000);
        }
      )
      .catch((err) => console.log(err));
    } 
    else{
      formAlert.style.display = "block";
      formAlert.textContent = "Please enter a valid Email Address";
    }
}

