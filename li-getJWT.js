const jose = require('node-jose');

module.exports = function getJWT() {
  const jwt = jose.JWS.createSign(
    {
      format: 'compact',
      fields: {
        alg: "RS256",
        typ: "JWT",
        kid: process.env.KID
      }
    },
    JSON.parse(process.env.LI_PRIVATEKEY))
  .update(JSON.stringify({
    iss: process.env.CHANNELID,
    sub: process.env.CHANNELID,
    aud: "https://api.line.me/",
    exp: Math.floor(new Date().getTime() / 1000) + 60 * 30,
    token_exp: 60 * 60 * 24 * 30
  }))
  .final()
  .then((res)=> {
    console.log(res);
    return res
  });
  return jwt
}

/* 
Refernce 
https://developers.line.biz/ja/docs/messaging-api/generate-json-web-token/#generate-jwt 
*/