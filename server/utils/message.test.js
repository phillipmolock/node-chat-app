var expect = require('expect');
var {generateMessage} = require('./message');

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