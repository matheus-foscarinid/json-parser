import Lexer from '../src/lexer';
import { TokenType } from '../src/types';

describe('Lexer', () => {
  describe('Scan', () => {
    it('should scan a simples JSON object correctly', () => {
      const input = '{ "key": "value" }';
      const expectedTokens = [
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.String,
        TokenType.RightBrace,
        TokenType.EndOfFile
      ];
        
      const lexer = new Lexer(input);
      const tokens = lexer.scan();
  
      expect(tokens.length).toBe(6);
      tokens.forEach((token, index) => {
        expect(token.type).toBe(expectedTokens[index]);
      });
    });
  
    it('should scan a JSON object with nested objects correctly', () => {
      const input = '{ "key": { "nestedKey": "value" } }';
      const expectedTokens = [
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.String,
        TokenType.RightBrace,
        TokenType.RightBrace,
        TokenType.EndOfFile
      ];
  
      const lexer = new Lexer(input);
      const tokens = lexer.scan();
  
      expect(tokens.length).toBe(10);
      tokens.forEach((token, index) => {
        expect(token.type).toBe(expectedTokens[index]);
      });
    });
  
    it('should scan a complex JSON array', () => {
      const input = '[{ "key": [1, 2, 3] }, { "key2": [4, 5, 6] }, 3]';
      const expectedTokens = [
        TokenType.LeftBracket,
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.LeftBracket,
        TokenType.Number,
        TokenType.Comma,
        TokenType.Number,
        TokenType.Comma,
        TokenType.Number,
        TokenType.RightBracket,
        TokenType.RightBrace,
        TokenType.Comma,
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.LeftBracket,
        TokenType.Number,
        TokenType.Comma,
        TokenType.Number,
        TokenType.Comma,
        TokenType.Number,
        TokenType.RightBracket,
        TokenType.RightBrace,
        TokenType.Comma,
        TokenType.Number,
        TokenType.RightBracket,
        TokenType.EndOfFile
      ];
  
      const lexer = new Lexer(input);
      const tokens = lexer.scan();
  
      expect(tokens.length).toBe(28);
      tokens.forEach((token, index) => {
        expect(token.type).toBe(expectedTokens[index]);
      });
    });
  
    it('should scan a JSON object with line breaks', () => {
      const input = '{\n  "key": "value"\n}';
      const expectedTokens = [
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.String,
        TokenType.RightBrace,
        TokenType.EndOfFile
      ];
  
      const lexer = new Lexer(input);
      const tokens = lexer.scan();
  
      expect(tokens.length).toBe(6);
      tokens.forEach((token, index) => {
        expect(token.type).toBe(expectedTokens[index]);
      });
    });
  
    it('should scan a JSON object with numbers', () => {
      const input = '{ "key": 123 }';
      const expectedTokens = [
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.Number,
        TokenType.RightBrace,
        TokenType.EndOfFile
      ];
  
      const lexer = new Lexer(input);
      const tokens = lexer.scan();
  
      expect(tokens.length).toBe(6);
      tokens.forEach((token, index) => {
        expect(token.type).toBe(expectedTokens[index]);
      });
    });
    
    it('should scan a JSON object with boolean and null', () => {
      const input = '{ "key": true, "key2": false, "key3": null }';
      const expectedTokens = [
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.Boolean,
        TokenType.Comma,
        TokenType.String,
        TokenType.Colon,
        TokenType.Boolean,
        TokenType.Comma,
        TokenType.String,
        TokenType.Colon,
        TokenType.Null,
        TokenType.RightBrace,
        TokenType.EndOfFile
      ];
  
      const lexer = new Lexer(input);
      const tokens = lexer.scan();
  
      expect(tokens.length).toBe(14);
      tokens.forEach((token, index) => {
        expect(token.type).toBe(expectedTokens[index]);
      });
    });
  
    it('should scan a JSON object with numbers with decimal points', () => {
      const input = '{ "key": 1.23 }';
      const expectedTokens = [
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.Number,
        TokenType.RightBrace,
        TokenType.EndOfFile
      ];
  
      const lexer = new Lexer(input);
      const tokens = lexer.scan();
  
      expect(tokens.length).toBe(6);
      tokens.forEach((token, index) => {
        expect(token.type).toBe(expectedTokens[index]);
      });
    });

    it('should scan a JSON containing a negative number', () => {
      const input = '{ "key": -123 }';
      const expectedTokens = [
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.Number,
        TokenType.RightBrace,
        TokenType.EndOfFile
      ];
  
      const lexer = new Lexer(input);
      const tokens = lexer.scan();
  
      expect(tokens.length).toBe(6);
      tokens.forEach((token, index) => {
        expect(token.type).toBe(expectedTokens[index]);
      });
    
    })

    it('should support scaped characters', () => {
      const input = '{ "key": "value \\"with quotes\\" and \\n new line" }';
      const expectedTokens = [
        TokenType.LeftBrace,
        TokenType.String,
        TokenType.Colon,
        TokenType.String,
        TokenType.RightBrace,
        TokenType.EndOfFile
      ];
  
      const lexer = new Lexer(input);
      const tokens = lexer.scan();
  
      expect(tokens.length).toBe(6);
      tokens.forEach((token, index) => {
        expect(token.type).toBe(expectedTokens[index]);
      });
    });
  });

  describe('Errors', () => {
    it('should throw an error when an invalid token is found', () => {
      const input = '{ "key": 1" }';
      const lexer = new Lexer(input);
  
      expect(() => lexer.scan()).toThrow();
    });

    it('should throw an error when an invalid number is found', () => {
      const input = '{ "key": 1.bar }';
      const lexer = new Lexer(input);
  
      expect(() => lexer.scan()).toThrow();
    });
  
      it('should throw an error when an unexpected char is found', () => {
      const input = '{ "key": . }';
      const lexer = new Lexer(input);
  
      expect(() => lexer.scan()).toThrow();
    });
  
    it('should throw an error when an unidentified identifier is found', () => {
      const input = '{ "key": foo }';
      const lexer = new Lexer(input);
  
      expect(() => lexer.scan()).toThrow();
    });
  });
});