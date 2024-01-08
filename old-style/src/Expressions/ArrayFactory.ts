import {ExpressionFactory} from "../ExpressionFactory";
import {Context} from "../Context";
import {ArrayExpression} from "./ArrayExpression";

export class ArrayFactory implements ExpressionFactory<ArrayExpression> {
  doesMatch(context: Context): boolean {
    return this.couldMatch(context);
  }

  couldMatch(context: Context): boolean {
    if (!context.hasFuture) return false;
    if (context.present !== `(`) return false;
    return context.present === `(`;
  }

  create(context: Context): ArrayExpression | void {
    if (!this.doesMatch(context)) return context.console(`error`, `Context does not match an array.`);
    return new ArrayExpression(context);
  }
}
