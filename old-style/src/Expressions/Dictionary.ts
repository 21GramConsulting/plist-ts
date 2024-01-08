import {Expression} from "../Expression";
import {parse} from "../parse";

export class Dictionary extends Expression<Record<string, any>> {
  protected resolve(): Record<string, any> | void {
    const result: Record<string, any> = {};
    this.context.commitPresent();

    let didClose = false;
    let expectSemicolon = false;
    let key: string | undefined;

    while (this.context.hasFuture) {
      this.context.updatePresent();

      if (/\s/.test(this.context.present)) {
        this.context.commitPresent();
        continue;
      }

      if (this.context.present === `}`) {
        didClose = true;
        this.context.commitPresent();
        break;
      }

      if (expectSemicolon) {
        if (this.context.present !== `;`) return this.error(`Expected semicolon.`);
        this.context.commitPresent();
        expectSemicolon = false;
        continue;
      }

      if (this.context.present === `;`) return this.error(`Unexpected semicolon.`);

      const item = parse(this.context);
      if (item === undefined) return this.error(`Failed to parse Dictionary item.`);
      if (key === undefined) {
        if (typeof item !== `string`) return this.error(`Expected string key.`);
        key = item;
      } else {
        result[key] = item;
        key = undefined;
      }

      expectSemicolon = true;
    }

    if (!didClose) return this.error(`Unclosed Dictionary.`);
    this.context.commitPresent();
    return result;
  }

}