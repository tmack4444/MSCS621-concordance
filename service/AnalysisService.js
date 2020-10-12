'use strict';

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2"
});
var docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Calculate
 * Post text to generate concordance
 *
 * body String Text to be analyzed (optional)
 * returns result
 **/
 exports.getConcordance = function(body) {
   return new Promise( async function(resolve, reject) {
   var table = "MSCS621-concordance-analyze";
   var exists = await getData(table, body);
   if(exists == ""){
     var bodyWords = body.toLowerCase().split(" ");
     var wordCount = new Map();
     for(var i = 0; i < bodyWords.length; i++){
       if(wordCount.has(bodyWords[i]) === false){
         wordCount.set(bodyWords[i], 1);
        } else {
          wordCount.set(bodyWords[i], wordCount.get(bodyWords[i]) + 1);
        }
      }
      var concordance = [];
      for(let [word, count] of wordCount){
        var concordObj = {};
        concordObj.token = word;
        concordObj.count = count;
        concordance.push(concordObj);
      }
      //concordance = JSON.parse(concordance);
      console.log("Concordance: " + concordance.toString());
      var examples = {};
        examples['application/json'] = {
          "Input" : body,
          "concordance" : concordance
        };
     putData(table, body, concordance);
   } else {
     console.log("Exists: " + exists.toString());
     var examples = exists;
   }
     if (Object.keys(examples).length > 0){
       resolve(examples);
     } else {
       resolve();
     }
   });
 }

/**
 * Calculate
 * Post text to generate concordance
 *
 * body String Text to be analyzed (optional)
 * returns result
 **/
exports.getLocations =  function(body) {
  var table = "MSCS621-concordance-locate";
  return new Promise( async function(resolve, reject) {
    var exists = await getData(table, body);
    if(exists == ""){
      var bodyWords = body.toLowerCase().split(" ");
      var locationsToWords = new Map();
      for(var i = 0; i < bodyWords.length; i++){
        var tempArray = [];
        if(locationsToWords.has(bodyWords[i]) === false){
          locationsToWords.set(bodyWords[i], tempArray);
        }
        locationsToWords.get(bodyWords[i]).push(i);
      }
        var locationSet = [];
      for(let [word, locations] of locationsToWords){
        var locateObj = {};
        locateObj.token = word;
        locateObj.locations = locations;
        locationSet.push(locateObj);
      }
      //locationSet = JSON.parse(locationSet);
      console.log("LocationSet: " + locationSet.toString());
      var examples = {};
      examples['application/json'] = {
        "input" : body,
        "concordance" : locationSet
     };
     putData(table, body, locationSet);
   } else{
     console.log("Exists: " + exists.toString());
     var examples = exists;
   }

    if (Object.keys(examples).length > 0) {
      resolve(examples);
    } else {
      resolve();
    }
  });
}


/*
This took a lot longer than it probably should have so to explain for my own sanity
getData is an asynchronous function, since docClient can take some time to get a value
Previously I was setting found = docClient.get(params, function(data, err)({});
Just like in putdata, except it wasn't returning the value it got from the DB,
It was returning an AWS.request, the actual API call that it was making
So in order to ensure it returns the correct value, I wrap it in a .promise(),
saying it will eventually finish, and .then() to say then when it is finished,
Return the data from the call. If there is an error catch it and log it

put doesnt need to be async since we're putting data, dont care when it finishes
*/
async function getData(table, key){
  var found= "";
  var params = {
      TableName: table,
      Key:{
          'input': key
      }
  };
  found = await docClient.get(params).promise().then((data) => {
    //console.log(data.Item);
    return data.Item;
  }).catch((err) => {
    console.log(err, err.stack);
    return "";
  });
  if(found == null){
    found = "";
  }
  return found;
}


function putData(table, key, dataToPut){
  var params = {
    TableName: table,
    Item: {
      'input': key,
      'Concordance': dataToPut
    }
  };
    docClient.put(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
}
