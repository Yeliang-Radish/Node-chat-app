var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'DE Dsf you suck';
        var msg = generateMessage(from, text);
        expect(msg.from).toBe(from);
        expect(msg.text).toBe(text);
        expect(msg).toMatchObject({
            from,
            text
        });
        expect(typeof msg.createdAt).toBe('number');
    });
});