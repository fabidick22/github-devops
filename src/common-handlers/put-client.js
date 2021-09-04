const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.CLIENT_TABLE;
const crypto = require("crypto");


exports.putClientHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`putMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    const body = JSON.parse(event.body)

    var params = {
        TableName : tableName,
        Item: {
            id : crypto.randomBytes(16).toString("hex"),
            name: body.name,
            money: body.money
        }
    };

    const result = await docClient.put(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify({msg: "saved data", res: result})
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
