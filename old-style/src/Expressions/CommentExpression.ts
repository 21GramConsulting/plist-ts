import {PlistCommentNode} from "@21gram-consulting/plist";
import {Expression} from "../Expression";

export class CommentExpression extends Expression<PlistCommentNode> {
  protected resolve(): PlistCommentNode | void {
    const first = this.context.present[0] ?? ``;
    const second = this.context.present[1] ?? ``;
    if (first !== `/`) return this.error(`First character of comment expression is invalid. Comments should start as "//" or "/*". Received "${first ?? ``}"`);
    if (second === `/`) return this.resolveLineComment();
    if (second === `*`) return this.resolveBlockComment();
    return this.error(`Second character of comment expression is invalid. Comments should start as "//" or "/*". Received "${first}${second}".`);
  }

  private resolveLineComment(): PlistCommentNode | void {
    this.context.commitPresent();
    let value: string | undefined;

    while (this.context.hasFuture) {
      let breaks = 0;
      if (this.context.future[breaks] === `\r`) breaks++;
      if (this.context.future[breaks] === `\n`) breaks++;

      if (breaks > 0) value = this.context.present;
      if (breaks > 1) this.context.updatePresent();
      this.context.updatePresent();
      if (breaks > 0) break;
    }

    const result = PlistCommentNode(value ?? this.context.present);
    this.context.commitPresent();
    return result;
  }

  private resolveBlockComment(): PlistCommentNode | void {
    this.context.commitPresent();
    let didClose = false;

    while (this.context.hasFuture) {
      if (this.context.future[0] === `*` && this.context.future[1] === `/`) {
        didClose = true;
        break;
      }
      this.context.updatePresent();
    }
    if (!didClose) return this.error(`Unclosed block comment.`);
    const result = PlistCommentNode(this.context.present);
    this.context.commitPresent();
    return result;
  }
}