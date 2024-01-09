import {PlistStringNode} from "@21gram-consulting/plist";
import {Expression} from "../Expression";

export class StringExpression extends Expression<PlistStringNode> {
  static readonly simple = /^[a-zA-Z0-9_$+/:.-]+$/;

  protected resolve(): PlistStringNode | void {
    return this.context.present[0] === `"`
      ? this.resolveQuoted()
      : this.resolveSimple();
  }

  private resolveSimple(): PlistStringNode | void {
    let value = this.context.present;
    this.context.commitPresent();

    while (this.context.hasFuture) {
      if (!StringExpression.simple.test(this.context.future[0]!)) break;
      this.context.updatePresent();
      value += this.context.present;
      this.context.commitPresent();
    }

    return PlistStringNode(value);
  }

  private resolveQuoted(): PlistStringNode | void {
    this.context.commitPresent();
    let value = ``;

    while (this.context.hasFuture) {
      this.context.updatePresent();
      if (this.context.present === `"`) {
        this.context.commitPresent();
        return PlistStringNode(value);
      }
      if (this.context.present === `\\`) {
        value += `\\`;
        this.context.commitPresent();
        this.context.updatePresent();
      }
      value += this.context.present;
      this.context.commitPresent();
    }
    return this.error(`Unclosed string.`);
  }

}
