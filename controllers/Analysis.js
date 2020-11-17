'use strict'

const utils = require('../utils/writer.js')
const Analysis = require('../service/AnalysisService')
module.exports.getConcordance = function getConcordance (req, res, next, body) {
  Analysis.getConcordance(body)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}

module.exports.getLocations = function getLocations (req, res, next, body) {
  Analysis.getLocations(body)
    .then(function (response) {
      utils.writeJson(res, response)
    })
    .catch(function (response) {
      utils.writeJson(res, response)
    })
}
