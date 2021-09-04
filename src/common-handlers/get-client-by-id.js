const tableName = process.env.CLIENT_TABLE;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getClientByIdHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getByIdMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);
 
  const id = event.pathParameters.id;
  var params = {
    TableName : tableName,
    Key: { id: id },
  };
  const data = await docClient.get(params).promise();
  const item = data.Item;
 
  const response = {
    statusCode: 200,
    body: JSON.stringify(item)
  };
 
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
