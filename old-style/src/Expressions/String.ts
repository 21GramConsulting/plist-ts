import {error} from "console";
import {Expression} from "../Expression";

export class String extends Expression<string> {
  static readonly simple = /^[a-zA-Z0-9_$+/:.-]+$/;

  protected resolve(): string | void {
    return this.context.present[0] === `"`
      ? this.resolveProper()
      : this.resolveSimple();
  }

  private resolveSimple(): string | void {
    this.context.commitPresent();
    while (this.context.hasFuture) {
      if (String.simple.test(this.context.future[0] ?? ``)) break;
      this.context.updatePresent();
    }
    const result = this.context.present;
    this.context.commitPresent();
    return result;
  }

  private resolveProper(): string | void {
    this.context.commitPresent();
    let didClose = false;
    while (this.context.hasFuture) {
      this.context.updatePresent();
      if (this.context.present.endsWith(`\\"`)) continue;
      if (this.context.present.endsWith(`"`)) {
        didClose = true;
        break;
      }
    }
    if (!didClose) return error(`Unclosed string.`);
    const result = this.context.present;
    this.context.commitPresent();
    return result;
  }

}
