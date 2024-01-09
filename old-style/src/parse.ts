import {Context} from "./Context";
import {ExpressionFilter} from "./ExpressionFilter";
import {StringFactory} from "./Expressions/StringFactors";
import {CommentFactory} from "./Expressions/CommentFactory";
import {ArrayFactory} from "./Expressions/ArrayFactory";
import {BinaryFactory} from "./Expressions/BinaryFactory";
import {DictionaryFactory} from "./Expressions/DictionaryFactory";
import {Expression} from "./Expression";

export function parse(input: Context): Expression<any> | void;
export function parse(input: string): Expression<any> | void;
export function parse(input: any): Expression<any> | void {
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
    filter.narrowDown();
    if (filter.outOfOptions) return context.console(`error`, `Failed to parse input.`);
    if (filter.expression) return filter.expression;
  }
}