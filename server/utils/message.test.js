var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate the correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
       var message = generateMessage(from, text);
        // assert from match
        // assert text match
        expect(message).toInclude({from,text});
        
        
        // assert createdAt is number
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage',() => {
    it('should generate correct location object', () => {
       // pass in from lat long then make assertions about values you get back, createdAt is a number and URL property is what you'd expect
        var from = 'Admin';
        var latitude = 15;
        var longitude = 20;
        var url = 'https://www.google.com/maps?q=15,20';
        
        var locationMessage = generateLocationMessage(from, latitude, longitude);
        
        expect(locationMessage).toInclude({from, url});
       
        expect(locationMessage.createdAt).toBeA('number');

    });
});
