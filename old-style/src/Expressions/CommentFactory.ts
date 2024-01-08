import {error} from "console";
import {ExpressionFactory} from "../ExpressionFactory";
import {Parsable} from "../Parsable";
import {Comment} from "./Comment";

export class CommentFactory implements ExpressionFactory<Comment> {
  couldMatch(parsable: Parsable): boolean {
    const [first, second] = parsable.present;
    if (first !== `/`) return false;
    if (second === undefined) return true;
    if (second === `/`) return true;
    if (second === `*`) return true;
    return false;
  }

  doesMatch(parsable: Parsable): boolean {
    const [first, second] = parsable.present;
    if (first !== `/`) return false;
    if (second === undefined) return false;
    if (second === `/`) return true;
    if (second !== `*`) return false;
    if (parsable.hasFuture) return true;
    return false;
  }

  create(parsable: Parsable): Comment | void {
    if (!this.doesMatch(parsable)) return error(`Parsable does not match Comment.`);
    return new Comment(parsable);
  }
}
