import {error} from "console";
import {Expression} from "../Expression";
import {parse} from "../parse";

export class Array extends Expression<any[]> {
  protected resolve(): any[] | void {
    const result: any[] = [];
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
        if (this.context.present !== `,`) return error(`Expected comma.`);
        this.context.commitPresent();
        expectComma = false;
        continue;
      }

      if (this.context.present === `,`) return error(`Unexpected comma.`);

      const item = parse(this.context);
      if (item === undefined) return error(`Failed to parse array item.`);
      result.push(item);
      expectComma = true;
    }

    if (!didClose) return error(`Unclosed array.`);
    this.context.commitPresent();
    return result;
  }

}