const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3001;

//Create a new express Server
const server = express()
  //Make the express server serve static assets (html, javascript, css) from /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log( `Listening on ${ PORT }`));

//Create the WebSockets Server
const wss = new SocketServer({ server });

//Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by the ws parameter in the callback
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.onmessage = function (event) {
    let message = `${JSON.parse(event.data).content} sent from ${JSON.parse(event.data).username}`
    console.log(message)
    wss.broadcast(message)
  }


  //Set up a callback for when a client closes the socket (usually they close their browser)
  ws.on('close', () => console.log('Client disconnected'));
});
