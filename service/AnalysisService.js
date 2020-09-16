
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
var words = Array.from(wordCount.keys());
var counts = Array.from(wordCount.values());
console.log(words);
console.log(counts);
var examples = {};
  examples['application/json'] = {
"input" : body,
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
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
