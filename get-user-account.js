const https = require("https")
const axios = require('axios');

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
  axios.get(webhookOptions)
    .then((data)=> {
      console.log(data)
  })
};

