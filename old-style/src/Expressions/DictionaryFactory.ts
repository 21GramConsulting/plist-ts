import {error} from "console";
import {ExpressionFactory} from "../ExpressionFactory";
import {Context} from "../Context";
import {Dictionary} from "./Dictionary";

export class DictionaryFactory implements ExpressionFactory<Dictionary> {
  doesMatch(context: Context): boolean {
    return this.couldMatch(context);
  }

  couldMatch(context: Context): boolean {
    if (!context.hasFuture) return false;
    if (context.present !== `{`) return false;
    return context.present === `{`;
  }

  create(context: Context): Dictionary | void {
    if (!this.doesMatch(context)) return error(`Context does not match a Dictionary.`);
    return new Dictionary(context);
  }
}
