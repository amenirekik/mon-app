const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Un utilisateur connecté');

    socket.on('update-table', (data) => {
        socket.broadcast.emit('update-table', data); // envoie aux autres
    });

    socket.on('chat-message', (msg) => {
        socket.broadcast.emit('chat-message', msg); // envoie le message à tous
    });
});

http.listen(3000, () => {
    console.log('Serveur lancé sur http://localhost:3000');
});