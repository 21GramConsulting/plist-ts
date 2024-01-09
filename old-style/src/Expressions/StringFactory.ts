import {ExpressionFactory} from "../ExpressionFactory";
import {Context} from "../Context";
import {StringExpression} from "./StringExpression";

export class StringFactory implements ExpressionFactory<StringExpression> {
  doesMatch(context: Context): boolean {
    if (context.present === ``) return false;
    if (context.present.startsWith(`"`) && !context.hasFuture) return false;
    if (!StringExpression.simple.test(context.present)) return false;
    return true;
  }

  couldMatch(context: Context): boolean {
    if (context.present === ``) return true;
    if (context.present.startsWith(`"`) && context.hasFuture) return true;
    return StringExpression.simple.test(context.present);
  }

  create(context: Context): StringExpression | void {
    if (!this.doesMatch(context)) return context.console(`error`, `Context does not match a String.`);
    return new StringExpression(context);
  }
}
