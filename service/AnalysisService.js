'use strict';


/**
 * Calculate
 * Post text to generate concordance
 *
 * body String Text to be analyzed (optional)
 * returns result
 **/
 exports.getConcordance = function(body) {
   return new Promise(function(resolve, reject) {
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
     "input" : body,
     "concordance" : concordance
   };
     if (Object.keys(examples).length > 0) {
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
  return new Promise(function(resolve, reject) {
    var bodyWords = body.toLowerCase().split(" ");
    var locations = {};
    for(var i = 0; i < bodyWords.length; i++){
      if(locations.has(bodyWords[i]) === false){
        locations[bodyWords[i]] = new Array();
      }
      locations[bodyWords[i]].push(i);
    }

    var locationSet = [];
    for(var j = 0; j < locations.length; j++){
      var locationObj = {};
      locationObj.token = locations[j];
      for(var k = 0; k < locations[j].length; k++){
        locationObj.locations.push(locations[j][k]);
      }
      locationSet.push(locationObj);
    }
    console.log(locationSet);
    locationSet = JSON.stringify(locationSet);
    var examples = {};
    examples['application/json'] = {
      "input" : body,
      "locations" : locationSet
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
