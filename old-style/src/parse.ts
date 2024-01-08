import {Parsable} from "./Parsable";
import {ExpressionFilter} from "./ExpressionFilter";
import {error} from "console";
import {StringFactory} from "./Expressions/StringFactors";
import {CommentFactory} from "./Expressions/CommentFactory";
import {ArrayFactory} from "./Expressions/ArrayFactory";
import {BinaryFactory, DictionaryFactory} from ".";
import {ParseIntent} from "./ParseIntent";

export function parse(input: Parsable, intent: ParseIntent): any;
export function parse(input: string, intent: ParseIntent): any;
export function parse(input: any, intent: ParseIntent): any {
  const parsable = input instanceof Parsable
    ? input
    : new Parsable(input);

  const filter = new ExpressionFilter(parsable, [
    new StringFactory(),
    new CommentFactory(),
    new ArrayFactory(),
    new DictionaryFactory(),
    new BinaryFactory()
  ]);

  while (filter.undecided) {
    parsable.updatePresent();
    if (filter.outOfOptions) return error(`Failed to parse input.`);
  }

  return filter.expression?.value;
}