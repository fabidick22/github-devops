
const tableName = process.env.CLIENT_TABLE;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getAllClientHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllIClients only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

    var params = {
        TableName : tableName
    };
    const data = await docClient.scan(params).promise();
    const items = data.Items;

    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
