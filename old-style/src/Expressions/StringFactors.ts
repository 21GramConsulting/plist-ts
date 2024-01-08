import {ExpressionFactory} from "../ExpressionFactory";
import {Context} from "../Context";
import {StringExpression} from "./StringExpression";

export class StringFactory implements ExpressionFactory<StringExpression> {
  doesMatch(context: Context): boolean {
    return this.couldMatch(context);
  }

  couldMatch(context: Context): boolean {
    if (!context.hasFuture) return false;
    if (context.present === `"`) return true;
    return StringExpression.simple.test(context.present);
  }

  create(context: Context): StringExpression | void {
    if (!this.doesMatch(context)) return context.console(`error`, `Context does not match a String.`);
    return new StringExpression(context);
  }
}
