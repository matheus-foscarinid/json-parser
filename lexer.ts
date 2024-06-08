import { JsonValue, TokenType } from './types';

class Token {
  type: TokenType;
  value: JsonValue;

  constructor(type: TokenType, val: JsonValue) {
    this.type = type;
    this.value = val;
  }
}

class Lexer {
  private input: string;
  private tokens: Token[];
  private position = 0;
  private start = 0;
  private line = 1;

  constructor(private src: string) {
    this.input = src;
  }

  private isAtEnd(): boolean {
    return this.position >= this.input.length;
  }

  scan(): Token[] {
    while (!this.isAtEnd()) {
      this.start = this.position;
      this.scanToken();
    }

    const eofToken = new Token(TokenType.EndOfFile, null);
    this.tokens.push(eofToken);

    return this.tokens;
  }

  scanToken(): void {
    const c = this.advance();
    
  }

  advance(): string {
    return this.input[this.position++];
  }

  peek(): string {
    return this.input[this.position];
  }

  peekNext(): string {
    return this.input[this.position + 1];
  }
}