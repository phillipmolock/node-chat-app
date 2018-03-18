            //io initiates socket connection
var socket = io();
socket.on('connect', function() {
    console.log('---');
    console.log('Connected to server');
    console.log('---');
    
    socket.emit('createEmail',{
        to: 'jen@example.com',
        text: 'Hey, this is andrew'
    });
    
    socket.emit('createMessage',{
        from: 'Tommy',
        text: 'stop messaging me'
    });
});
            
socket.on('disconnect', function () {
    console.log('---');
    console.log('Disconnected from server');
    console.log('---');
});

socket.on('newEmail', function (email) {
    console.log('New email', email);
});

socket.on('newMessage', function (message){
    console.log('New Message', message);
});