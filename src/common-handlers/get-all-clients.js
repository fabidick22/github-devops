var AWS = require('aws-sdk');
var AWSXRay = require('aws-xray-sdk');
var ddbClient = AWSXRay.captureAWSClient(new AWS.DynamoDB());
const docClient = new AWS.DynamoDB.DocumentClient({
    service: ddbClient
})
docClient.service = ddbClient;
const tableName = process.env.CLIENT_TABLE;

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
