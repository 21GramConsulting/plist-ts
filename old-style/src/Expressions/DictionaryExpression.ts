import {PlistDictionary, PlistDictionaryNode} from "@21gram-consulting/plist";
import {Expression} from "../Expression";
import {parse} from "../parse";
import {StringExpression} from "./StringExpression";

export class DictionaryExpression extends Expression<PlistDictionaryNode> {
  protected resolve(): PlistDictionaryNode | void {
    const result: PlistDictionary = {};
    const children: PlistDictionaryNode[`children`] = [];
    this.context.commitPresent();

    let didClose = false;
    let expectSemicolon = false;
    let key: StringExpression | undefined;

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
      if (!item) return this.error(`Failed to parse Dictionary item.`);
      if (key === undefined) {
        if (!(item instanceof StringExpression)) return this.error(`Expected string key.`);
        key = item;
      } else {
        if (!key.value) return this.error(`String key is empty.`);
        result[key.value] = item.value;
        children.push(item.node);
        key = undefined;
      }

      expectSemicolon = true;
    }

    if (!didClose) return this.error(`Unclosed Dictionary.`);
    this.context.commitPresent();
    return PlistDictionaryNode(result, children);
  }

}