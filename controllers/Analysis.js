'use strict';

var utils = require('../utils/writer.js');
var Analysis = require('../service/AnalysisService');

module.exports.getConcordance = function getConcordance (req, res, next, body) {
  /*
  Analysis.getConcordance(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  */
  //Build a POST request in node from https://stackoverflow.com/questions/6158933/how-is-an-http-post-request-made-in-node-js

  const axios = require('axios')

  axios
    .post('https://k2ici5adja.execute-api.us-east-2.amazonaws.com/default/my-function', {
       todo: body
     })
    .then(res => {
      console.log("Success");
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch(error => {
      console.log("ERROR");
      console.error(error)
    })
};

module.exports.getLocations = function getLocations (req, res, next, body) {
  Analysis.getLocations(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
