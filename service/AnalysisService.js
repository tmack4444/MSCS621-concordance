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
   console.log(concordance);
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
    var locations = new Map();
    for(var i = 0; i < bodyWords.length; i++){
      locations[bodyWords.get[i]].push(i);
    }
    var examples = {};
    var wordLocations = new Map();
    examples['application/json'] = {
  "input" : "The brown fox jumped over the brown log.",
  "concordance" : [ {
    "token" : "brown",
    "locations" : [ 1, 6 ],
    "count" : 2
  }, {
    "token" : "fox",
    "locations" : [ 2 ],
    "count" : 1
  }, {
    "token" : "jumped",
    "locations" : [ 3 ],
    "count" : 1
  }, {
    "token" : "log",
    "locations" : [ 7 ],
    "count" : 1
  }, {
    "token" : "over",
    "locations" : [ 4 ],
    "count" : 1
  }, {
    "token" : "the",
    "locations" : [ 0, 5 ],
    "count" : 1
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
