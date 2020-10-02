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
   return new Promise(function(resolve, reject) {
   var table = "MSCS621-concordance-analyze";
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
   concordance = JSON.stringify(concordance);

 var examples = {};
   examples['application/json'] = {
     "Input" : body,
     "concordance" : concordance
   };
   putData(table, body, concordance);

     if (Object.keys(examples).length > 0){
       resolve(examples[Object.keys(examples)[0]]);
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
exports.getLocations = function(body) {
  var table = "MSCS621-concordance-locate";
  return new Promise(function(resolve, reject) {
    var bodyWords = body.toLowerCase().split(" ");
    var locationsToWords = new Map();
    for(var i = 0; i < bodyWords.length; i++){
      var tempArray = [];
      if(locationsToWords.has(bodyWords[i]) === false){
        locationsToWords.set(bodyWords[i], tempArray);
      }
      locationsToWords.get(bodyWords[i]).push(i);
    }
    console.log(locationsToWords);

    var locationSet = [];
    for(let [word, locations] of locationsToWords){
      var locateObj = {};
      locateObj.token = word;
      locateObj.locations = locations;
      locationSet.push(locateObj);
    }
    locationSet = JSON.stringify(locationSet);

    var examples = {};
    examples['application/json'] = {
      "input" : body,
      "concordance" : locationSet
  };
  putData(table, body, locationSet);

    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
