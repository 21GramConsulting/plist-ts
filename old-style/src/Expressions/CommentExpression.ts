import {Comment} from "@21gram-consulting/plist";
import {Expression} from "../Expression";

export class CommentExpression extends Expression<Comment> {
  protected resolve(): Comment | void {
    const [first, second] = this.context.present;
    if (first !== `/`) return;
    if (second === `/`) return this.resolveLineComment();
    if (second === `*`) return this.resolveBlockComment();
    return this.error(`Second character of comment expression is invalid. Comments should start as "//" or "/*"`);
  }

  private resolveLineComment(): Comment | void {
    this.context.commitPresent();
    while (this.context.hasFuture) {
      this.context.updatePresent();
      if (this.context.present === `\n`) break;
    }
    const result = this.context.present;
    this.context.commitPresent();
    return result;
  }

  private resolveBlockComment(): Comment | void {
    this.context.commitPresent();
    let didClose = false;
    while (this.context.hasFuture) {
      this.context.updatePresent();
      if (this.context.present === `*` && this.context.future[0] === `/`) {
        didClose = true;
        break;
      }
    }
    if (!didClose) return this.error(`Unclosed block comment.`);
    const result = this.context.present;
    this.context.commitPresent();
    return result;
  }
}