import {Parsable} from "./Parsable";
import {ExpressionFilterFactory} from "./ExpressionFilterFactory";
import {error} from "console";
import {StringFactory} from "./Expressions/StringFactors";
import {CommentFactory} from "./Expressions/CommentFactory";
import {ArrayFactory} from "./Expressions/ArrayFactory";

export function parse(input: Parsable): any;
export function parse(input: string): any;
export function parse(input: any): any {
  const parsable = input instanceof Parsable
    ? input
    : new Parsable(input);

  const factory = new ExpressionFilterFactory([
    new StringFactory(),
    new CommentFactory(),
    new ArrayFactory()
  ]);

  const filter = factory.create(parsable);

  while (filter.undecided) {
    parsable.updatePresent();
    if (filter.outOfOptions) return error(`Failed to parse input.`);
  }

  return filter.expression?.value;
}