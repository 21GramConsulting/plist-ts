import {ExpressionFactory} from "../ExpressionFactory";
import {Context} from "../Context";
import {Binary} from "./Binary";

export class BinaryFactory implements ExpressionFactory<Binary> {
  doesMatch(context: Context): boolean {
    return this.couldMatch(context);
  }

  couldMatch(context: Context): boolean {
    if (!context.hasFuture) return false;
    if (context.present === `<`) return true;
    return false;
  }

  create(context: Context): Binary | void {
    if (!this.doesMatch(context)) return context.console(`error`, `Context does not match Binary.`);
    return new Binary(context);
  }
}
