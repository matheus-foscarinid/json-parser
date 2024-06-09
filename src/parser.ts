import Token from "./token";
import { JsonArray, JsonObject, JsonValue, TokenType } from "./types";

export default class Parser {
  private tokens: Token[];
  private position = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }
  
  parse() {
    const token = this.advance();
    return this.parseFromToken(token);
  }

  private parseFromToken(token: Token): JsonValue {
    if (token.type === TokenType.LeftBrace) {
      return this.parseObject();
    } else if (token.type === TokenType.LeftBracket) {
      return this.parseArray();
    } else {
      return token.value;
    }
  }

  private parseObject(): JsonObject {
    const obj = {};
    
    let token = this.advance(); // Initialize token before the loop
    while (token.type !== TokenType.RightBrace) {
      // If the token is not a string, throw an error
      if (token.type !== TokenType.String) {
        throw new Error('Json object keys must be strings');
      }

      // consume the colon
      const colon = this.advance();
      if (colon.type !== TokenType.Colon) {
        throw new Error('Expected colon after key in object');
      }

      // Add the key-value pair to the object
      const tokenValue = this.advance();
      obj[token.value as string] = this.parseFromToken(tokenValue);

      // Consume the comma unless we're at the end of the object
      const nextToken = this.peek();
      // If the next token is not a comma nor a right brace, throw an error
      if (nextToken.type !== TokenType.Comma && nextToken.type !== TokenType.RightBrace) {
        throw new Error('Expected comma after key-value pair in object');
      }
      // If the next token is a comma, consume it
      if (nextToken.type === TokenType.Comma) this.advance();

      // Prepare for the next iteration by advancing the token
      token = this.advance(); // Update token for the next iteration
    }

    return obj;
  }

  private parseArray(): JsonArray {
    const arr: JsonValue[] = [];
    let token = this.advance();

    while (token.type !== TokenType.RightBracket) {
      // Add the key-value pair to the object
      arr.push(this.parseFromToken(token));

      // Consume the comma unless we're at the end of the object
      const nextToken = this.peek();
      // IF the next token is not a comma nor a right bracket, throw an error
      if (nextToken.type !== TokenType.Comma && nextToken.type !== TokenType.RightBracket) {
        throw new Error('Expected comma after value in array');
      }
      // If the next token is a comma, consume it
      if (nextToken.type === TokenType.Comma) this.advance();

      // Prepare for the next iteration by advancing the token
      token = this.advance(); // Update token for the next iteration
    }

    return arr;
  }

  private peek(): Token {
    return this.tokens[this.position];
  }

  private advance(): Token {
    return this.tokens[this.position++];
  }
}