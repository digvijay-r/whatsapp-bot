/*
 * File: app.js
 * Project: whatsapp-bot
 * File Created: Sunday, 26th July 2020 1:39:45 pm
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 */

require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const messageWebhook = require('./src/message-webhook.js');


const port = process.env.port || 6991;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello'));

app.post('/', messageWebhook)


app.listen(port, ()=> console.log("Server started on port "+ port));