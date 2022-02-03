const https = require("https")
const axios = require('axios');

const TOKEN = process.env.LINE_ACCESS_TOKEN

module.exports = function getUserAccount(userId) {

  const URL = `https://api.line.me/v2/bot/profile/${userId}`

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + TOKEN
  }

  const webhookOptions = {
    'method': 'get',
    'url': URL,
    'headers': headers,
  }
  // Define request
  axios.get(webhookOptions)
    .then((data)=> {
      console.log(data)
  })
};

