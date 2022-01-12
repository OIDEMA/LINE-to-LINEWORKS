const https = require("https")
const express = require("express")
const app = express()
const google = require('googleapis');

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

app.get("/accountSet", function(req, res) {
    const auth = google.Auth.GoogleAuth({
        keyFilename: './credentials/client_secret_381754777440-bfg7pd0uls3qk4dikm5abmmu79ec27rl.apps.googleusercontent.com.json',
        scopes: ['https://www.googleapis.com/auth/documents']
    })

    const authClient = await auth.getClient();
    
    const client = await docs.docs({
        version: 'v1',
        auth: authClient
    });
    
    const createResponse = await client.documents.create({
        requestBody: {
          title: 'Your new document!',
        },
    });
    
    console.log(createResponse.data);
})


/* Reference */

/* 
Googleapi x node.js
https://googleapis.dev/nodejs/googleapis/46.0.0/adsense/index.html


*/