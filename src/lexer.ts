import { JsonValue, TokenType } from './types';

const isDigit = (c: string): boolean => c >= '0' && c <= '9';
const isAlpha = (c: string): boolean => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');

class Token {
  type: TokenType;
  value: JsonValue;

  constructor(type: TokenType, val: JsonValue) {
    this.type = type;
    this.value = val;
  }
}

export default class Lexer {
  private input: string;
  private tokens: Token[] = [];
  private position = 0;
  private start = 0;
  private line = 1;

  constructor(src: string) {
    this.input = src;
  }

  private isAtEOF(): boolean {
    return this.position >= this.input.length;
  }

  scan(): Token[] {
    while (!this.isAtEOF()) {
      this.start = this.position;
      this.scanToken();
    }

    const eofToken = new Token(TokenType.EndOfFile, null);
    this.tokens.push(eofToken);

    return this.tokens;
  }

  private addToken(type: TokenType): void {
    this.tokens.push(new Token(type, null));
  }

  private scanToken(): void {
    const c = this.advance();

    switch (c) {
      case '{':
        this.addToken(TokenType.LeftBrace);
        break;
      case '}':
        this.addToken(TokenType.RightBrace);
        break;
      case '[':
        this.addToken(TokenType.LeftBracket);
        break;
      case ']':
        this.addToken(TokenType.RightBracket);
        break;
      case ',':
        this.addToken(TokenType.Comma);
        break;
      case ':':
        this.addToken(TokenType.Colon);
        break;
      case ' ':
        break;
      case '\n':
        this.line++;
        break;
      case '"':
        this.addString();
        break;
      default:
        if (isDigit(c)) {
          this.addNumber();
        } else if (isAlpha(c)) {
          this.addIdentifier();
        } else {
          throw new Error(`Unexpected character: "${c}" at line ${this.line}!`);
        }
    }
  }

  private advance(): string {
    return this.input[this.position++];
  }

  private peek(): string {
    return this.input[this.position];
  }

  private peekNext(): string {
    return this.input[this.position + 1];
  }

  private addString(): void {
    while (this.peek() !== '"' && !this.isAtEOF()) {
      this.advance();
    }

    if (this.isAtEOF()) {
      throw new Error(`Invalid String at line ${this.line}`);
    }

    this.advance()

    // +1 and -1 to ignore double quotes
    const str = this.input.substring(this.start + 1, this.position - 1);
    const strToken = new Token(TokenType.String, str);
    this.tokens.push(strToken);
  }

  private addNumber() {
    while (isDigit(this.peek())) {
      this.advance();
    }

    if (this.peek() == '.') {
      if (!isDigit(this.peekNext())) {
        throw new Error('Invalid number, expected digit after "."');
      }

      this.advance();
    }

    while (isDigit(this.peek())) {
      this.advance();
    }

    const numStr = this.input.substring(this.start, this.position);
    const numToken = new Token(TokenType.Number, Number(numStr));
    this.tokens.push(numToken);
  }

  private addIdentifier() {
    while (isAlpha(this.peek())) {
      this.advance();
    }

    const id = this.input.substring(this.start, this.position);
    let type: TokenType;

    switch (id) {
      case 'true':
      case 'false':
        type = TokenType.Boolean;
        break;
      case 'null':
        type = TokenType.Null;
        break;
      default:
        throw new Error(`Unexpected identifier: "${id}" at line ${this.line}`);
    }

    const idToken = new Token(type, id);
    this.tokens.push(idToken);
  }
}