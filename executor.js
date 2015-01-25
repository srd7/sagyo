(function(){
  console.log("executor called");
  var body, message;
  body = document.getElementsByTagName("body")[0];
  body.setAttribute("style", "background: none;");
  while(body.firstChild) {
    body.removeChild(body.firstChild);
  }

  message = document.createElement("p");
  message.innerHTML = "作業しろ";
  message.setAttribute("style", "font-weight: bold; font-size: 30px; text-align: center; padding-top: 20px; position: relative; top: 50%; transform: translateY(-50%);");
  body.appendChild(message);

})();
