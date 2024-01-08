import {error} from "console";
import {Expression} from "../Expression";

export class Comment extends Expression<string> {
  protected resolve(): string | void {
    const [first, second] = this.parsable.present;
    if (first !== `/`) return;
    if (second === `/`) return this.resolveLineComment();
    if (second === `*`) return this.resolveBlockComment();
    return error(`Second character of comment expression is invalid. Comments should start as "//" or "/*"`);
  }

  private resolveLineComment(): string | void {
    this.parsable.commitPresent();
    while (this.parsable.hasFuture) {
      this.parsable.updatePresent();
      if (this.parsable.present === `\n`) break;
    }
    const result = this.parsable.present;
    this.parsable.commitPresent();
    return result;
  }

  private resolveBlockComment(): string | void {
    this.parsable.commitPresent();
    let didClose = false;
    while (this.parsable.hasFuture) {
      this.parsable.updatePresent();
      if (this.parsable.present === `*` && this.parsable.future[0] === `/`) {
        didClose = true;
        break;
      }
    }
    if (!didClose) return error(`Unclosed block comment.`);
    const result = this.parsable.present;
    this.parsable.commitPresent();
    return result;
  }
}