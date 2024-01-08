import {Expression} from "./Expression";
import {Context} from "./Context";

export interface ExpressionFactory<E extends Expression<any>> {
  couldMatch(context: Context): boolean;
  doesMatch(context: Context): boolean;

  create(cloning: Context): E | void;
}