import {error} from "console";
import {ExpressionFactory} from "../ExpressionFactory";
import {Parsable} from "../Parsable";
import {String} from "./String";

export class StringFactory implements ExpressionFactory<String> {
  doesMatch(parsable: Parsable): boolean {
    return this.couldMatch(parsable);
  }

  couldMatch(parsable: Parsable): boolean {
    if (!parsable.hasFuture) return false;
    if (parsable.present === `"`) return true;
    return String.simple.test(parsable.present);
  }

  create(parsable: Parsable): String | void {
    if (!this.doesMatch(parsable)) return error(`Parsable does not match a String.`);
    return new String(parsable);
  }
}
