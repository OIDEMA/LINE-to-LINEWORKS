const line = require('@line/bot-sdk');
const axios = require('axios');

const getJWT = require("./getJWT");
const getServerToken = require("./get-server-token");

module.exports = async function sendMessageToCustomer(message, newtoken, accountId, companyUser) {

  getJWT(jwttoken => {
    getServerToken(jwttoken, async (newtoken) => {
      await axios({
        method: 'get',
        url: `https://apis.worksmobile.com/r/${process.env.APIID}/contact/v2/accounts/${sender}`,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          consumerKey: process.env.CONSUMERKEY,
          Authorization: "Bearer " + newtoken
        }
      }).then((res) => {
        const client = new line.Client({
          channelAccessToken: newtoken
        });
      
        const replyUser = "穴吹興産株式会社"+ "\n" + res.data.name + "\n" +　"所属部署：" + res.data.representOrgUnitName
      
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
          }
        );        
      }).catch((err) => {
        console.log(`error is ${err}`)
      })
    })
  });
}