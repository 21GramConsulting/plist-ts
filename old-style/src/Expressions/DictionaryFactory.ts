import {ExpressionFactory} from "../ExpressionFactory";
import {Context} from "../Context";
import {DictionaryExpression} from "./DictionaryExpression";

export class DictionaryFactory implements ExpressionFactory<DictionaryExpression> {
  doesMatch(context: Context): boolean {
    return this.couldMatch(context);
  }

  couldMatch(context: Context): boolean {
    if (!context.hasFuture) return false;
    if (context.present !== `{`) return false;
    return context.present === `{`;
  }

  create(context: Context): DictionaryExpression | void {
    if (!this.doesMatch(context)) return context.console(`error`, `Context does not match a Dictionary.`);
    return new DictionaryExpression(context);
  }
}
