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
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// launch express app
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // gives us our websocket server
var users = new Users();

// user publicPath for static
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    

    
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
    
//    socket.on('createEmail', (newEmail) => {
//        console.log('createEmail', newEmail)
//    });
    
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required');
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name,params.room);
        // socket.leave('The Office Fans');
        
        // io.emit -> every single connected user
        // socket.broadcast -> only to everyone except for the current user
        // socket.emit -> specifically to one user
        
        // io.emit - to a room - > io.to(roomName).emit
        // socket.broadcast - to a room -> socket.broadcast.to(roomName).emit
        
        //socket.emit from Admin text welcome to the chat app
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
        //socket.broadcast.emit (everyone but user who joined) from admin text new user joined

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));
        
        callback();
    });
    
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        //io.emit to all connections
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
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
        var user = users.removeUser(socket.id);
        
        if (user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
            
        }
        //console.log('User disconnected');
    });
}); //listen for a new connection then do callback

server.listen(port, () => console.log(`Server is up and listening on ${port}`));

//console.log(__dirname + '/../public');
//console.log(publicPath);

//create new express app, configure express static middle ware, put server up on 3000, head to localhost:3000/ and see index.html