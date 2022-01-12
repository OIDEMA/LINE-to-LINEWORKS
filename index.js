const https = require("https")
const express = require("express")
const app = express()
const { google } = require('googleapis');

/* コンフィグ設定 */
require('dotenv').config()

const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN



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

app.post("/callback", function(req, res) {
    if (req.body.events[0].type === "message") {
        // Message data, must be stringified
        const dataString = JSON.stringify({
          replyToken: req.body.events[0].replyToken,
          messages: [
            {
              "type": "text",
              "text": "May I help you?"
            }
          ]
        })
    
        // Request header
        const headers = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + TOKEN
        }
    
        // Options to pass into the request
        const webhookOptions = {
          "hostname": "api.line.me",
          "path": "/v2/bot/message/reply",
          "method": "POST",
          "headers": headers,
          "body": dataString
        }
    
        // Define request
        const request = https.request(webhookOptions, (res) => {
          res.on("data", (d) => {
            process.stdout.write(d)
          })
        })
    
        // Handle error
        request.on("error", (err) => {
          console.error(err)
        })
    
        // Send data
        request.write(dataString)
        request.end()
      }
})

app.get("/accountSet", function() {

    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URL
    );

    /* スコープ一覧 https://developers.google.com/identity/protocols/oauth2/scopes#adsense */
    const scopes = [
        'https://www.googleapis.com/auth/adsense.readonly',
    ];

    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: scopes
      });
    })


/* Reference */

/* 
Googleapi x node.js
https://googleapis.dev/nodejs/googleapis/46.0.0/adsense/index.html


*/