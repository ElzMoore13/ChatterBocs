const express = require('express');
const SocketServer = require('ws').Server;
const newId = require('uuid/v4');
const WebSocket = require('ws');
const randomColor = require('random-color');

const PORT = 3001;

//Create a new express Server
const server = express()
  //Make the express server serve static assets (html, javascript, css) from /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log( `Listening on ${ PORT }`));

//Create the WebSockets Server
const wss = new SocketServer({ server });

//broadcast to everyone
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

//Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by the ws parameter in the callback
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('Num Users: ', wss.clients.size)
  let newColor = randomColor().hexString();
  const numUsers = {
    type: 'userCount',
    num: wss.clients.size,
    color: newColor,
  }
  wss.broadcast(JSON.stringify(numUsers));

  ws.onmessage = function (event) {

    const data = JSON.parse(event.data)
    const messContent = data.content;

    switch(data.type){
      case('postMessage'):
        const messUsername = data.username;
        data.type = 'incomingMessage'
        console.log(`${messContent} sent from ${messUsername}`)
        break;
      case('postNotification'):
        data.type = 'incomingNotification'
        console.log(`${messContent}`)
        break;
      default:
        throw new Error(`did not recognize the event type...${data.type}`);
    }
    //broadcast to others
    wss.broadcast(JSON.stringify(data));

  }


  //Set up a callback for when a client closes the socket (usually they close their browser)
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log('Num Users: ', wss.clients.size)
    const numUsers = {
      type: 'userCount',
      content: wss.clients.size,
    }
    wss.broadcast(JSON.stringify(numUsers));
  });
});
