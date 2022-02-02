const request = require('request');

module.exports = function sendToLW(messageText, token) {
  console.log(token)
  console.log(messageText)
  const BOTNO = process.env.BOTNO;
  const APIID = process.env.APIID;
  const CONSUMERKEY = process.env.CONSUMERKEY;

  const postData = {
    url: "https://apis.worksmobile.com/" + APIID + "/message/sendMessage/v2",
    headers: {
      consumerKey: CONSUMERKEY,
      Authorization: "Bearer " + token
    },
    json: {
      botNo: Number(BOTNO),
      accountId: "k-goda@anabuki-group",
      // roomId: "k-goda@anabuki-group",
      content: {
        type: "text",
        text: messageText
      }
    }
  };
  request.post(postData, (err, response, body) => {
    if (err) {
      console.log("error send message: ", err);
      return;
    }
  });  
};