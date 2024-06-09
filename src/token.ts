
import { JsonValue, TokenType } from './types';

export default class Token {
  type: TokenType;
  value: JsonValue;

  constructor(type: TokenType, val: JsonValue) {
    this.type = type;
    this.value = val;
  }
}