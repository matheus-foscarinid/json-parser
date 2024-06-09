import Lexer from '../src/lexer';
import { TokenType } from '../src/types';

describe('Lexer', () => {
  it('should scan a simples JSON objectcorrectly', () => {
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

  it('should scan a complex JSON object correctly', () => {
    const input = '{ "key": "value", "key2": [1, 2, 3] }';
    const expectedTokens = [
      TokenType.LeftBrace,
      TokenType.String,
      TokenType.Colon,
      TokenType.String,
      TokenType.Comma,
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
      TokenType.EndOfFile
    ];

    const lexer = new Lexer(input);
    const tokens = lexer.scan();

    expect(tokens.length).toBe(16);
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
});