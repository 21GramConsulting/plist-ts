import {PlistArray, PlistArrayNode} from "@21gram-consulting/plist";
import {Expression} from "../Expression";
import {parse} from "../parse";

export class ArrayExpression extends Expression<PlistArrayNode> {
  protected resolve(): PlistArrayNode | void {
    const value: PlistArray = [];
    const children: PlistArrayNode[`children`] = [];
    this.context.commitPresent();

    let didClose = false;
    let expectComma = false;

    while (this.context.hasFuture) {
      this.context.updatePresent();

      if (/\s/.test(this.context.present)) {
        this.context.commitPresent();
        continue;
      }

      if (this.context.present === `)`) {
        didClose = true;
        this.context.commitPresent();
        break;
      }

      if (expectComma) {
        if (this.context.present !== `,`) return this.error(`Expected comma.`);
        this.context.commitPresent();
        expectComma = false;
        continue;
      }

      if (this.context.present === `,`) return this.error(`Unexpected comma.`);

      const item = parse(this.context);
      if (item === undefined) return this.error(`Failed to parse array item.`);
      value.push(item.value);
      children.push(item.node);
      expectComma = true;
    }

    if (!didClose) return this.error(`Unclosed array.`);
    this.context.commitPresent();
    return PlistArrayNode(value, children);
  }

}