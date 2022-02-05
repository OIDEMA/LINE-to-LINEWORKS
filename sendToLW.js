const request = require('request');

module.exports = function sendToLW(messageText, token, userInfo) {
  const BOTNO = process.env.BOTNO;
  const APIID = process.env.APIID;
  const CONSUMERKEY = process.env.CONSUMERKEY;

  const postData = {
    url: "https://apis.worksmobile.com/r/" + APIID + "/message/v1/bot/" + BOTNO + "/message/push",
    headers: {
      consumerKey: CONSUMERKEY,
      Authorization: "Bearer " + token
    },
    json: {
      botNo: Number(BOTNO),
      accountId: "Your Accout ID",
      // roomId: ********,
      content: {
        type: "text",
        text: "質問内容："+ "\n" + messageText + "\n\n" + "質問者：" + userInfo.displayName + "\n" + "質問者ID：" + userInfo.userId 
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