/*
 * File: sendWhatsApp.js
 * Project: whatsapp-bot
 * File Created: Sunday, 26th July 2020 2:15:13 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken); 

const fromMessage = 'whatsapp:+14155238886'

module.exports = (userId, messageBody) => {

  client.messages.create({
    from: fromMessage,
    to: userId,
    body: messageBody
  }).then((message) => console.log(message.sid))
    .catch((err) => console.log(err));

}