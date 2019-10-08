'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.hello = (event, context, callback) => {
  var dateTime = new Date().toLocaleString();
  const successString = "Upload Successful"

  const successResponse = {
    statusCode: 200,
    body: JSON.stringify(successString)
  }

   var s3params = {
    Body: `Hello World on ${dateTime}`,
    Bucket: "hello-world-tech-test",
    Key:  "hello.txt",
   };

   s3.putObject(s3params, function(err) {
     if (err) {
       console.error(err);
     }
     else {
      console.log(successString);
      callback(null, successResponse);
     }
   });
};
