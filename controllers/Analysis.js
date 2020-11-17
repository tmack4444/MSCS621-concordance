"use strict";

var utils = require("../utils/writer.js");
var Analysis = require("../service/AnalysisService");
const axios = require("axios");
module.exports.getConcordance = function getConcordance(req, res, next, body) {
  Analysis.getConcordance(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  //Build a POST request in node from https://nodejs.dev/learn/make-an-http-post-request-using-nodejs
  var config = {
    headers: {
      "Content-Length": 0,
      "Content-Type": "text/plain",
    },
  };
};

module.exports.getLocations = function getLocations(req, res, next, body) {
  Analysis.getLocations(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
