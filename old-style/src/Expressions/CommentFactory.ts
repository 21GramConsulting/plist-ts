import {ExpressionFactory} from "../ExpressionFactory";
import {Context} from "../Context";
import {Comment} from "./Comment";

export class CommentFactory implements ExpressionFactory<Comment> {
  couldMatch(context: Context): boolean {
    const [first, second] = context.present;
    if (first !== `/`) return false;
    if (second === undefined) return true;
    if (second === `/`) return true;
    if (second === `*`) return true;
    return false;
  }

  doesMatch(context: Context): boolean {
    const [first, second] = context.present;
    if (first !== `/`) return false;
    if (second === undefined) return false;
    if (second === `/`) return true;
    if (second !== `*`) return false;
    if (context.hasFuture) return true;
    return false;
  }

  create(context: Context): Comment | void {
    if (!this.doesMatch(context)) return context.console(`error`, `Context does not match Comment.`);
    return new Comment(context);
  }
}
