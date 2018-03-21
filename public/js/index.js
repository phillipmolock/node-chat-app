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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('New Message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    
    jQuery('#messages').append(li);
});


//socket.emit('createMessage',{
//    from: 'Frank',
//    text: 'hi'
//}, function (data) {
//    console.log('Got it', data);
//});

socket.on('newLocationMessage', function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{
       from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        messageTextbox.val('');
    });
    
    
});

var locationButton = jQuery('#send-location');

console.log(locationButton);

locationButton.on('click', function (e){
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }
    
    locationButton.attr('disabled', 'disabled').text('Sending location..');
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        console.log(position);
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});