// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient();

var word = ["test", "this", "is", "a"];
var count = [4, 1, 1, 1];

var concordance = [];
for(var i = 0; i < word.length; i++){
  var concordObj = {};
  concordObj.token = word[i];
  concordObj.count = count[i];
  concordance.push(concordObj);
}
concordance = JSON.stringify(concordance);

var params = {
  TableName: 'MSCS621-concordance-analyze',
  Item: {
    'input': 'TEST TEST TEST THIS IS A TEST',
    'Concordance': concordance
  }
};

docClient.put(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
