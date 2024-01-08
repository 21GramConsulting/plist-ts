import {ExpressionFactory} from "../ExpressionFactory";
import {Context} from "../Context";
import {String} from "./String";

export class StringFactory implements ExpressionFactory<String> {
  doesMatch(context: Context): boolean {
    return this.couldMatch(context);
  }

  couldMatch(context: Context): boolean {
    if (!context.hasFuture) return false;
    if (context.present === `"`) return true;
    return String.simple.test(context.present);
  }

  create(context: Context): String | void {
    if (!this.doesMatch(context)) return context.console(`error`, `Context does not match a String.`);
    return new String(context);
  }
}
