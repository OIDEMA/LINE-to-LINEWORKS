const https = require("https")

const express = require("express")
const app = express()
const { google } = require('googleapis');

/* decode */
// const jwt_decode = require('jwt-decode');

const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN

const getUserAccount = require('./get-user-account')
const getJWT = require("./getJWT");
const getServerToken = require("./get-server-token");
const sendToLW = require("./sendToLW")

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})


app.post("/callback", async function(req, res) {
  if (req.body.events[0].type === "message") {

    const USERID = req.body.events[0].source.userId
    const Message = req.body.events[0].message.text

    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          "type": "text",
          "text": Message
        }
      ]
    })  
    // Request header
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    }
    //Options to pass into the request
    const webhookOptions = {
      "hostname": "api.line.me",
      "path": "/v2/bot/message/reply",
      "method": "POST",
      "headers": headers,
      "body": dataString
    }
    // Define request
    const request = https.request(webhookOptions, (res) => {
      res.on('data', (d) => {
        process.stdout.write(d)
      })
      res.on('end', () => {
        console.log("message transfer finished")
      })
    })
  
    const userAccount = await getUserAccount(USERID)

    /* LineWorksへの転送 */
    getJWT(jwttoken => {
      getServerToken(jwttoken, newtoken => {
        sendToLW(Message, newtoken, userAccount);
      });
    });

    // Handle error
    request.on("error", (err) => {
      console.error(err)
    })
    // Send data
    request.write(dataString)
    request.end()
  }
})

/* from Lineworks*/

const liSendToCustomer = require('./li-sendToCustomer')
const liGetJWT = require("./li-getJWT");
const liGetServerToken = require("./li-get-server-token");

const RegExp = /^U[A-Za-z0-9]{32}\n/;

/* /^([A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,})\n/; */


app.post("/fromlw", function(req, res) {
  const messageText = req.body.content.text
  /* https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions */
  if (RegExp.test(messageText)) {
    console.log('動いた')
    const accountId = messageText.match(RegExp);
    console.log({'accountId': accountId})
    const answerMessage = messageText.replace(RegExp, "");
    console.log({'answerMessage': answerMessage})
    liGetJWT(jwttoken => {
      liGetServerToken(jwttoken, newtoken => {
        console.log("ここまで確認")
        /* liSendToCustomer(answerMessage, newtoken, accountId);*/
      });
    })
  }
})

/* Reference */
/* 
Googleapi x node.js
https://googleapis.dev/nodejs/googleapis/46.0.0/adsense/index.html
*/

// app.get("/accountSet", function() {

//     const oauth2Client = new google.auth.OAuth2(
//         process.env.CLIENT_ID,
//         process.env.CLIENT_SECRET,
//         process.env.REDIRECT_URL
//     );

//     /* スコープ一覧 https://developers.google.com/identity/protocols/oauth2/scopes#adsense */
//     const scopes = [
//         'https://www.googleapis.com/auth/adsense.readonly',
//         'https://www.googleapis.com/auth/plus.me'
//     ];

//     const url = oauth2Client.generateAuthUrl({
//         // 'online' (default) or 'offline' (gets refresh_token)
//         access_type: 'offline',

//         // If you only need one scope you can pass it as a string
//         scope: scopes
//       });

//       console.log(url)

//       const tokens = oauth2Client.getToken(code)
//       oauth2Client.setCredentials(tokens);

//       oauth2Client.on('tokens', (tokens) => {
//         if (tokens.refresh_token) {
//           // store the refresh_token in my database!
//           console.log(tokens.refresh_token);
//         }
//         console.log(tokens.access_token);
//       });

//       oauth2Client.setCredentials({
//         refresh_token: `STORED_REFRESH_TOKEN`
//       });
//     })

    // function getRefreshToken(){
    //     const server = http.createServer(async (req, res) => {
    //         if (req.url.indexOf('/oauth2callback') > -1) {
    //           // acquire the code from the querystring, and close the web server.
    //           const qs = querystring.parse(url.parse(req.url).query);
    //           console.log(`Code is ${qs.code}`);
    //           res.end('Authentication successful! Please return to the console.');
    //           server.close();
              
    //           // Now that we have the code, use that to acquire tokens.
    //           const r = oAuth2Client.getToken(qs.code);
              
    //           // Make sure to set the credentials on the OAuth2 client.
    //           oAuth2Client.setCredentials(r.tokens);
    //           console.info('Tokens acquired.');
    //           resolve(oAuth2Client);
    //         }
    //       }).listen(3000, () => {
    //         // open the browser to the authorize url to start the workflow
    //         opn(authorizeUrl);
    //       });
    // }