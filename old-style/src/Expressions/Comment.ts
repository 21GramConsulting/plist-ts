import {error} from "console";
import {Expression} from "../Expression";

export class Comment extends Expression<string> {
  protected resolve(): string | void {
    const [first, second] = this.context.present;
    if (first !== `/`) return;
    if (second === `/`) return this.resolveLineComment();
    if (second === `*`) return this.resolveBlockComment();
    return error(`Second character of comment expression is invalid. Comments should start as "//" or "/*"`);
  }

  private resolveLineComment(): string | void {
    this.context.commitPresent();
    while (this.context.hasFuture) {
      this.context.updatePresent();
      if (this.context.present === `\n`) break;
    }
    const result = this.context.present;
    this.context.commitPresent();
    return result;
  }

  private resolveBlockComment(): string | void {
    this.context.commitPresent();
    let didClose = false;
    while (this.context.hasFuture) {
      this.context.updatePresent();
      if (this.context.present === `*` && this.context.future[0] === `/`) {
        didClose = true;
        break;
      }
    }
    if (!didClose) return error(`Unclosed block comment.`);
    const result = this.context.present;
    this.context.commitPresent();
    return result;
  }
}