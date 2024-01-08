import {Expression} from "./Expression";
import {Parsable} from "./Parsable";

export interface ExpressionFactory<E extends Expression<any>> {
  couldMatch(parsable: Parsable): boolean;
  doesMatch(parsable: Parsable): boolean;

  create(cloning: Parsable): E | void;
}