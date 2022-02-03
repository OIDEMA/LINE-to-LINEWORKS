const https = require("https")
const axios = require('axios');

const TOKEN = process.env.LINE_ACCESS_TOKEN

module.exports = function getUserAccount(userId) {

  const url = `https://api.line.me/v2/bot/profile/${userId}`

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + TOKEN
  }

  const webhookOptions = {
    'method': 'get',
    'headers': headers,
  }
  // Define request
  const userInfo = axios.get(url, webhookOptions)
    .then((res)=> {
      console.log(res.data)
      return res
    })
    .catch((err) => {
      console.log(`error is ${err}`)
    })
};

