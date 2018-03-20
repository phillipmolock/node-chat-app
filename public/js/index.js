            //io initiates socket connection
var socket = io();
socket.on('connect', function() {
    console.log('---');
    console.log('Connected to server');
    console.log('---');
    
//    socket.emit('createEmail',{
//        to: 'jen@example.com',
//        text: 'Hey, this is andrew'
//    });
//    
//    socket.emit('createMessage',{
//        from: 'Tommy',
//        text: 'stop messaging me'
//    });
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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li);
});


//socket.emit('createMessage',{
//    from: 'Frank',
//    text: 'hi'
//}, function (data) {
//    console.log('Got it', data);
//});

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    
    socket.emit('createMessage',{
       from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
    
    
});