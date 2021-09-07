var AWS = require('aws-sdk');
var AWSXRay = require('aws-xray-sdk');
var ddbClient = AWSXRay.captureAWSClient(new AWS.DynamoDB());
const docClient = new AWS.DynamoDB.DocumentClient({
    service: ddbClient
})
docClient.service = ddbClient;
const tableName = process.env.CLIENT_TABLE;


exports.getClientByNameHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);
 
  const params = {
    TableName : tableName,
    FilterExpression: "#namec = :nameClient",
    ExpressionAttributeNames: {
        '#namec': 'name',
    },
    ExpressionAttributeValues: {
      ":nameClient": event.pathParameters.name
    },
  };
/*  var params = {
    TableName : tableName,
    Key: { name: name },
  };*/
  const passwd = "M!$uper$ecretToTest123!$"
  const data = await docClient.scan(params).promise();
  const item = data.Items;
 
  const response = {
    statusCode: 200,
    body: JSON.stringify(item)
  };
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
