//Parse string from add places form
var inputs = reqBody.replace(/\+/g, ' ');
inputs = decodeURIComponent(inputs);
console.log(inputs);

var regex = /\w*=/;
inputs  = inputs.split(regex);
inputs.shift();
for (i = 0; i < inputs.length; i++){
  inputs[i] = inputs[i].replace(/&/g,'');
}
// Add form inputs to JSON string
parseJson = JSON.parse(content);
parseJson.placeList.push({"placename": inputs[0],
"addressline1": inputs[1],
"addressline2": inputs[2],
"opentime": inputs[3],
"closetime": inputs[4],
"additionalinfo": inputs[5],
"additionalinfourl": inputs[6]});
