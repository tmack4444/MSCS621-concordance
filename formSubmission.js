function submitForm(fieldName){
  var sentence = document.getElementById(fieldName).value;
  var postData = JSON.stringify(sentence);
  document.getElementById("output").value = postData;
}
