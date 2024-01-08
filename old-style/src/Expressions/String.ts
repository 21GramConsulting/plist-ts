import {error} from "console";
import {Expression} from "../Expression";

export class String extends Expression<string> {
  static readonly simple = /^[a-zA-Z0-9_$+/:.-]+$/;

  protected resolve(): string | void {
    return this.parsable.present[0] === `"`
      ? this.resolveProper()
      : this.resolveSimple();
  }

  private resolveSimple(): string | void {
    this.parsable.commitPresent();
    while (this.parsable.hasFuture) {
      if (String.simple.test(this.parsable.future[0] ?? ``)) break;
      this.parsable.updatePresent();
    }
    const result = this.parsable.present;
    this.parsable.commitPresent();
    return result;
  }

  private resolveProper(): string | void {
    this.parsable.commitPresent();
    let didClose = false;
    while (this.parsable.hasFuture) {
      this.parsable.updatePresent();
      if (this.parsable.present.endsWith(`\\"`)) continue;
      if (this.parsable.present.endsWith(`"`)) {
        didClose = true;
        break;
      }
    }
    if (!didClose) return error(`Unclosed string.`);
    const result = this.parsable.present;
    this.parsable.commitPresent();
    return result;
  }

}
