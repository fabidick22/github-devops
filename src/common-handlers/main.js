
const apiVersion = process.env.API_VERSION;

exports.mainHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`mainMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
 
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      msg: "This is the app index",
      endpoints: ["/clients", "/clients/{id}", "/clients/name/{name}"],
      version: apiVersion
    })
  };
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
