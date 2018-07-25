const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it ('should reject non-string values', () => {
        str = 123;
        expect(isRealString(str)).toBe(false);

    });

    it('should reject string with only spaces', () => {
        str = "   ";
        expect(isRealString(str)).toBe(false);
    });

    it('should allow strings with non-space characters', () => {
        str = "Hello"
        expect(isRealString(str)).toBe(true);
    })
});