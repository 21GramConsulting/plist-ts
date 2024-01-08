import {error} from "console";
import {Expression} from "../Expression";
import {parse} from "../parse";

export class Dictionary extends Expression<Record<string, any>> {
  protected resolve(): Record<string, any> | void {
    const result: Record<string, any> = {};
    this.parsable.commitPresent();

    let didClose = false;
    let expectSemicolon = false;
    let key: string | undefined;

    while (this.parsable.hasFuture) {
      this.parsable.updatePresent();

      if (/\s/.test(this.parsable.present)) {
        this.parsable.commitPresent();
        continue;
      }

      if (this.parsable.present === `}`) {
        didClose = true;
        this.parsable.commitPresent();
        break;
      }

      if (expectSemicolon) {
        if (this.parsable.present !== `;`) return error(`Expected semicolon.`);
        this.parsable.commitPresent();
        expectSemicolon = false;
        continue;
      }

      if (this.parsable.present === `;`) return error(`Unexpected semicolon.`);

      const item = parse(this.parsable);
      if (item === undefined) return error(`Failed to parse Dictionary item.`);
      if (key === undefined) {
        if (typeof item !== `string`) return error(`Expected string key.`);
        key = item;
      } else {
        result[key] = item;
        key = undefined;
      }

      expectSemicolon = true;
    }

    if (!didClose) return error(`Unclosed Dictionary.`);
    this.parsable.commitPresent();
    return result;
  }

}