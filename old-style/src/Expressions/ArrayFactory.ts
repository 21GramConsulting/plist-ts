import {error} from "console";
import {ExpressionFactory} from "../ExpressionFactory";
import {Parsable} from "../Parsable";
import {Array} from "./Array";

export class ArrayFactory implements ExpressionFactory<Array> {
  doesMatch(parsable: Parsable): boolean {
    return this.couldMatch(parsable);
  }

  couldMatch(parsable: Parsable): boolean {
    if (!parsable.hasFuture) return false;
    if (parsable.present !== `(`) return false;
    return parsable.present === `(`;
  }

  create(parsable: Parsable): Array | void {
    if (!this.doesMatch(parsable)) return error(`Parsable does not match an array.`);
    return new Array(parsable);
  }
}
