var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'DE Dsf you suck';
        var msg = generateMessage(from, text);
        expect(msg).toMatchObject({
            from,
            text
        });
        expect(typeof msg.createdAt).toBe('number');
    });    
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Bill';
        var latitude = 45.1;
        var longitude = 12.4;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var msg = generateLocationMessage(from, latitude, longitude);
        expect(msg.from).toBe(from);
        expect(msg.url).toBe(url);
        expect(typeof msg.createdAt).toBe('number');
    });
});