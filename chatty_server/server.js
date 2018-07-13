const express = require('express');
const SocketServer = require('ws').Server;
const newId = require('uuid/v4');
const WebSocket = require('ws');

const PORT = 3001;

//Create a new express Server
const server = express()
  //Make the express server serve static assets (html, javascript, css) from /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log( `Listening on ${ PORT }`));

//Create the WebSockets Server
const wss = new SocketServer({ server });

//made array of appropriate text colors (no whites or bright yellows)
const textColors = ['#0066FF',
'#330099', '#CC6600', '#006600', '#336666', '#660000', '#000066', '#003333', '#660066', '#6699FF', '#993366', '#CC3333', '#9966CC', '#999900']

const randomColor = () => {
  let index = Math.round(Math.random()*14)
  return textColors[index];
}

//helper function to calculate and broadcast number of online users
const updateNumUsers = (updateType, numClients) => {
  const numUsers = {
    type: updateType,
    num: numClients,
  }
  if(updateType === 'userAdded'){
    let newColor = randomColor()
    numUsers.color = newColor;
  }
  wss.broadcast(JSON.stringify(numUsers));
}

//helper function to broadcast to everyone
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

  //update number of online users displayed on page
  updateNumUsers('userAdded', wss.clients.size);

  //listen for messages and notifications to be posted, to then be sent to app
  ws.onmessage = function (event) {

    const data = JSON.parse(event.data)
    const messContent = data.content;

    switch(data.type){
      case('postMessage'):
        data.type = 'incomingMessage'
        break;
      case('postNotification'):
        data.type = 'incomingNotification'
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

    //update number of online users displayed on page
    updateNumUsers('userLeft', wss.clients.size);

  });
});
