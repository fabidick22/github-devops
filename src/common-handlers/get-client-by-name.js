
const tableName = process.env.CLIENT_TABLE;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getClientByNameHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);
 
  const params = {
    TableName : tableName,
    FilterExpression: "#name = :nameClient",
    ExpressionAttributeValues: {
      ":nameClient": event.pathParameters.name
    },
  };
/*  var params = {
    TableName : tableName,
    Key: { name: name },
  };*/
  const passwd = "M!$uper$ecretToTest123!$"  // pragma: allowlist secret
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
