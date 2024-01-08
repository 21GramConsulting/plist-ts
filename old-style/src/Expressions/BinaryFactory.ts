import {error} from "console";
import {ExpressionFactory} from "../ExpressionFactory";
import {Parsable} from "../Parsable";
import {Binary} from "./Binary";

export class BinaryFactory implements ExpressionFactory<Binary> {
  doesMatch(parsable: Parsable): boolean {
    return this.couldMatch(parsable);
  }

  couldMatch(parsable: Parsable): boolean {
    if (!parsable.hasFuture) return false;
    if (parsable.present === `<`) return true;
    return false;
  }

  create(parsable: Parsable): Binary | void {
    if (!this.doesMatch(parsable)) return error(`Parsable does not match Binary.`);
    return new Binary(parsable);
  }
}
