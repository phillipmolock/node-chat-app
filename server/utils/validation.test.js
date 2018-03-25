const expect = require('expect');
const {isRealString} = require('./validation');

// import isRealString

describe('isRealString', () => {
    
    it('should properly reject non-strings', () => {
        var nonString = 134;
        var spacesString = ' ';
        
        expect(isRealString(nonString)).toBe(false);
        expect(isRealString(spacesString)).toBe(false);
    });
    
    it('should accept strings', () => {
        var validString = 'stringyyy';    
        expect(isRealString(validString)).toBe(true);
    });
 
});

// isRealString
