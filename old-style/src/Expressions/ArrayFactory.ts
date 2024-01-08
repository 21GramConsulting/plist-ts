import {error} from "console";
import {ExpressionFactory} from "../ExpressionFactory";
import {Context} from "../Context";
import {Array} from "./Array";

export class ArrayFactory implements ExpressionFactory<Array> {
  doesMatch(context: Context): boolean {
    return this.couldMatch(context);
  }

  couldMatch(context: Context): boolean {
    if (!context.hasFuture) return false;
    if (context.present !== `(`) return false;
    return context.present === `(`;
  }

  create(context: Context): Array | void {
    if (!this.doesMatch(context)) return this.error(`Context does not match an array.`);
    return new Array(context);
  }
}
