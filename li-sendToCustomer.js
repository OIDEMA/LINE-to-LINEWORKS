const line = require('@line/bot-sdk');
const axios = require('axios');

module.exports = async function sendMessageToCustomer(message, newtoken, accountId, companyUser) {

  const client = new line.Client({
    channelAccessToken: newtoken
  });

  const replyUser = await getAccountInfo()

  const Message = {
    type: 'text',
    text: message + replyUser
  };
  
  client.pushMessage(accountId, Message)
    .then(() => {
      console.log('メッセージを送信しました')
    })
    .catch((err) => {
      console.log('エラーが発生しました')
    });

    /* Line Works User */
    async function getAccountInfo() {
      try {
        const account = await axios({
          method: 'get',
          url: `https://apis.worksmobile.com/r/${process.env.APIID}/contact/v2/accounts/${companyUser}`,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            consumerKey: process.env.CONSUMERKEY,
            Authorization: "Bearer " + token
          }
        }).then((res) => {
          return res.data
        })
        return "穴吹興産株式会社"+ "\n" + account.name + "\n" +　"所属部署：" + account.representOrgUnitName
      } catch (e) {
        console.log(e)
      }
    }
}
