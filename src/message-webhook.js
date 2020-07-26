/*
 * File: message-webhook.js
 * Project: whatsapp-bot
 * File Created: Sunday, 26th July 2020 2:25:45 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

const dialogflow = require('dialogflow');
const processMsgAndSend = require('./sendWhatsApp.js')

// You can find your project ID in your Dialogflow agent settings
const projectId = 'newagent-moqk'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';


const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

async function processMessage(params) {
  const receivedMsg = params.Body;
  const userId = params.From;

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: receivedMsg,
        languageCode: languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      console.log("result ", result);
      processMsgAndSend(userId, result.fulfillmentText);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}



module.exports = (req, res) => {
  console.log('message from twilio', req.body);
  if(req.body !== null){
    processMessage(req.body);
  }
  res.status(200).end();
}

// sample body message from twilio 
// {
//   SmsMessageSid: 'SM84a6ccedeade3f7ec69787663f4d8f51',
//   NumMedia: '0',
//   SmsSid: 'SM84a6ccedeade3f7ec69787663f4d8f51',
//   SmsStatus: 'received',
//   Body: 'Hi',
//   To: 'whatsapp:+14155238886',
//   NumSegments: '1',
//   MessageSid: 'SM84a6ccedeade3f7ec69787663f4d8f51',
//   AccountSid: 'ACcb916834c46b206276b149b77a11d10a',
//   From: 'whatsapp:+918076489924',
//   ApiVersion: '2010-04-01'
// }

