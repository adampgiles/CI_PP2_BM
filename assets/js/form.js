function SendLoop(){
  ExportLoop();
  var parameters = {
    name: document.getElementById("name").value,
    emailAddress: document.getElementById("email-address").value,
    loopTitle: document.getElementById("loop-title").value,
    loopData: document.getElementById("input-share-data").value
  };

  serviceID = "service_n6ymtsk";
  templateID = "template_ftm6gxd";
  formAlert = document.getElementById("form-alert");
  
  emailjs.send(serviceID, templateID, parameters)
  .then(
    res =>{
      document.getElementById("name").value = "";
      document.getElementById("email-address").value = "";
      document.getElementById("loop-title").value = "";
      console.log(res);
  
      formAlert.textContent = "Loop Data successfully sent for review";
    }
  )
  .catch((err) => console.log(err));
}

