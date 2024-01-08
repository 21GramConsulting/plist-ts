import {Context} from "./Context";
import {ExpressionFilter} from "./ExpressionFilter";
import {error} from "console";
import {StringFactory} from "./Expressions/StringFactors";
import {CommentFactory} from "./Expressions/CommentFactory";
import {ArrayFactory} from "./Expressions/ArrayFactory";
import {BinaryFactory, DictionaryFactory} from ".";

export function parse(input: Context): any;
export function parse(input: string): any;
export function parse(input: any): any {
  const context = input instanceof Context
    ? input
    : new Context(input);

  const filter = new ExpressionFilter(context, [
    new StringFactory(),
    new CommentFactory(),
    new ArrayFactory(),
    new DictionaryFactory(),
    new BinaryFactory()
  ]);

  while (filter.undecided) {
    context.updatePresent();
    if (filter.outOfOptions) return error(`Failed to parse input.`);
  }

  return filter.expression?.value;
}