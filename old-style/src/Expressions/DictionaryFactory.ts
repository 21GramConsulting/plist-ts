import {error} from "console";
import {ExpressionFactory} from "../ExpressionFactory";
import {Parsable} from "../Parsable";
import {Dictionary} from "./Dictionary";

export class DictionaryFactory implements ExpressionFactory<Dictionary> {
  doesMatch(parsable: Parsable): boolean {
    return this.couldMatch(parsable);
  }

  couldMatch(parsable: Parsable): boolean {
    if (!parsable.hasFuture) return false;
    if (parsable.present !== `{`) return false;
    return parsable.present === `{`;
  }

  create(parsable: Parsable): Dictionary | void {
    if (!this.doesMatch(parsable)) return error(`Parsable does not match a Dictionary.`);
    return new Dictionary(parsable);
  }
}
