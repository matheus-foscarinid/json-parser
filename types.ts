export type JsonValue = JsonObject | JsonArray | string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

export enum TokenType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Null = 'Null',
  LBrace = 'LBrace',
  RBrace = 'RBrace',
  LBracket = 'LBracket',
  RBracket = 'RBracket',
  Comma = 'Comma',
  Colon = 'Colon',
  EndOfFile = 'EndOfFile'
}