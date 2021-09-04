
const tableName = process.env.CLIENT_TABLE;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getClientByNameHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);
 
  const name = event.pathParameters.name;
 
  const params = {
    TableName : tableName,
    FilterExpression: "name = :nameCli",
    ExpressionAttributeValues: {
      ":nameCli": name
    },
  };
/*  var params = {
    TableName : tableName,
    Key: { name: name },
  };*/
  const passwd = "M!$uper$ecretToTest123!$"
  const data = await docClient.get(params).promise();
  const item = data.Item;
 
  const response = {
    statusCode: 200,
    body: JSON.stringify(item)
  };
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
