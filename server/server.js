// root of node application
// node npm
const path = require('path'); // just part of node
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// 3rd party npm
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');



// launch express app
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // gives us our websocket server

// user publicPath for static
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    //socket.emit from Admin text welcome to the chat app
    
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    //socket.broadcast.emit (everyone but user who joined) from admin text new user joined
    
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));
    
//    socket.emit('newEmail', {
//        from: 'mike@example.com',
//        text: 'Hey, whats going on?',
//        createdAt: 123
//    });
//    
//    socket.emit('newMessage', {
//        from: 'tommy',
//        text: 'yoooo',
//        createdAt: 123
//    });
    
    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail)
    });
    
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        //io.emit to all connections
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
//        socket.broadcast.emit('newMessage',{
//            from: message.from,
//            text: message.text,
//            createdAt: new Date().getTime()
//        });
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    
    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
}); //listen for a new connection then do callback

server.listen(port, () => console.log(`Server is up and listening on ${port}`));

//console.log(__dirname + '/../public');
//console.log(publicPath);

//create new express app, configure express static middle ware, put server up on 3000, head to localhost:3000/ and see index.html