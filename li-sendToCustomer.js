const line = require('@line/bot-sdk');

module.exports = function getJWT(message, newtoken) {
  console.log(message)
  console.log(newtoken)
  const client = new line.Client({
    channelAccessToken: newtoken
  });
  
  const Message = {
    type: 'text',
    text: message
  };
  
  client.pushMessage('U133a1ab1254f3ec6645a0689a55dd375', Message)
    .then(() => {
      console.log('メッセージを送信しました')
    })
    .catch((err) => {
      console.log('エラーが発生しました')
    });
}
