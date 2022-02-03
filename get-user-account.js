const request = require('request');
const https = require("https")


// const https = require('https'); 
// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => { 
//     let data = ''; 

//     // A chunk of data has been received. 
//     resp.on('data', (chunk) => { 
//         data += chunk; 
//     }); 

//     // The whole response has been received. Print out the result. 
//     resp.on('end', () => { 
//         console.log(JSON.parse(data).explanation); 
//     }); 

// }).on("error", (err) => { 
//     console.log("Error: " + err.message); 
// });

const TOKEN = process.env.LINE_ACCESS_TOKEN

module.exports = function getUserAccount(userId) {

  const URL = `https://api.line.me/v2/bot/profile/${userId}`

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + TOKEN
  }

  const webhookOptions = {
    "hostname": "api.line.me",
    "path": `v2/bot/profile/${userId}`,
    "method": "GET",
    "headers": headers,
  }
  // Define request
  const request = https.request(webhookOptions, (res) => {
    res.on("data", (d) => {
      console.log({"d": d})
      return d
    })
  })

  // https.get(webhookOptions, (res) => {

  // })

};

