const https = require("https")
const TOKEN = process.env.LINE_ACCESS_TOKEN

module.exports = function getUserAccount(userId) {

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + TOKEN
  }

  const webhookOptions = {
    "hostname": "api.line.me",
    "path": `v2/bot/profile/${userId}`,
    "method": 'GET',
    "headers": headers,
  }
  // Define request
  const request = https.request(webhookOptions, (res) => {
    res.on('data', (d) => {
      console.log(d)
    })
    res.on('end', () =>{
      console.log("user aquisition finished")
    })
  })
  // Handle error
  request.on('error', (e) => {
    console.error(`problem with request: ${e.message}`)
  })

  // Send data
  // request.write()
  request.end()
};

