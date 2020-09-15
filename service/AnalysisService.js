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



body = "The brown fox jumped over the brown log.";
var bodyWords = [];
wordCount = new Map();
bodyWords = body.split(" ")
for(var i = 0; i < bodyWords.length; i++){
  if(wordCount.has(bodyWords[i]) === false){
    wordCount.set(bodyWords[i], 1);
  } else {
    wordCount.set(bodyWords[i], wordCount.get(bodyWords[i]) + 1);
  }
}
var wordToCounts = Array.from(wordCount, ([token, count]) => ({ token, count }));
var words = new Array();
var counts = new Array();
for(var i = 0; i < wordToCounts.length; i++){
  words[i] = wordToCounts[i].token;
  counts[i] = wordToCounts[i].count;
}
var examples = {};
examples['application/json'] = {
  "concordance" : [ {
    "token" : words,
    "count" : counts
  } ]
};
}
    /*
    var examples = {};
    examples['application/json'] = {
  "input" : "The brown fox jumped over the brown log.",
  "concordance" : [ {
    "token" : "brown",
    "count" : 2
  }, {
    "token" : "fox",
    "count" : 1
  }, {
    "token" : "jumped",
    "count" : 1
  }, {
    "token" : "log",
    "count" : 1
  }, {
    "token" : "over",
    "count" : 1
  }, {
    "token" : "the",
    "count" : 1
  } ]
};
*/
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
