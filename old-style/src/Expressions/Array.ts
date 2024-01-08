import {error} from "console";
import {Expression} from "../Expression";
import {parse} from "../parse";

export class Array extends Expression<any[]> {
  protected resolve(): any[] | void {
    const result: any[] = [];
    this.parsable.commitPresent();

    let didClose = false;
    let expectComma = false;

    while (this.parsable.hasFuture) {
      this.parsable.updatePresent();

      if (/\s/.test(this.parsable.present)) {
        this.parsable.commitPresent();
        continue;
      }

      if (this.parsable.present === `)`) {
        didClose = true;
        this.parsable.commitPresent();
        break;
      }

      if (expectComma) {
        if (this.parsable.present !== `,`) return error(`Expected comma.`);
        this.parsable.commitPresent();
        expectComma = false;
        continue;
      }

      if (this.parsable.present === `,`) return error(`Unexpected comma.`);

      const item = parse(this.parsable);
      if (item === undefined) return error(`Failed to parse array item.`);
      result.push(item);
      expectComma = true;
    }

    if (!didClose) return error(`Unclosed array.`);
    this.parsable.commitPresent();
    return result;
  }

}