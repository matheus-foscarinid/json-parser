import Parser from "../src/parser";
import Lexer from "../src/lexer";

const parse = (input: string) => {
  const lexer = new Lexer(input);
  const tokens = lexer.scan();
  const parser = new Parser(tokens);
  return parser.parse();
}

describe('Parser', () => {
  describe('JSON objects', () => {
    it('should parse an empty object', () => {
      expect(parse('{}')).toEqual({});
    });

    it('should parse an object with a single key-value pair', () => {
      expect(parse('{"key": "value"}')).toEqual({ key: 'value' });
    });

    it('should parse an object with multiple key-value pairs', () => {
      expect(parse('{"key1": "value1", "key2": "value2"}')).toEqual({ key1: 'value1', key2: 'value2' });
    });

    it('should parse nested objects', () => {
      expect(parse('{"key": {"nestedKey": "nestedValue"}}')).toEqual({ key: { nestedKey: 'nestedValue' } });
    });

    it('should parse objects with nested arrays', () => {
      expect(parse('{"key": ["value1", "value2"]}')).toEqual({ key: ['value1', 'value2'] });
    });

    it('should parse objects with null values', () => {
      expect(parse('{"key": null}')).toEqual({ key: null });
    });

    it('should parse objects with boolean values', () => {
      expect(parse('{"key": true}')).toEqual({ key: true });
      expect(parse('{"key": false}')).toEqual({ key: false });
    });

    it('should parse objects with number values', () => {
      expect(parse('{"key": 42}')).toEqual({ key: 42 });
    });

    it('should parse an object with line breaks', () => {
      expect(parse('{\n  "key": "value"\n}')).toEqual({ key: 'value' });
    });

    it('should throw an error if a key is not a string', () => {
      expect(() => parse('{1: "value"}')).toThrow('Json object keys must be strings');
    });

    it('should throw an error if a colon is missing after a key', () => {
      expect(() => parse('{"key" "value"}')).toThrow('Expected colon after key in object');
    });

    it('should throw an error if a comma is missing after a key-value pair', () => {
      expect(() => parse('{"key1": "value1" "key2": "value2"}')).toThrow('Expected comma after key-value pair in object');
    });
  });

  describe('JSON arrays', () => {
    it('should parse an empty array', () => {
      expect(parse('[]')).toEqual([]);
    });

    it('should parse an array with a single value', () => {
      expect(parse('["value"]')).toEqual(['value']);
    });

    it('should parse an array with multiple values', () => {
      expect(parse('["value1", "value2"]')).toEqual(['value1', 'value2']);
    });

    it('should parse nested arrays', () => {
      expect(parse('[["nestedValue1", "nestedValue2"]]')).toEqual([['nestedValue1', 'nestedValue2']]);
    });

    it('should parse arrays with nested objects', () => {
      expect(parse('[{"key": "value"}]')).toEqual([{ key: 'value' }]);
    });

    it('should parse arrays with null values', () => {
      expect(parse('[null]')).toEqual([null]);
    });

    it('should parse arrays with boolean values', () => {
      expect(parse('[true, false]')).toEqual([true, false]);
    });

    it('should parse arrays with number values', () => {
      expect(parse('[42]')).toEqual([42]);
    });

    it('should parse an array with line breaks', () => {
      expect(parse('[\n  "value"\n]')).toEqual(['value']);
    });

    it('should throw an error if a comma is missing after a value', () => {
      expect(() => parse('["value1" "value2"]')).toThrow('Expected comma after value in array');
    });
  });
});