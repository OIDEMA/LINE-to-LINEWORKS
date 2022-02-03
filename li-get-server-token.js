const request = require("request");

module.exports = function getServerToken(jwttoken, callback) {
    const postdata = {
      url: "https://api.line.me/oauth2/v2.1/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      form: {
        grant_type: "client_credentials",
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: jwttoken
      }
    };
    request.post(postdata, (error, response, body) => {
      if (error) {
        console.log("Error getServerToken: ", error);
        callback(error);
      } else {
        const jsonobj = JSON.parse(body);
        const AccessToken = jsonobj.access_token;
        callback(AccessToken);
      }
    });
}