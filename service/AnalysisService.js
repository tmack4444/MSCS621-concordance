'use strict'
var natural = require('natural');
//const AWS = require('aws-sdk')

//AWS.config.update({
  //region: 'us-east-2'
//})
//const docClient = new AWS.DynamoDB.DocumentClient()

/**
 * Calculate
 * Post text to generate concordance
 *
 * body String Text to be analyzed (optional)
 * returns result
 **/
exports.getConcordance = function (body) {
  return new Promise(async function (resolve, reject) {
    const table = 'MSCS621-concordance-analyze'
    const exists = '';
    //const exists = await getData(table, body)
    if (exists == '') {
      const bodyWords = body.toLowerCase().split(' ')
      const wordCount = new Map()
      for (let i = 0; i < bodyWords.length; i++) {
        if (wordCount.has(bodyWords[i]) === false) {
          wordCount.set(bodyWords[i], 1)
        } else {
          wordCount.set(bodyWords[i], wordCount.get(bodyWords[i]) + 1)
        }
      }
      const concordance = []
      for (const [word, count] of wordCount) {
        const concordObj = {}
        concordObj.token = word
        concordObj.count = count
        concordance.push(concordObj)
      }
      // concordance = JSON.parse(concordance);
      console.dir(concordance)
      var examples = {}
      examples['application/json'] = {
        Input: body,
        concordance: concordance
      }
      //putData(table, body, concordance)
    } else {
      console.dir(exists)
      var examples = exists
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples)
    } else {
      resolve()
    }
  })
}

/**
 * Calculate
 * Post text to generate concordance
 *
 * body String Text to be analyzed (optional)
 * returns result
 **/
exports.getLocations = function (body) {
  //const table = 'MSCS621-concordance-locate'
  return new Promise(async function (resolve, reject) {
    const exists = '';
    //const exists = await getData(table, body)
    if (exists == '') {
      const bodyWords = body.toLowerCase().split(' ')
      const locationsToWords = new Map()
      for (let i = 0; i < bodyWords.length; i++) {
        const tempArray = []
        if (locationsToWords.has(bodyWords[i]) === false) {
          locationsToWords.set(bodyWords[i], tempArray)
        }
        locationsToWords.get(bodyWords[i]).push(i)
      }
      const locationSet = []
      for (const [word, locations] of locationsToWords) {
        const locateObj = {}
        locateObj.token = word
        locateObj.locations = locations
        locationSet.push(locateObj)
      }
      // locationSet = JSON.parse(locationSet);
      console.dir(locationSet)
      var examples = {}
      examples['application/json'] = {
        input: body,
        concordance: locationSet
      }
      //putData(table, body, locationSet)
    } else {
      console.dir(exists)
      var examples = exists
    }

    if (Object.keys(examples).length > 0) {
      resolve(examples)
    } else {
      resolve()
    }
  })
}

exports.ntlk = function(body) {
  return new Promise(async function (resolve, reject){
  var tokenizer = new natural.WordTokenizer();
    var bodyWords = tokenizer.tokenize(body.toLowerCase());
    var wordCount = new Map();
      for (var i = 0; i < bodyWords.length; i++) {
        if(wordCount.has(bodyWords[i])){
          wordCount.set(bodyWords[i], wordCount.get(bodyWords[i]) + 1)
        } else {
          wordCount.set(bodyWords[i], 1);
        }
      }
      const concordance = []
      for (const [word, count] of wordCount) {
        const concordObj = {}
        concordObj.token = word
        concordObj.count = count
        concordance.push(concordObj)
      }
      concordance = JSON.parse(concordance);
      console.dir(concordance)
      var examples = {}
      examples['application/json'] = {
        Input: body,
        concordance: concordance
      }
    if (Object.keys(examples).length > 0) {
      resolve(examples)
    } else {
      resolve()
    }
  })
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
/*
async function getData (table, key) {
  let found = ''
  const params = {
    TableName: table,
    Key: {
      input: key
    }
  }
  found = await docClient
    .get(params)
    .promise()
    .then((data) => {
      // console.log(data.Item);
      return data.Item
    })
    .catch((err) => {
      console.log(err, err.stack)
      return ''
    })
  if (found == null) {
    found = ''
  }
  return found
}

function putData (table, key, dataToPut) {
  const params = {
    TableName: table,
    Item: {
      input: key,
      Concordance: dataToPut
    }
  }
  docClient.put(params, function (err, data) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Success', data)
    }
  })
}
*/
